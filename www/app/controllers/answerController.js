app.controller('answerController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup',function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup) {
  var userSettings = store.get('userSettings');
  var listCount = 0;
  var previousData;
  $scope.answerQuestion = function(id, question) {
    $location.path('answer-question').search({question: question, id: id});
  }
  $scope.loadAnswerList = function() {
		apiService["getUserAnswer"]("post", {
	    	ignoreDuplicateRequest: true,
	    }, null, "all", null, {fbid:userSettings.login.fbid }).then(function(res) {
	    	console.log(res);
	    	if(res.data) {
		    	if(res.data.data) {
		    		$scope.answerList = res.data.data;
		    		if(res.data.data !== previousData) {
				    	if(res.data.data.length > listCount && listCount != 0) {
				    		var badgeAlerts = store.get("badgeAlerts");
				    		badgeAlerts.answerBadge = res.data.data.length - listCount;
				    		listCount = res.data.data.length;
				    		previousData = res.data.data;
				    		store.set("badgeAlerts", badgeAlerts);
				    	}
				    }
			    }
			}
	    }).catch(function(response) {
	    	
	    });
	}
	$scope.loadAnswerList();
	$rootScope.$on('refr', function() {
       $scope.loadAnswerList(); // load data from $http
   });
	$timeout(function () {
        $scope.loadAnswerList(); // load data from $http
    }, 10000);
}]);
