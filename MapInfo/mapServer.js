var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
const { request } = require('express');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Create Database Connection
var pgp = require('pg-promise')();

const dbConfig = {
	host: 'db',
	port: 5432,
	database: 'football_db',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/map', function(req, res) {
	//var color_choice = req.query.color_selection; // Investigate why the parameter is named "color_selection"
	var trailhead = 'select * from markers;'; // Write a SQL query to retrieve the colors from the database
	var parkName = 'select * from parkMark;';// Write a SQL query to retrieve the color message for the selected color
	db.task('get-everything', task => {
        return task.batch([
            task.any(trailhead),
            task.any(parkName)
        ]);
    })
    .then(info => {
    	res.render('pages/map',{
				my_title: "Map",
				mapPoint: trailhead,
				parks: parkName,
			})

        })
    .catch(err => {
            console.log('error', err);
            res.render('pages/map', {
                my_title: 'Map',
                mapPoint: '',
                parks: ''
            })
    });

});

app.listen(3000);
console.log('3000 is the magic port');
