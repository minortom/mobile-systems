app.controller('tabsController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth) {
  	$scope.answerBadge = 0;
  	$scope.askBadge = 0;

  	store.set("badgeAlerts", { askBadge: 0, answerBadge: 0});
  	$scope.$watch(function () { return store.get("badgeAlerts")},function(newVal,oldVal){
   	if(oldVal!==newVal){
       $scope.answerBadge = newVal.answerBadge;
        $scope.askBadge = newVal.askBadge;
	  }
	})
  	$scope.$watch(function () { return $state.current.name},function(newVal,oldVal){
	   	if(oldVal!==newVal){
	   		var badgeAlerts = store.get("badgeAlerts");
	   		if(newVal === "tab.ask") {
	   			badgeAlerts.askBadge = 0;
	   		}
	   		if(newVal === "tab.answer") {
	   			badgeAlerts.answerBadge = 0;
	   		}
		}
	})
  
}]);
