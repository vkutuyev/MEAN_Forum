var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = (function() {
    return {

        getPosts: function(req, res){
            Post.find({}, function(err, posts){
                if(err){
                    console.log('error in getPosts server cont');
                }
                else {
                    res.json(posts);
                }
            })
        },

        addPost: function(req, res){
            var post = new Post(req.body);
            post.save(function(err){
                if(err){
                    console.log('error in addPost server cont');
                }
                else {
                    console.log('post added');
                    res.redirect('/');
                }
            })
        },

        getTopic: function(req, res){
            Post.findOne({_id: req.body.topic})
                .populate({
                    path: 'messages',
                    populate: {path: 'comments'}
                })
                .exec(function(err, post){
                    if(err){
                        console.log('error in getTopic server cont');
                    }
                    else {
                        res.json(post);
                    }
                })
        },

        addMessage: function(req, res){
            Post.findOne({_id: req.body.topic._id})
                .populate({
                    path: 'messages',
                    populate: {path: 'comments'}
                })
                .exec(function(err, post){
                    var message = new Message(req.body.message);
                    message._post = post._id;
                    message.save(function(err){
                        if(err){
                            console.log('error in addMessage server cont');
                            console.log(err);
                        }
                        else {
                            post.messages.push(message);
                            post.save(function(err){
                                if(err){
                                    console.log('error in post.save in addMessage server cont');
                                }
                                else {
                                    res.json(post);
                                }
                            })
                        }
                })
            })
        },

        addComment: function(req, res){

            Post.findOne({_id: req.body.topic})
                .populate({
                    path: 'messages',
                    populate: {path: 'comments'}
                })
                .exec(function(err, post){
                    Message.findOne({_id: req.body.message._id})
                           .populate('comments')
                           .exec(function(err, message){
                               var comment = new Comment(req.body.comment);
                               comment._message = message._id;
                               comment.save(function(err){
                                   if(err){
                                       console.log('error in addComment');
                                   }
                                   else {
                                       message.comments.push(comment);
                                       message.save(function(err){
                                           if(err){
                                               console.log('error in addComment');
                                           }
                                           else {
                                               res.json(message);
                                            }
                                        })
                                    }
                                })
                            })
                    })
        },

        like: function(req, res){
            Message.findOne({_id: req.body.message._id}, function(err, message){
                if(err){
                    console.log('db error');
                }
                else {
                    var found = false;
                    for(var like of message.likes){
                        if(like == req.body.user._id){
                            found = true;
                        }
                    }
                    if(found == false){
                        message.likes.push(req.body.user._id);
                        message.save();

                        for(var dis in message.dislikes){
                            if(message.dislikes[dis] == req.body.user._id){
                                message.dislikes.splice(dis, 1);
                            }
                        }

                        res.json('Ok');
                    }
                    else{
                        res.json('Nope');
                    }
                }
            })
        },

        dislike: function(req, res){
            Message.findOne({_id: req.body.message._id}, function(err, message){
                if(err){
                    console.log('error');
                }
                else {
                    var found = false;
                    for(var dis of message.dislikes){
                        if(dis == req.body.user._id){
                            found = true;
                        }
                    }
                    if(found == false){
                        message.dislikes.push(req.body.user._id);
                        message.save();

                        for(var like in message.likes){
                            if(message.likes[like] == req.body.user._id){
                                message.likes.splice(like, 1);
                            }
                        }

                        res.json('Ok');
                    }
                    else {
                        res.json('Nope');
                    }
                }
            })
        }



    }
})
();
