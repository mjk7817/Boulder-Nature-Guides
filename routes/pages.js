const express = require("express");
const app = express();
const mysql = require("mysql");
const serv = require('http').createServer(app);
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
var pgp = require('pg-promise')();


serv.listen(port, () => {
  console.log('Server successfully started at port %d', port);
});

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
