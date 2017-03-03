app.controller('loginController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth) {
	$scope.LoginwithFacebook = function(){
		 console.log("clicked");
		 $cordovaOauth.facebook("180932542403431", ["email"]).then(function(result) {
		 alert("Auth Success..!!"+result);
		 $location.url('/tab/overview');
		 }, function(error) {
		 	alert("Auth Error..!!"+error);
		 $location.url('/tab/overview');
		 });
	};
	
}]);