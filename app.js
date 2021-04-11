const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");



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

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
})

db.connect( (error) => {
    if(error){
        console.log(error);
    } else{
        console.log("MYSQL connected");
    }
});

let createTable = "CREATE TABLE IF NOT EXISTS users (id int(11) NOT NULL AUTO_INCREMENT,username varchar(100) NOT NULL,email varchar(100) NOT NULL,password varchar(255) NOT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4";

db.query(createTable, function(error, results) {
    if(error){
        console.log(error);
    } 
})

let createTrailheads = "CREATE TABLE IF NOT EXISTS markers (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,trailhead VARCHAR( 60 ) NOT NULL ,restroom VARCHAR( 80 ) NOT NULL ,fee VARCHAR( 80 ) NOT NULL ,bikes VARCHAR( 80 ) NOT NULL ,dogs VARCHAR( 80 ) NOT NULL ,lat FLOAT( 10, 6 ) NOT NULL ,lng FLOAT( 10, 6 ) NOT NULL);"

db.query(createTrailheads, function(error, results) {
    if(error){
        console.log(error);
    } 
})

let createParks = "CREATE TABLE IF NOT EXISTS parkMark (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,name VARCHAR(60) NOT NULL ,picnicShelter VARCHAR(80) NOT NULL ,playground VARCHAR(80) NOT NULL ,restroom VARCHAR(80) NOT NULL ,sportsField VARCHAR(80) NOT NULL ,tennis VARCHAR(80) NOT NULL ,basketball VARCHAR(80) NOT NULL ,volleyball VARCHAR(80) NOT NULL ,rtd VARCHAR(80) NOT NULL ,bikePath VARCHAR(80) NOT NULL ,lat FLOAT(10, 6) NOT NULL ,lng FLOAT(10, 6) NOT NULL);"

db.query(createParks, function(error, results) {
    if(error){
        console.log(error);
    } 
})



app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));



app.listen(5000, () => {
    console.log("Server started on port 5000");
})