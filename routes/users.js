var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
var saltRounds = 10;

var User = require('../server/models/user');

// Define routes.
router.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  }
);

router.get('/current-user', function(req, res, next) {
  if (req.isAuthenticated()) {
    User.find({'_id': req.user._id}, function (err, user) {
      if(err) console.log('Err: ', err);
      res.json({"_id": user[0]._id,"username": user[0].username});
    });    
  } 
  else {
    res.json({'user': ''});
  }
});

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
      
      var myPlaintextPassword = req.body.password;
      
      bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        if(err) console.log('Err: ', err);
        
        // Store hash in your password DB. 
        
        //console.log("Plain Text Password: ", myPlaintextPassword);
        //console.log("Hashed Password: ", hash);
            
        // Store hash in your password DB.
        var user2 = new User({
          username: req.body.username,
          password: hash
        });
        
        // save our user into the database
        user2.save(function(err) {
          if (err) throw err;
          res.json({"registered": "true"});
        }); 
        
      });      
      
    }

  });  
  
}); 

router.get('/login',
  function(req, res){
    console.log("LOGIN ROUTE!!");
    //res.render('login');
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
