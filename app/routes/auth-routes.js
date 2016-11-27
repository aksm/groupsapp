var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var passport = require('passport');
var fbStrategy = require('passport-facebook').Strategy;
var twitterStrategy = require('passport-twitter').Strategy;
var linkedinStrategy = require('passport-linkedin').Strategy;
var googleStrategy = require('passport-google-oauth2').Strategy;
var Strategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local');
var path = require('path');
var session = require('express-session');
var memoryStore = require('session-memory-store')(session);
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var User = require('../models/Users.js');
var Organization = require('../models/Organizations.js');

// Use this to validate what Passport returns from each strategy
function undefinedCheck(value) {
	return value === undefined ? '' : value;
}

module.exports = function(app) {
	app.use(methodOverride('_method'));
	// Incorporated a variety of Express packages.
	app.use(require('morgan')('combined'));
	app.use(require('cookie-parser')());
	app.use(require('body-parser').urlencoded({ extended: true }));
	app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, store: new memoryStore() }));

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
	    // callbackURL: 'http://localhost:3000/login/google/return',
		callbackURL: 'https://blooming-mesa-49377.herokuapp.com/login/google/return',
	    passReqToCallback   : true
	  },
	  function(request, accessToken, refreshToken, profile, done) {
	      return done(null, profile);
	  }
	));

	// Use the TwitterStrategy within Passport.
	passport.use(new twitterStrategy({
	//	clientID: process.env.T_CLIENT_ID,
	//    clientSecret: process.env.T_CLIENT_SECRET,
	    consumerKey: process.env.T_CLIENT_ID,
	    consumerSecret: process.env.T_CLIENT_SECRET,
	    callbackURL: 'https://blooming-mesa-49377.herokuapp.com/login/google/return'
	  },
	   function(request, accessToken, refreshToken, profile, done) {
	      return done(null, profile);
	}
));

	// Use the TwitterStrategy within Passport.
	passport.use(new linkedinStrategy({
	//	clientID: process.env.T_CLIENT_ID,
	//    clientSecret: process.env.T_CLIENT_SECRET,
	    consumerKey: process.env.L_CLIENT_ID,
	    consumerSecret: process.env.L_CLIENT_SECRET,
	    callbackURL: 'https://blooming-mesa-49377.herokuapp.com/login/google/return'
	  },
	   function(request, accessToken, refreshToken, profile, done) {
	      return done(null, profile);
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
	    res.redirect('/dashboard');
	  });

	// GET /auth/twitter
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Twitter authentication will involve redirecting
	//   the user to twitter.com.  After authenticating, Google will redirect the
	//   user back to this application at /auth/twitter/return
	app.get('/login/twitter', passport.authenticate('google', { scope: 
	  	[ 'https://www.googleapis.com/auth/plus.login',
	  	'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
	));

	// GET /auth/twitter/return
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/login/twitter/return', 
	  passport.authenticate('twitter', { failureRedirect: '/' }),
	  function(req, res) {
	    console.log(res);
	    res.redirect('/dashboard');
	  });

	// GET /auth/linkedin
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Linkedin authentication will involve redirecting
	//   the user to twitter.com.  After authenticating, Google will redirect the
	//   user back to this application at /auth/twitter/return
	app.get('/login/linkedin', passport.authenticate('google', { scope: 
	  	[ 'https://www.googleapis.com/auth/plus.login',
	  	'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
	));

	// GET /auth/linkedin/return
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/login/linkedin/return', 
	  passport.authenticate('linkedin', { failureRedirect: '/' }),
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
		var userName = undefinedCheck(req.user.displayName);
		var id = req.user.id;
		var email = undefinedCheck(req.user.emails) === '' ? '' : req.user.emails[0].value;
		var firstName = undefinedCheck(req.user.name.givenName);
		var lastName = undefinedCheck(req.user.name.familyName);
		var provider = req.user.provider;
		var options = {};
		options[provider+'_id'] = id;
	    User.findOrCreate({where: options})
		  .spread(function(user, created) {
		    var groupStatus = user.get({plain: true}).groups === 0;
		    var notRegistered = !user.get({plain: true}).registered;
		    var grootsID = user.get({plain: true}).user_id;
		    var showHide = !notRegistered && groupStatus ? "show": "hide";
			res.render('dashboard', {
				'notRegistered': notRegistered,
				'groupsZero': groupStatus,
				'display': showHide,
				'email': email,
				'name': userName,
				'fName': firstName,
				'lName': lastName,
				'userID': grootsID,
				'groupName': 'Group Name'
			});
		});
	});

	// Route to register users in database.
	app.post('/register', ensureAuthenticated, function(req, res) {
		User.update(
			{
				user_name: req.body.username,
				registered: true,
				f_name: req.body.firstName,
				l_name: req.body.lastName,
				email: req.body.email
			},
			{
				where: {user_id: req.body.userID}
			})
			.then(function(result) {
				res.redirect('/dashboard');
				// res.render('dashboard',{
				// 	'notRegistered': false,
				// 	'groupsZero': true
				// });
			}, function(rejectedPromiseError) {

			});
	});

	app.post('/group/:action?', ensureAuthenticated, function(req, res) {
		// console.log(req);
		console.log(req.body);
		console.log(req.params);
		switch(req.params.action) {
			case 'add':
			    Organization.findOrCreate({
			    	where: {org_name: req.body.groupName},
			    	defaults: {admin_id: req.body.userID}
			    })
				  .spread(function(user, created) {
				  	console.log(user);
				  	switch(created) {
				  		case true:
							User.update(
								{
									groups: User.sequelize.literal('groups +1')
								},
								{
									where: {user_id: req.body.userID}
								})
								.then(function(result) {
								// 	result.updateAttributes(
								// {
								// 	default_group: req.body.groupName
								// },
								// {
								// 	where: {groups: user.get({plain: true}).org_id}
								// });
									console.log(result);
								}, function(rejectedPromiseError) {
									console.log(rejectedPromiseError);
								});
				  		break;
				  		case false:
				  		break;
				  		default:
				  			console.log('WTF happened?');
				  	}
					res.redirect('/dashboard');

					});
			break;
			case 'join':
			break;
			default:
				console.log('Oopsy. What happened?');
		}
	});

	///////////////////////////////////////
	///Passport username authentication///
	/////////////////////////////////////
	// passport.use(new LocalStrategy(
	//     function(username, password, done) {
	//         User.findOne({ username: username }, function(err, user) {
	//             if (err) {
	//                 return done(err);
	//             }
	//             if (!user) {
	//                 return done(null, false, { message: 'Incorrect username.' });
	//             }
	//             if (!user.validPassword(password)) {
	//                 return done(null, false, { message: 'Incorrect password.' });
	//             }
	//             return done(null, user);
	//         });
	//     }
	// ));

	/////////////////////////////////
	///Logout///////////////////////
	///////////////////////////////
	// document.getElementById("logout").addEventListener("click", function() {
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
// });

};
