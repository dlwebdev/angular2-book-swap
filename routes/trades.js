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

router.put('/', function(req, res) {
    var trade = req.body;
    var id = trade._id;

    delete trade._id;

    if (id) {
        BookRequest.update({_id: id}, trade, {upsert: true}, function (err, trade) {
            if(err) console.log('Err: ', err);
            //res.json(account);
            BookRequest.findOne({'_id':id},function(err, result) {
                if(err) console.log('Err: ', err);
                return res.send(result);
            });           
        });
    }    
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    
    BookRequest.remove({'_id': id},function(result) {
        console.log("Removed trade. Results: ", result);
    });    
});


module.exports = router;