app.controller('answerController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup',function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup) {
  $scope.usersettings = store.get('userSettings');
  $scope.askAnswer = store.get('askAnswer');
  $scope.totalLevel = store.get('totalLevel');
  $scope.answerQuestion = function(id) {
    console.log(id);
    store.set('currentQuestion', id);
    $rootScope.currentId = id;
    $location.path('answer-question');
  }
}]);
