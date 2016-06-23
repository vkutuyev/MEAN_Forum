var users = require('./../controllers/users.js');
var posts = require('./../controllers/posts.js');

module.exports = function(app) {

    app.get('/getUsers', function(req, res){
        users.getUsers(req, res);
    })

    app.post('/login', function(req, res){
        users.login(req, res);
    })
    app.post('/getOne', function(req, res){
        users.getOne(req, res);
    })
    app.post('/postCount', function(req, res){
        users.postCount(req, res);
    })
    app.post('/msgCount', function(req, res){
        users.msgCount(req, res);
    })
    app.post('/cmntCount', function(req, res){
        users.cmntCount(req, res);
    })


    app.get('/getPosts', function(req, res){
        posts.getPosts(req, res);
    })

    app.post('/addPost', function(req, res){
        posts.addPost(req, res);
    })
    app.post('/getTopic', function(req, res){
        posts.getTopic(req, res);
    })
    app.post('/addMessage', function(req, res){
        posts.addMessage(req, res);
    })
    app.post('/addComment', function(req, res){
        posts.addComment(req, res);
    })
    app.post('/like', function(req, res){
        posts.like(req, res);
    })
    app.post('/dislike', function(req, res){
        posts.dislike(req, res);
    })

}
