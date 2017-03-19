app.controller('answerController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup',function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup) {
  var userSettings = store.get('userSettings');
  $scope.answerQuestion = function(id) {
    console.log(id);
    store.set('currentQuestion', id);
    $rootScope.currentId = id;
    $location.path('answer-question');
  }
  $scope.loadAnswerList = function() {
		apiService["getUserAnswer"]("post", {
	    	ignoreDuplicateRequest: true,
	    }, null, "all", null, {fbid:userSettings.login.fbid }).then(function(res) {
	    	console.log(res);
	    	$scope.answerList = res.data.data;
	    }).catch(function(response) {
	    	
	    });
	}
	$scope.loadAnswerList();
}]);
