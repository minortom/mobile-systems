app.controller('addInterestsController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', 'lodash', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, lodash) {
	$scope.interests = [
		{id: 1, category : "Arts & Entertainment"},
		{id: 2, category : "Music"},
		{id: 3, category :"Autos & Vehicles"},
		{id: 4, category :"Beauty & Fitness"},
		{id: 5, category :"Books & Literature"},
		{id: 6, category :"Business & Industrial"},
		{id: 7, category :"Computers & Electronics"},
		{id: 8, category :"Finance"},
		{id: 9, category :"Food & Drink"},
		{id: 10, category :"Games"},
		{id: 11, category :"Hobbies & Leisure"},
		{id: 12, category :"Home & Garden"},
		{id: 13, category :"Internet & Telecom"},
		{id: 14, category :"Jobs & Education"},
		{id: 15, category :"Law & Government"},
		{id: 16, category :"News"},
		{id: 17, category :"Online Communities"},
		{id: 18, category :"People & Society"},
		{id: 19, category :"Pets & Animals"},
		{id: 20, category :"Real Estate"},
		{id: 21, category :"Reference"},
		{id: 22, category :"Science"},
		{id: 23, category :"Shopping"},
		{id: 24, category :"Sports"},
		{id: 25, category :"Travel"},
		{id: 26, category :"World Localities"}
	]
	$scope.addedItems = [];
	$scope.findInterest = function(query) {
		if (query) {
			var res = _.filter($scope.interests, function(i) {
		        var match = i.category.match(query);
		        return match;
		    });
		    var items = [];
		    for (var i = 0, len = res.length; i < len; i++) {
		    	items.push({id : res[i].id, name : res[i].category, view : res[i].category});
		    }
            return {
                items: items
            };
        }
        return {items: []};
	}
	$scope.setInterest = function(query) {
		console.log($scope)
		console.log(query);
	}
	$scope.removeInterest = function(query) {
		console.log(query)
	}
	$scope.cancelButtonClickedMethod = function (callback) {
		console.log(callback);
		var copy = JSON.parse(JSON.stringify(callback.selectedItems));
	   $scope.selects = [];
	   console.log(copy);
	   for(var i = 0; i < copy.length; i++){
	   	var delete_id = _.result(_.find($scope.addedItems, function(obj) {
		    return obj.id === copy[i].id;
		}), 'id');
		if(!delete_id) {
	   		$scope.addedItems.push(copy[i]);
	   	}
	   }
	}

	//store.set('interests', interests);
}]);