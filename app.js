const express = require("express");
const app = express();
const mysql = require("mysql");
const serv = require('http').createServer(app);
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
var pgp = require('pg-promise')();

//const express = require("express");
//var authController = require('../controllers/auth');//error here, cannot find ../controllers/auth when this code was modified

const router = express.Router();

router.post('/register', register());

router.post('/login', login());

router.get('/logout', logout());

module.exports = router;

//code from auth.js controllers
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pw_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const { promisify } = require('util');

serv.listen(port, () => {
  console.log('Server successfully started at port %d', port);
});



dotenv.config({ path: './.env'})

const stylesDirectory = path.join(__dirname, './styles');
const scriptsDirectory = path.join(__dirname, './scripts');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(scriptsDirectory));
app.use(express.static(stylesDirectory));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

  let dbConfig = { //these need to be our local configurations
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
};
  
const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
var db = pgp(dbConfig);

let createTable = "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL,username varchar(100) NOT NULL,email varchar(100) NOT NULL,password varchar(255) NOT NULL);";

db.query(createTable, function(error, results) {
    if(error){
        console.log(error);
    } 
})

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/register', (req, res) => {
    res.render('register', {message: '', successMessage: ''});
})

router.get('/login', isLoggedIn(), (req, res) => {
    if(req.user){
        res.redirect('/profile');
    } else{
        res.render('login', {message: '', successMessage: ''});
    }
    
})

router.get('/contact', (req, res) => {
    res.render('contact');
})

router.get('/map', function(req, res) {
    var trailheads;
    var parks;
	db.query('select * from markers', (error, results) =>{
        if(error){
            console.log(error);
        }
        trailheads = results;
    });

    db.query('select * from parkMark', (error, results) =>{
        if(error){
            console.log(error);
        }
        var parks = results;
    })

    res.render('map',{
		my_title: "Map",
		mapPoint: trailheads,
		parks: parks,
	})

});

router.get('/index', (req, res) => {
    res.render('index');
})

router.get('/resources', (req, res) => {
    res.render('resources');
})

router.get('/profile', isLoggedIn(), (req, res) => {
    if(req.user && req.profile){
        res.render('profile', {
            user: req.user,
            profile: req.profile
        });
    } else if(req.user){
        res.render('profile', {
            user: req.user,
            profile: ''
        });
    } else{
        res.redirect('/login');
    }
    
})

router.get('/editProfile', authController.isLoggedIn, (req, res) => {
    if(req.user){
        res.render('editProfile', {
            user: req.user
        });
    } else{
        res.redirect('/login');
    }
    
})

router.post('/profile', authController.isLoggedIn, (req, res) => {
    var addProfile = 'insert into profiles values (';
    addProfile += req.user.id;
    addProfile += ', "';
    addProfile += req.body.shortBio;
    addProfile += '", "'; 
    addProfile += req.body.fullBio;
    addProfile += '", "'; 
    addProfile += req.user.username;
    addProfile += '", "'; 
    addProfile += req.user.email;
    addProfile += '");';

    
    db.query("delete from profiles where id = " + req.user.id + ";");

    db.query(addProfile, (error, results) =>{
        if(error){
            console.log(error);
        }
    })
    if(req.user){
        res.redirect('/profile');
    } else{
        res.redirect('/login');
    }
})

router.get('/browseProfiles', (req, res) => {
        res.render('profileCards', {
    });
})

router.get('/profiles', authController.isLoggedIn, (req, res) => {
   async function userQuery(){
        return new Promise((resolve,reject)=>{
            db.query('select * from profiles', function(error,results,field){
                    resolve(results);
            });

        })
    }

    async function resolveQueries(){
        let profiles = await userQuery();
        res.json(profiles);
        
    }

    resolveQueries();
    
})

router.get('/mapData',  (req, res) => {
    async function userQuery(){
         return new Promise((resolve,reject)=>{
             db.query('select * from markers', function(error,results,field){
                     resolve(results);
             });
 
         })
     }
 
     async function resolveQueries(){
         let data = await userQuery();
         res.json(data);
         
     }
 
     resolveQueries();
     
 })

 router.get('/parkData',  (req, res) => {
    async function userQuery(){
         return new Promise((resolve,reject)=>{
             db.query('select * from parkmark', function(error,results,field){
                     resolve(results);
             });
 
         })
     }
 
     async function resolveQueries(){
         let data = await userQuery();
         res.json(data);
         
     }
 
     resolveQueries();
     
 })

module.exports = router;
/*
function register() = (req, res) => {
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

function login() = async (req, res) => {
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

function isLoggedIn() = async (req, res, next) => {
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

function logout() = async (req, res) => {    
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2),
        httpOnly: true
    })

    res.status(200).redirect('/');
}
*/

app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));


