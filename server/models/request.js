// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var bookRequestSchema = new Schema({
  bookId: String,
  userIdHasBook: String,
  userIdRequesting: String,
  counterOfferBookId: String,
  requestProcessed: Boolean,
  date: String
});

module.exports = mongoose.model('BookRequest', bookRequestSchema);