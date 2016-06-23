var forum_app = angular.module('forum_app', ['ngRoute', 'ngAnimate']);

forum_app.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl: 'partials/login.html'
        })
        .when('/dash',{
            templateUrl: 'partials/dash.html'
        })
        .when('/user',{
            templateUrl: 'partials/user.html'
        })
        .when('/topic/:id',{
            templateUrl: 'partials/post.html'
        })
})

forum_app.controller('UsersController', function($scope, $location, $routeParams, UserFactory, PostFactory) {

    UserFactory.getAll(function(currUser, dispUser, users){
        $scope.currentUser = currUser;
        $scope.dispUser = dispUser;
        $scope.users = users;
    })
    PostFactory.getAll(function(cats, posts){
        $scope.categories = cats;
        $scope.posts = posts;
    })


    $scope.login = function(){
        UserFactory.login($scope.user, function(user){
            $scope.currentUser = user;
        });
        $location.url('/dash');
    }
    $scope.logout = function(){
        UserFactory.logout();
        $location.url('/');
    }
    $scope.showUser = function(name){
        $location.url('/user');
        UserFactory.setDispUser(name);
    }
    $scope.showTopic = function(topic){
        PostFactory.getTopic(topic, function(top){
            var url = top._id;
            $location.url('/topic/'+url);
        });
    }

    $scope.addPost = function(){
        $scope.newPost.OP = $scope.currentUser.name;
        PostFactory.addPost($scope.newPost, function(posts){
            $scope.posts = posts;
        });
        $scope.newPost = {};

        UserFactory.addPostCount($scope.currentUser, function(users){
            $scope.users = users;
        });
    }

})

forum_app.controller('PostsController', function($scope, $location, $route, $routeParams, UserFactory, PostFactory) {

    if($routeParams){
        PostFactory.getTopic($routeParams.id, function(top){
            $scope.showTopic = top;
        });
    }

    UserFactory.getAll(function(currUser, dispUser, users){
        $scope.currentUser = currUser;
        $scope.dispUser = dispUser;
        $scope.users = users;
    })

    $scope.showUser = function(name){
        UserFactory.setDispUser(name);
        $location.url('/user');
    }

    $scope.logout = function(){
        UserFactory.login('', function(){});
        $location.url('/');
    }

    $scope.addMessage = function(){
        $scope.newMessage.msgUser = $scope.currentUser.name;
        var message = {user: $scope.currentUser, topic: $scope.showTopic, message: $scope.newMessage};
        PostFactory.addMessage(message, function(topic){
            $scope.showTopic = topic;
            UserFactory.addMsgCount($scope.currentUser);
        });

        $scope.newMessage = {};
    }

    $scope.addComment = function(message, comment){
        comment.commentUser = $scope.currentUser.name;
        var newComment = {user: $scope.currentUser, message: message, comment: comment, topic: $scope.showTopic._id};
        PostFactory.addComment(newComment, function(newmsg){

            for(var msg in $scope.showTopic.messages){
                if($scope.showTopic.messages[msg]._id == newmsg._id){
                    $scope.showTopic.messages[msg] = newmsg;
                }
            }
            UserFactory.addCmntCount($scope.currentUser);
        })
    }

    $scope.like = function(message){
        var like = {message: message, user: $scope.currentUser};
        PostFactory.like(like, function(check){
            if(check == 'Ok'){
                for(var msg in $scope.showTopic.messages){
                    if($scope.showTopic.messages[msg]._id == message._id){
                        $scope.showTopic.messages[msg].likes.push($scope.currentUser._id);
                        $scope.showTopic.messages[msg].dislikes.splice(msg, 1);
                    }
                }
            }
        });
    }
    $scope.dislike = function(message){
        var dis = {message: message, user: $scope.currentUser};
        PostFactory.dislike(dis, function(check){
            if(check == 'Ok'){
                for(var msg in $scope.showTopic.messages){
                    if($scope.showTopic.messages[msg]._id == message._id){
                        $scope.showTopic.messages[msg].dislikes.push($scope.currentUser._id);
                        $scope.showTopic.messages[msg].likes.splice(msg, 1);
                    }
                }
            }
        })
    }

    $scope.test = function(message){
        console.log('=========thumbup=========');
        console.log(message);
        console.log('==================');

    }

})
