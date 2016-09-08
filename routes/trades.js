var express = require('express');
var router = express.Router();

var BookRequest = require('../server/models/request');

router.get('/', function(req, res) {
  BookRequest.find({}, function (err, trades) {
    if(err) console.log('Err: ', err);
    res.json(trades);
  }); 
});

router.get('/:tradeId', function(req, res) {
  var tradeId = req.params.tradeId;
  
  BookRequest.find({'_id': tradeId}, function (err, request) {
    if(err) console.log('Err: ', err);
    res.json(request);
  }); 
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    
    BookRequest.remove({'_id': id},function(result) {
        console.log("Removed trade. Results: ", result);
    });    
});


module.exports = router;