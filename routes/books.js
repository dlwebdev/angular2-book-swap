var express = require('express');
var router = express.Router();
var books = require('google-books-search');
var moment = require('moment');

var Book = require('../server/models/book');
var BookRequest = require('../server/models/request');

router.get('/', function(req, res) {
  var currentUserId = '0';
  
  if(req.user) currentUserId = req.user._id;
  
  Book.find({'userId': {'$ne': currentUserId}}, function (err, books) {
    if(err) console.log('Err: ', err);
    res.json(books);
  }); 
});

router.get('/:bookId', function(req, res) {
  var bookId = req.params.bookId;
  
  Book.find({'_id': bookId}, function (err, book) {
    if(err) console.log('Err: ', err);
    res.json(book[0]);
  }); 
});

router.get('/search/:term', function(req, res) {
  var searchTerm = req.params.term;
  console.log("Will search for books matching the term passed in: ", searchTerm);
  
  books.search(searchTerm, function(error, results) {
      if ( ! error ) {
          console.log(results);
          res.json(results);
      } else {
          console.log(error);
      }
  });  
});

router.get('/user/:id', function(req, res) {
    var currentUserId = req.params.id;
    
    Book.find({ 'userId': currentUserId }, function (err, books) {
        if(err) console.log('Err: ', err);
        res.json(books);
    });   
});

router.post('/', function(req, res) {
    var book = new Book(req.body);

    console.log('Adding book to users collection: ', book);

    book.save(function (err, book) {
      if (err) { 
        console.log('error saving book: ', err);
      }
      res.status(201).json(book);
    });
});

router.post('/request/:userIdRequesting', function(req, res) {
    var currentDate = moment().format('MM-DD-YYYY');
    
    var bookRequest = new BookRequest({
      bookId: req.body._id,
      userIdHasBook: req.body.userId,
      userIdRequesting: req.params.userIdRequesting,
      requestProcessed: false,
      date: currentDate
    });

    bookRequest.save(function (err, req) {
      if (err) { 
        console.log('error saving book: ', err);
      }
      res.status(201).json(req);
    });
});

router.get('/user/requests/:id', function(req, res) {
    var currentUserId = req.params.id;
    
    BookRequest.find({ 'userIdRequesting': currentUserId }, function (err, books) {
        if(err) console.log('Err: ', err);
        res.json(books);
    });   
});

router.get('/requests-for-user/:id', function(req, res) {
    var currentUserId = req.params.id;
    
    BookRequest.find({ 'userIdHasBook': currentUserId }, function (err, books) {
        if(err) console.log('Err: ', err);
        res.json(books);
    });   
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    
    Book.remove({'_id': id},function(result) {
        console.log("Removed book. Results: ", result);
    });    
});


module.exports = router;