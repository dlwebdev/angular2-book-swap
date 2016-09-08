// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  city: String,
  state: String
});

module.exports = mongoose.model('User', userSchema);