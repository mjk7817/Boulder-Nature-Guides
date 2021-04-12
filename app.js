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
const authController = require('../controllers/auth');//code from auth.js in routes file

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

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
// const db = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// display message on success message if successful
// db.on('connect', () => {
//   console.log('connection successful');
// });


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

// db.connect( (error) => {
//     if(error){
//         console.log(error);
//     } else{
//         console.log("MYSQL connected");
//     }
// });

let createTable = "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL,username varchar(100) NOT NULL,email varchar(100) NOT NULL,password varchar(255) NOT NULL);";

db.query(createTable, function(error, results) {
    if(error){
        console.log(error);
    } 
})

// let createTrailheads = "CREATE TABLE IF NOT EXISTS markers (id INT NOT NULL,trailhead VARCHAR( 60 ) NOT NULL ,restroom VARCHAR( 80 ) NOT NULL ,fee VARCHAR( 80 ) NOT NULL ,bikes VARCHAR( 80 ) NOT NULL ,dogs VARCHAR( 80 ) NOT NULL ,lat FLOAT( 10, 6 ) NOT NULL ,lng FLOAT( 10, 6 ) NOT NULL, img varchar(1000) NOT NULL);"

// db.query(createTrailheads, function(error, results) {
//     if(error){
//         console.log(error);
//     } 
// })

// let createParks = "CREATE TABLE IF NOT EXISTS parkMark (id INT NOT NULL,name VARCHAR(60) NOT NULL ,picnicShelter VARCHAR(80) NOT NULL ,playground VARCHAR(80) NOT NULL ,restroom VARCHAR(80) NOT NULL ,sportsField VARCHAR(80) NOT NULL ,tennis VARCHAR(80) NOT NULL ,basketball VARCHAR(80) NOT NULL ,volleyball VARCHAR(80) NOT NULL ,rtd VARCHAR(80) NOT NULL ,bikePath VARCHAR(80) NOT NULL ,lat FLOAT(10, 6) NOT NULL ,lng FLOAT(10, 6) NOT NULL, img varchar(1000) NOT NULL);"

// db.query(createParks, function(error, results) {
//     if(error){
//         console.log(error);
//     } 
// })

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/register', (req, res) => {
    res.render('register', {message: '', successMessage: ''});
})

router.get('/login', authController.isLoggedIn, (req, res) => {
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
	//var color_choice = req.query.color_selection; // Investigate why the parameter is named "color_selection"
	//var trailhead = 'select * from markers;'; // Write a SQL query to retrieve the colors from the database
	//var parkName = 'select * from parkMark;';// Write a SQL query to retrieve the color message for the selected color
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

router.get('/profile', authController.isLoggedIn, (req, res) => {
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


app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));


