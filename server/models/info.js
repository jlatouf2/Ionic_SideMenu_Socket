// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Info = new Schema({
  name: String,
  email: String,
  phone: String,
  website: String,
  address: String,
  notes: String,
});

module.exports = mongoose.model('Information', Info);