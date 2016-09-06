var express = require('express');
var router = express.Router();
var books = require('google-books-search');

var Book = require('../server/models/book');

router.get('/', function(req, res) {
  Book.find({}, function (err, books) {
    if(err) console.log('Err: ', err);
    res.json(books);
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

  //userId: String,
  //thumbnail: String,
  //isCheckedOut: Boolean,
  //name: String

    console.log('Adding book to users collection: ', book);

    book.save(function (err, book) {
      if (err) { 
        console.log('error saving book: ', err);
      }
      res.status(201).json(book);
    });

});

module.exports = router;