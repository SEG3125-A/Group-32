// Entry point for the application

// express application
var express = require('express');
// require the controller we make
var surveyController = require('./surveyController');


var app = express();

app.set('view engine', 'ejs');

var fs = require('fs');
const { RedFormat } = require('three');



const path = require('path');

app.get('/submit-survey', function (req, res) {
    
    const filenames = {
        color: 'color.json',
        fruit: 'fruit.json',
        animal: 'animal.json',
        meal: 'meal.json',
        season: 'season.json',
        country: 'country.json'
    };
    
    const results = {};
    
    for (const category in filenames) {
        if (filenames.hasOwnProperty(category)) {
            const filename = filenames[category];
            const filePath = path.join(__dirname, 'data', filename);
    
            let existingData = [];
            if (fs.existsSync(filePath)) {
                existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }
    
            results[Object.keys(results).length] = existingData;
        }
    }
    
    res.render('showResults', { results: results });
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/niceSurvey.html');
});

// set up template engine

// static file serving
app.use(express.static('./public'));

// fire function from surveyController
surveyController(app);

// listen to port
app.listen(3000);
console.log('listening port 3000');