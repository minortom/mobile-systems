app.controller('answerController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup',function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup) {
  $scope.usersettings = store.get('userSettings');
  $scope.askAnswer = store.get('askAnswer');
  $scope.answerQuestion = function(id) {
    alert(id);
    $location.path('answer-question');
  }
}]);
