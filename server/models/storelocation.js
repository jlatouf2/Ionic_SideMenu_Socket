// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Store = new Schema({
	post_id: String,
	longitude: String,
	latitude: String,
	postal: String,
	store: String,
});

module.exports = mongoose.model('Storelocation', Store);