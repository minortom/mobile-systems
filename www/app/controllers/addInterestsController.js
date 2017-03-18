app.controller('addInterestsController', ['$scope','processApiCallService', 'apiService','$state','store', '$rootScope', 'authService', '$location', '$fancyModal','$sce', '$timeout','$cordovaOauth', 'lodash', '$location', function ($scope, processApiCallService, apiService, $state, store, $rootScope, authService, $location, $fancyModal, $sce, $timeout, $cordovaOauth, lodash, $location) {
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
		var items = [];
		if (query) {
			var request = apiService["tagSearch"]("get", {
                    ignoreDuplicateRequest: true,
                }, null, "all", query, null).then(function(res) {
                	if(res.data.success) {
                	var res = res.data.data;
                	res.forEach(function(item) {
                		items.push({id : parseInt(item.id), name : item.tag, view : item.tag});
                	});
                	var returnValue = { items: items };
                	console.log(returnValue);
                	return returnValue;
		        }
                }).catch(function(response) {
                       return {items: []};
                });
		
        }
        console.log(request);
        return request;
	};
	$scope.finishSelection = function(query) {

    $scope.addedItems[0].level = 2;
    $scope.addedItems[1].level = 0;
    $scope.addedItems[2].level = 4;
    $scope.addedItems[3].level = 1;
    $scope.totalLevel = 0;
    $scope.addedItems.forEach(function(item) {
      $scope.totalLevel += item.level;
    });

    store.set('selectedInterests', $scope.addedItems);
    store.set('totalLevel', $scope.totalLevel);

		store.set('askAnswer', {
			ask : [{
				id: 1,
				tags: [{word:"Real estate", kind:"nouns"}, {word:"shopping", kind: "verbs"}],
				question: "Where do I find the best real estate with shopping areas?",
				accepted: false,
				spam: false,
				timestamp: 1489398023,
				answers:[]
			},
			{
				id: 2,
				tags: [{word:"People", kind: "verbs"}, {word:"Sports", kind: "nouns"}, {word:"Amsterdam", kind:"places"}],
				question: "Where do you people all go for the best sports games in Amsterdam?",
				accepted: true,
				spam: false,
				timestamp: 1489398042,
				answers: [{
					answer: "Maybe go to Amsterdam Arena",
					accepted: true,
					timestamp: 1489398050,
					spam: false
				},{
					answer: "You could go to Rotterdam",
					accepted: false,
					timestamp: 1489398050,
					spam: false
				}]
			},
			{
				id: 3,
				tags: [{word:"Food", kind: "nouns"}, {word:"drinks", kind: "nouns"}, {word: "Amsterdam", kind:"places"}],
				question: "Where can you get the best food and drinks in Amsterdam?",
				accepted: false,
				spam: false,
				timestamp: 1489397042,
				answers:[]
			}],
			answers: [{
				askId: 4,
				tags: [{word:"Real estate", kind:"nouns"}, {word: "shopping", kind: "verbs"}, {word:"Amsterdam", kind: "places"}, {word:"Bijlmer", kind: "Places"}],
				question: "You can find the best shopping places and real estate in Amsterdam Bijlmer",
				accepted: false,
				spam: false,
				timestamp: 1489398023,
			}]

		});
		$location.path('/tab/overview');
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


}]);
