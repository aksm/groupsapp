// var gcal = require('google-calendar');
// var google_calendar = new gcal.GoogleCalendar(accessToken);

// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var passport = require('passport');
// var gcal     = require('google-calendar');
 
// passport.use(new GoogleStrategy({
//     clientID: config.consumer_key,
//     clientSecret: config.consumer_secret,
//     callbackURL: "http://localhost:8080/auth/callback",
//     scope: ['openid', 'email', 'https://www.googleapis.com/auth/calendar'] 
//   },
//   function(accessToken, refreshToken, profile, done) {
    
//     //google_calendar = new gcal.GoogleCalendar(accessToken); 
    
//     return done(null, profile);
//   }
// ));

// var google_calendar = new gcal.GoogleCalendar(accessToken);
 
// google_calendar.calendarList.list(function(err, calendarList) {
  
//   ...
  
//   google_calendar.events.list(calendarId, function(err, calendarList) {
    
//     ...
//   });
// });

// module.exports = google_calendar;

$(document).ready(function() {
    $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyDmhYw5oa57Me3sN606pv6qaCOk7YCV17Y',
        events: {
            googleCalendarId: 'il4maior5s5jn2kbkl5n9ppb8s@group.calendar.google.com'
        }
    });
});