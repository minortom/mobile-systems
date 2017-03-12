app.controller('overviewController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth) {
	$scope.hoi = function(){
		alert("jemoeder");
	}
	
}]);