app.controller('answerController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup',function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup) {
  var userSettings = store.get('userSettings');
  $scope.answerQuestion = function(id, question) {
    $location.path('answer-question').search({question: question, id: id});
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
	$rootScope.$on('refr', function() {
       $scope.loadAnswerList(); // load data from $http
   });
	$timeout(function () {
        $scope.loadAnswerList(); // load data from $http
    }, 10000);
}]);
