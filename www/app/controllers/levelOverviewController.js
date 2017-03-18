app.controller('levelOverviewController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth) {
  $scope.selectedInterests = store.get('selectedInterests');
  $scope.totalLevel = store.get('totalLevel');
  $scope.usersettings = store.get('userSettings');
}]);
