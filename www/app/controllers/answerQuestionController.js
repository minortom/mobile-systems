app.controller('answerQuestionController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup', '$ionicHistory', '$stateParams', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup, $ionicHistory, $stateParams) {
  var userSettings = store.get('userSettings');
  var id = $stateParams.id;
  var question = $stateParams.question;
  $scope.currentQuestion = question;

  $scope.answerQuestion = function(text) {
    
    apiService["postUserAnswer"]("post", {
    	ignoreDuplicateRequest: true,
    }, null, "all", null, {fbid:userSettings.login.fbid, message: text, askid: id }).then(function(res) {
    	if(res.data.success) {
    		var alertPopup = $ionicPopup.alert({
			     title: 'You answered this question',
			     template: 'Maybe it will be accepted by the user'
			});

			
		   alertPopup.then(function(res) {
		     $location.path('/tab/answer');
		     $rootScope.$emit('refr');
		   });
    	}
    }).catch(function(response) {
    	
    });
  }

}]);
