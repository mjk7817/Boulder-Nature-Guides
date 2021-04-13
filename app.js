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
app.use('/', require('./routes/pages'));

app.use('/auth', require('./routes/auth'));
