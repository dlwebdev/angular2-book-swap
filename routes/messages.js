var express = require('express');
var router = express.Router();

var moment = require('moment');

var Message = require('../server/models/message');

router.get('/', function(req, res) {
  // Gets all messages in the system. Should not be used.
  
  /*
  Message.find({}, function (err, messages) {
    if(err) console.log('Err: ', err);
    res.json(messages);
  });
  */
});

router.get('/to-user/:id', function(req, res) {
  // Get Messages for this user
    var currentUserId = req.params.id;
    
    Message.find({ 'toUser': currentUserId }, function (err, messages) {
        if(err) console.log('Err: ', err);
        res.json(messages);
    });   
});

router.get('/from-user/:id', function(req, res) {
  // Get Messages for this user
    var currentUserId = req.params.id;
    
    Message.find({ 'fromUser': currentUserId }, function (err, messages) {
        if(err) console.log('Err: ', err);
        res.json(messages);
    });   
});

router.post('/', function(req, res) {
  // Create a new message
  
    var currentDate = moment().format('MM-DD-YYYY');
  
    var message = new Message({
      fromUser: req.body.fromUser,
      toUser: req.body.toUser,
      message: req.body.message,
      date: currentDate
    });

    console.log('Creating a new message: ', message);

    message.save(function (err, message) {
      if (err) { 
        console.log('error saving message: ', err);
      }
      res.status(201).json(message);
    });
});

router.delete('/:id', function(req, res) {
  // Delete a message
    var id = req.params.id;
    
    Message.remove({'_id': id},function(result) {
        console.log("Removed message. Results: ", result);
    });    
});

module.exports = router;