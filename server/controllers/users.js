var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
    return {

        getUsers: function(req, res){
            User.find({}, function(err, users){
                if(err){
                    console.log('error in getUsers server cont');
                }
                else {
                    res.json(users);
                }
            })
        },

        login: function(req, res){
            User.findOne({name: req.body.name},function(err, user){
                if(err){
                    res.send('ERROR');
                }
                else {
                    if(!user){
                        res.json(req.body);
                    }
                    else{
                        res.json(user);
                    }
                }
            })
        },

        getOne: function(req, res){
            User.findOne({name: req.body.name}, function(err, user){
                if(err){
                    console.log('error in server getOne');
                }
                else {
                    if(!user){
                        res.json(req.body);
                    }
                    else{
                        res.json(user);
                    }
                }
            })
        },

        postCount: function(req, res){
            User.findOne({_id: req.body._id}, function(err, user){
                if(err){
                    console.log('error');
                }
                else {
                    user.posts++;
                    user.save(function(err){
                        if(err){
                            console.log('error in postCount');
                        }
                        else {
                            User.find({}, function(err, users){
                                res.json(users);
                            })
                        }
                    })
                }
            })
        },

        msgCount: function(req, res){
            User.findOne({_id: req.body._id}, function(err, user){
                if(err){
                    console.log('error');
                }
                else{
                    user.replies++;
                    user.save(function(err){
                        if(err){
                            console.log('error in msgCount');
                        }
                        else{
                            User.find({}, function(err, users){
                                res.json(users);
                            })
                        }
                    })
                }

            })

        },

        cmntCount: function(req, res){
            User.findOne({_id: req.body._id}, function(err, user){
                if(err){
                    console.log('error');
                }
                else {
                    user.comments++;
                    user.save(function(err){
                        if(err){
                            console.log('error');
                        }
                        else {
                            User.find({}, function(err, users){
                                res.json(users);
                            })
                        }
                    })
                }
            })
        }


    }
})
();
