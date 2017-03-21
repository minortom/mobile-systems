app.controller('askController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup','$route', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup, $route) {
	var userSettings = store.get('userSettings');
	$scope.askList = [];
  	$scope.totalLevel = store.get('totalLevel');
  	var listCount = 0;
  	var previousData;
	$scope.askQuestion = function() {
		$location.path('ask-question');
	}
	$scope.loadAskList = function() {
		apiService["getUserAsk"]("post", {
	    	ignoreDuplicateRequest: true,
	    }, null, "all", null, {fbid:userSettings.login.fbid }).then(function(res) {
	    	console.log(res)
	    	if(res.data) {
		    	if(res.data.data) {
		    		$scope.askList = res.data.data;
		    		if(res.data.data !== previousData) {
				    	if(res.data.data.length > listCount && listCount != 0) {
				    		var badgeAlerts = store.get("badgeAlerts");
				    		badgeAlerts.askBadge = res.data.data.length - listCount;
				    		previousData = res.data.data;
				    		store.set("badgeAlerts", badgeAlerts);
				    		listCount = res.data.data.length;
				    	}
				    }
			    }
			}
	    }).catch(function(response) {
	    	
	    });
	}
	$scope.acceptAnswer = function(id) {
		
		apiService["postUserAnswerAccept"]("post", {
	    	ignoreDuplicateRequest: true,
	    }, null, "all", null, {answerid:id }).then(function(res) {
	    	if(res.data.success) {
	    		console.log("success");
	    		var alertPopup = $ionicPopup.alert({
				     title: 'You accepted this question!',
				     template: 'Good job!'
				});

				
			   alertPopup.then(function(res) {
			      $scope.loadAskList(); // load data from $http
			   });
	    	}
	    }).catch(function(response) {
	    	
	    });
	}
	$scope.loadAskList();
	 $rootScope.$on('refr', function() {
       $scope.loadAskList(); // load data from $http
   });
	 $timeout(function () {
        $scope.loadAskList(); // load data from $http
    }, 10000);
}]);
