app.controller('askController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup','$route', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup, $route) {
	var userSettings = store.get('userSettings');
	$scope.askList = [];
  	$scope.totalLevel = store.get('totalLevel');
	$scope.askQuestion = function() {
		$location.path('ask-question');
	}
	$scope.loadAskList = function() {
		apiService["getUserAsk"]("post", {
	    	ignoreDuplicateRequest: true,
	    }, null, "all", null, {fbid:userSettings.login.fbid }).then(function(res) {
	    	console.log(res);
	    	$scope.askList = res.data.data;
	    }).catch(function(response) {
	    	
	    });
	}
	$scope.loadAskList();
	 $rootScope.$on('refr', function() {
       $scope.loadAskList(); // load data from $http
   });
}]);
