// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var messageSchema = new Schema({
  fromUser: String,
  toUser: String,
  message: String,
  date: String
});

module.exports = mongoose.model('Message', messageSchema);