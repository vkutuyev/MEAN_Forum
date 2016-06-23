var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    category: {type: String, required: true},
    topic: {type: String, required: true},
    description: {type: String, required: true},
    OP: {type: String, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

var MessageSchema = new mongoose.Schema({
    _post: {type: Schema.Types.ObjectId, ref: 'Post'},
    msgtext: String,
    msgUser: String,
    likes: [String],
    dislikes: [String],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]

});

var CommentSchema = new mongoose.Schema({
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    commenttext: String,
    commentUser: String
});

mongoose.model('Post', PostSchema);
mongoose.model('Message', MessageSchema);
mongoose.model('Comment', CommentSchema);
