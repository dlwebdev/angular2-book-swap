// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var bookSchema = new Schema({
  userId: String,
  name: String
});

module.exports = mongoose.model('Book', bookSchema);