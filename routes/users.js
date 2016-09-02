var express = require('express');
var router = express.Router();

var User = require('../server/models/user');

// Define routes.
router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  }
);

router.post('/register', function(req, res) {
  console.log("Registering User: ", req.body);
  
  User.findOne({ 'username' : req.body.username }, function(err, user) {
    if(err) console.log('Err: ', err);
    
    // if there is an error, stop everything and return that
    // ie an error connecting to the database
    if (user) {
      //console.log("This account already exists. Send to login page.");
      res.redirect('/login');
    }
    else {
      //console.log("Account doesn't exist. Go ahead and create it.");
      
      var user = new User({
        username: req.body.username,
        password: req.body.password
      });

      // save our user into the database
      user.save(function(err) {
        if (err) throw err;
        res.redirect('/');
      });      
    }

  });  
  
}); 

router.get('/login',
  function(req, res){
    res.render('login');
  });
  
router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

module.exports = router;
