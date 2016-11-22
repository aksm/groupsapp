var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var path = require('path');



module.exports = function(app) {

// Incorporated a variety of Express packages.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(require('cookie-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true, maxAge: 60000 }));

app.set('views', path.join(__dirname, '../../views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/login', function(req, res) {
  res.redirect('/');
});
// Passport / Facebook Authentication Information
passport.use(new Strategy({
  clientID: process.env.FB_CLIENT_ID || '1826103597601691',
  clientSecret: process.env.FB_CLIENT_SECRET || '1c5d8736244d4ecadc89fe7c0384eff0',
  // callbackURL: 'http://localhost:3000/login/facebook/return'
  callbackURL: 'https://blooming-mesa-49377.herokuapp.com/login/facebook/return'
},
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
}));


// Here we start our Passport process and initiate the storage of sessions (i.e. closing browser maintains user)
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Initiate the Facebook Authentication
app.get('/login/facebook', passport.authenticate('facebook'));

// When Facebook is done, it uses the below route to determine where to go
app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),

  function(req, res) {
    res.redirect('/dashboard');
  });
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/');
}

app.get('/dashboard', ensureAuthenticated, function(req, res) {
	res.render('dashboard');
});
// app.get('/dashboard',
// 	require('connect-ensure-login').ensureLoggedIn('/login/facebook'),
// 	function(req, res) {
// 		res.render('dashboard');
// });

};