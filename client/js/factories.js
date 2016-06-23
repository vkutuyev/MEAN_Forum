forum_app.factory('UserFactory', function($http){
    var factory = {};
    var users = [];
    var currentUser = {};
    var dispUser = {};


    factory.login = function(user, callback){
        $http.post('/login', user).success(function(retuser){
            currentUser = retuser;
            callback(currentUser);
        })
    }
    factory.logout = function(){
        currentUser = {};
    }

    factory.getAll = function(callback){
        $http.get('/getUsers').success(function(output){
            users = output;
            callback(currentUser, dispUser, users);
        })
    }

    factory.setDispUser = function(name){
        $http.post('/getOne', {name}).success(function(user){
            dispUser = user;
        })
    }

    factory.addPostCount = function(user, callback){
        $http.post('/postCount', user).success(function(updusers){
            users = updusers;
            callback(users);
        })
    }
    factory.addMsgCount = function(user){
        $http.post('/msgCount', user).success(function(updusers){
            users = updusers;
        })
    }
    factory.addCmntCount = function(user){
        $http.post('/cmntCount', user).success(function(updusers){
            users = updusers;
        })
    }


    return factory;
})

forum_app.factory('PostFactory', function($http){
    var factory = {};
    var posts = [];
    var topic = {};
    var categories = ['Ruby on Rails', 'MySQL', 'HTML', 'PHP', 'Javascript', 'Swift'];


    factory.getAll = function(callback){
        $http.get('/getPosts').success(function(dbposts){
            posts = dbposts;
            callback(categories, posts);
        })
    }

    factory.addPost = function(post, callback){
        $http.post('/addPost', post).success(function(){
            $http.get('/getPosts').success(function(dbposts){
                posts = dbposts;
                callback(posts);
            })
        })
    }

    factory.getTopic = function(topic, callback){
        $http.post('/getTopic', {topic}).success(function(top){
            topic = top;
            callback(topic);
        })
    }

    factory.addMessage = function(message, callback){
        $http.post('/addMessage', message).success(function(postres){
            topic = postres;
            callback(topic);
        })
    }

    factory.addComment = function(comment, callback){
        $http.post('/addComment', comment).success(function(res){
            callback(res);
        })
    }

    factory.like = function(like, callback){
        $http.post('/like', like).success(function(check){
            callback(check);
        })
    }
    factory.dislike = function(dislike, callback){
        $http.post('/dislike', dislike).success(function(check){
            callback(check);
        })
    }

    return factory;
})
