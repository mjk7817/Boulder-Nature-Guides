const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pw_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;  

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) =>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.render('register', {
                message: 'That email has been taken',
                successMessage: ''
            });
        } else if(!email_regex.test(String(email).toLowerCase())){
            return res.render('register', {
                message: 'Invalid email',
                successMessage: ''
            });
        } else if(!pw_regex.test(String(password))){
            return res.render('register', {
                message: 'Password must 8 characters, include upper and lowercase letters, and at least on number',
                successMessage: ''
            });
        } else if(password != passwordConfirm){
            return res.render('register', {
                message: 'Passwords do not match',
                successMessage: ''
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {username: username, password: hashedPassword, email: email}, (error, results) =>{
            if(error){
                console.log(error);
            } else{
                return res.redirect('/login');
            }
        })
    })

    
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if(!results || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render('login', {
                    message: 'Email or password is incorrect',
                    successMessage: ''
                })
            } else{
                const id = results[0].id;

                const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("Token: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/profile");

            }
        })
        
    } catch (error) {
        console.log(error);
    }
} 

exports.isLoggedIn = async (req, res, next) => {
    if(req.cookies.jwt){
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);


            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {

                if(!result){
                    return next();
                }

                req.user = result[0];

            });

            db.query('SELECT * FROM profiles WHERE id = ?', [decoded.id], (error, result) => {
                if(!result){
                    return next();
                }

                req.profile = result[0];
                return next();
            });
        } catch (error) {
            return next();
        }
    } else{
        next();
    }
}

exports.logout= async (req, res) => {    
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2),
        httpOnly: true
    })

    res.status(200).redirect('/');
}