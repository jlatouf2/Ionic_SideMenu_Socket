// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Storeline = new Schema({
	post_id: String,
	linein: String,
	line1 : String,
	line2 : String,
	line3 : String,
	store: String,
});

module.exports = mongoose.model('storeline', Storeline);