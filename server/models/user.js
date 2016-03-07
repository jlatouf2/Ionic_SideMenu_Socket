var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
     passportLocalMongoose = require('passport-local-mongoose');

 
var User = new Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    facebook: {
        fbid:{
            type: String,
            trim: true
        },
        token:{
            type: String
        },
        displayName:{
            type: String
        },
        email:{
            type: String
        },
        profileUrl:{
            type: String
        }
    }
});
 User.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', User);