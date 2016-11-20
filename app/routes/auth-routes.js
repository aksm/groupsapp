var express = require('express');
var app = express();
var passport = require("passport");
var Strategy = require("passport-facebook").Strategy;
var path = require("path");

// Incorporated a variety of Express packages.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));


module.exports = function(app) {

// Passport / Facebook Authentication Information
passport.use(new Strategy({
  clientID: process.env.FB_CLIENT_ID || "1826103597601691",
  clientSecret: process.env.FB_CLIENT_SECRET || "1c5d8736244d4ecadc89fe7c0384eff0",
  callbackURL: "http://localhost:3000/login/facebook/return"
},
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user"s Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application"s database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Here we start our Passport process and initiate the storage of sessions (i.e. closing browser maintains user)
app.use(passport.initialize());
app.use(passport.session());
// Initiate the Facebook Authentication
app.get("/login/facebook", passport.authenticate("facebook"));

// When Facebook is done, it uses the below route to determine where to go
app.get("/login/facebook/return",
  passport.authenticate("facebook", { failureRedirect: "/#login" }),

  function(req, res) {
  	console.log("logged in with facebook");
    res.redirect("/dashboard");
  });

};