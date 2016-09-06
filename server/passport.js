// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var RegisterStrategy = require('passport-local-register');

var User = require('./models/user');

// load the auth variables
//var configAuth = require('./auth');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new LocalStrategy(
      function(username, password, done) {
        
        User.findOne({ username: username }, function (err, user) {
          console.log("Finding user in LocalStrategy...");
          
          console.log("user.password: ", user.password);
          console.log("password: ", password);
          
          if (err) {
            return done(err);
          }
    
          if (!user) {
            return done(null, false);
          }
    
          if (user.password !== password) {
            return done(null, false);
          }
    
          return done(null, user);         
          
        });
        
      }
    ));

    passport.use(new RegisterStrategy(
      function verify(username, password, done) {
        User.findOne({
          'username' : username
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            console.log("No user found...");
            return done(); // see section below 
          }
          if (!user.verifyPassword(password)) {
            console.log("Password not verified...");
            return done(null, false);
          }
     
          done(null, user);
        });
      }, function create(username, password, done) {
          console.log("No user found. Creating one.");
          
        User.create({
          'username' : username
        }, function(err, user) {
          if(err) {
            return done(err);
          }
          if(!user) {
            err = new Error("User creation failed.");
            return done(err);
          }
     
          done(null, user);
        });
      }
    ));

};