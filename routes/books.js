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
  
module.exports = router;