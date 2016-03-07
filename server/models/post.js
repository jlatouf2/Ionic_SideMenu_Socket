// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = new Schema({
  username: String,
  body:     String,
});

var Post = new Schema({
  username: String,
  body:     String,
});

// var schematodo = db.Postings.findOne();


module.exports = mongoose.model('Postings', Post);