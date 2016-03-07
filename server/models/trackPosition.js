// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Track = new Schema({
	post_id: String,
	longitude: String,
	latitude: String,
	username: String,
	store: String,
	linein: String,
	position: String,
	distance: String,
});

module.exports = mongoose.model('trackposition', Track);
//Note: you cant make the database push capital letters in the middle of a word to it with mean stack.....