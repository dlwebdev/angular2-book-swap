var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var async = require('async');
var moment = require('moment');
var passport = require('passport');

var MongoStore = require('connect-mongo')(session);

var rsvps = require('./routes/rsvps');
var users = require('./routes/users');

require('./server/passport')(passport);

var app = express();

if (app.get('env') !== 'production') {

  // expose node_modules to client app
  app.use(express.static(__dirname + "/node_modules"));
}

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app')));

var Rsvp = require('./server/models/rsvp');
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '63BCSdCRdfJ1bZupxB5OeA',
  consumer_secret: 'tJf5idBAYm-sLyeEtaNYojZBaXk',
  token: 'H2XjHsW_dE0ILIPpqcEQ5HxzdUUfignR',
  token_secret: 'Sh0M1K0IziMwTBernLlqeKH6kIw'
});

mongoose.connect('mongodb://admin:admin@ds145405.mlab.com:45405/dlw-nightlife-app'); // Connect to MongoDB database for polling app.  

// Make sure mongod is running! If not, log an error and exit. 

mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(session({ 
  secret: 'my_precious_l@3', 
  cookie: { maxAge: 60000 },
  saveUninitialized: false, // don't create session until something stored 
  resave: false, //don't save session if unmodified     
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));   
  
app.use(session({
  secret: 'my_precious_l@3',
  resave: false,
  saveUninitialized: true
})); 

app.use(passport.initialize());
app.use(passport.session());   
  
app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });  
    
app.get('/api/user/authenticated', function(req, res, next) {
  var authed = false;
  if (req.isAuthenticated()) {
    authed = true;
  }
  res.json({'authenticated': authed});
});    
    
app.get('/api/user/get-id-of-logged-in', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({'user': req.user});
  } else {
    res.json({'userId': '-1'});
  }
}); 

app.use('/api/users', users);
app.use('/api/rsvps', rsvps);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
