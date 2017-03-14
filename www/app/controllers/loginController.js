app.controller('loginController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth','$http', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $http) {

	$scope.LoginwithFacebook = function(){
		 console.log("clicked");
		 $cordovaOauth.facebook("180932542403431", ["email", "user_about_me", "user_likes"]).then(function(result) {
		 alert("Auth Success..!!"+result);
		 store.set('ouathFB', result);
		 console.log(result);
	  	$http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: result.access_token, fields: "id,name,gender,location,website,picture,relationship_status, likes", format: "json" }}).then(function(result) {
            console.log(result.data);
            store.set('userSettings', {level : 2, asked : 5, answered : 4, correctlyAnswered: 3, socialmedia: { facebook : result.data }});
        }, function(error) {
            alert("There was a problem getting your profile.  Check the logs for details.");
            console.log(error);
        });
		 console.log(result);
		 $location.url('/add-interests');
		 }, function(error) {
		 	alert("Auth Error..!!"+error);
		 $location.url('/add-interests');
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
