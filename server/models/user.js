var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    posts: Number,
    replies: Number,
    comments: Number
});

mongoose.model('User', UserSchema);
