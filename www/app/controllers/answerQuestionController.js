app.controller('answerQuestionController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup', '$ionicHistory', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup, $ionicHistory) {
  $scope.usersettings = store.get('userSettings');

  $scope.totalLevel = store.get('totalLevel');
  $scope.askAnswer = store.get('askAnswer');
  $scope.currentId = store.get('currentQuestion');

  console.log($scope.askAnswer);
  console.log($rootScope.currentId);

  $scope.askAnswer.ask.forEach(function (item) {
    if (item.id == $rootScope.currentId) {
      $scope.currentQuestion = item;
    }
  });

  $scope.answerQuestion = function() {
    alert('hey');
  }

}]);
