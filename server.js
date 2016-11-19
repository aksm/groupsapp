var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var app = express();

// Comment out for deployment
// var dotenv = require('dotenv');
// dotenv.load();

// Set port
app.set('port', process.env.PORT || 8080);

// Set static
app.use('/assets',express.static(__dirname + '/public/assets'));

// Set handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', function(req, res) {
	res.render('index');
});

// Listener
app.listen(app.get("port"), function() {console.log("Hollaback on port: "+app.get("port"));});