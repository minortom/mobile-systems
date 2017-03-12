app.controller('askController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', '$ionicPopup',function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, $ionicPopup) {
	$scope.usersettings = store.get('userSettings');
	$scope.askQuestion = function() {
		$location.path('ask-question');
	}
}]);