var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var passport = require('passport');
var fbStrategy = require('passport-facebook').Strategy;
var googleStrategy = require('passport-google-oauth2').Strategy;
var path = require('path');

// monkeypatch because passport uses the google plus API which isn't available for google apps for enterprise.
googleStrategy.prototype.userProfile = function(token, done) {
  done(null, {});
};

module.exports = function(app) {

// Incorporated a variety of Express packages.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(require('cookie-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: {maxAge: 60000} }));

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
passport.use(new fbStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
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

// Use the GoogleStrategy within Passport.
passport.use(new googleStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    // callbackURL: "http://localhost:3000/login/google/return",
	callbackURL: 'https://blooming-mesa-49377.herokuapp.com/login/google/return',
    passReqToCallback   : true
  },
  function(User, request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
  }
));

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

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authenticating, Google will redirect the
//   user back to this application at /auth/google/return
app.get('/login/google', passport.authenticate('google', { scope: 
  	[ 'https://www.googleapis.com/auth/plus.login',
  	'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

// GET /auth/google/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/login/google/return', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
  	console.log(res);
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