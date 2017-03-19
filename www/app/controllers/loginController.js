app.controller('loginController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth','$http', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $http) {
    var getpaging = function(data, fbid, token) {
        if(data.paging) {
            if(data.paging.next) {
                console.log("1")
                $http.get(data.paging.next, { params: { access_token: token, format: "json" }}).then(function(response) {
                    var likes = [];
                    response.data.data.forEach(function(item) {
                        var str = item.name;
                        var words = str.split(" ");
                        words.forEach(function(items) {
                             likes.push(items);
                        })
                    });
                    apiService["postUserTags"]("post", {
                        ignoreDuplicateRequest: true,
                    }, null, "all", null, {likes:likes, fbid:fbid}).then(function(res) {
                       console.log("2")
                    }).catch(function(response) {
                      
                    });
                    getpaging(response.data, fbid, token);
                });
            } else {
                $timeout(function () {
                    console.log(data.paging.next);
                    console.log("redirect a")
                     $location.url('/add-interests');
                }, 2000);
            }
        } else {
            $timeout(function () {
                console.log("redirect b")
                 $location.url('/add-interests');
            }, 1000);
        }
    }
	$scope.LoginwithFacebook = function(){
		$cordovaOauth.facebook("180932542403431", ["email", "user_about_me", "user_likes"]).then(function(result) {
            store.set('ouathFB', result);
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,name,gender,location,website,picture,relationship_status, likes, email", format: "json" }}).then(function(result) {
                console.log("LOGIN");
                var data = {
                    fbid: result.data.id,
                    name: result.data.name,
                    url: result.data.picture.data.url
                }
                console.log(data);
                apiService["postUser"]("post", {
                    ignoreDuplicateRequest: true,
                }, null, "all", null, data).then(function(res) {
                    console.log("POST");
                    store.set('userSettings', {level : 2, asked : 5, answered : 4, correctlyAnswered: 3, login: data});
                    
                    result.data.likes.data.forEach(function(item) {
                        apiService["postUserTags"]("post", {
                            ignoreDuplicateRequest: true,
                        }, null, "all", null, {likes:item.name, fbid:result.data.id}).then(function(res) {
                           console.log("a")
                        }).catch(function(response) {
                          
                        });
                    })
                    if(result.data.likes.paging) {
                        if(result.data.likes.paging.next) {
                            $http.get(result.data.likes.paging.next, { params: { access_token: result.access_token, format: "json" }}).then(function(response) {
                                console.log("b")
                                var likes = [];
                                response.data.data.forEach(function(item) {
                                    likes.push(item.name);
                                })
                                apiService["postUserTags"]("post", {
                                    ignoreDuplicateRequest: true,
                                }, null, "all", null, {likes:likes, fbid:result.data.id}).then(function(res) {
                                   console.log("c")
                                }).catch(function(response) {
                                  
                                });
                                getpaging(response.data, result.data.id, result.access_token);
                            });
                        } else {
                            $timeout(function () {
                                console.log("redirect 1")
                                 $location.url('/add-interests');
                            }, 1000);
                        }
                    } else {
                        $timeout(function () {
                            console.log("redirect 2")
                             $location.url('/add-interests');
                        }, 1000);
                    }
                   
                }).catch(function(response) {
                  
                });
            }, function(error) {
               
            });

		}, function(error) {
            console.log("failure");
            console.log(error);
            var data = {
                fbid: 10208643688874916,
                name: "Tom Arnoldussen",
                url: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/17103809_10208573758566702_2563184864267574297_n.jpg?oh=84e47f6b1b87198489d0613084b7a537&oe=596D5ABD"
            }
             store.set('userSettings', {level : 2, asked : 5, answered : 4, correctlyAnswered: 3, login: data});
             $timeout(function () {
                console.log("redirect 3")
                 $location.url('/add-interests');
            }, 1000);
        });
        
	};
    
	// http://ngcordova.com/docs/plugins/oauth/
	 // $cordovaOauth.dropbox(string appKey);
    // $cordovaOauth.digitalOcean(string clientId, string clientSecret);
    // $cordovaOauth.google(string clientId, array appScope);
    // $cordovaOauth.github(string clientId, string clientSecret, array appScope);
    // $cordovaOauth.linkedin(string clientId, string clientSecret, array appScope, string state);
    // $cordovaOauth.instagram(string clientId, array appScope);
    // $cordovaOauth.box(string clientId, string clientSecret, string state);
    // $cordovaOauth.reddit(string clientId, string clientSecret, array appScope);
    // $cordovaOauth.twitter(string consumerKey, string consumerSecretKey);
    // $cordovaOauth.meetup(string consumerKey);
    // $cordovaOauth.foursquare(string clientId);
    // $cordovaOauth.salesforce(string loginUrl, string clientId);
    // $cordovaOauth.strava(string clientId, string clientSecret, array appScope);
}]);
