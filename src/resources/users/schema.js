var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username: String,
  password: String
});

var User = mongoose.model('users', usersSchema,'users');
module.exports = User; 