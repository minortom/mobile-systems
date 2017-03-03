app.factory('processApiCallService', ['$q', '$injector', '$location', '$timeout','$rootScope', '$interval','apiService',
    function($q, $injector, $location, $timeout, $rootScope, $interval, apiService) {


        var processApiCall = {};
        var intervals = [];
        var intervalState = true;

        $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
            if (newUrl != oldUrl) {
                _cancelAllIntervals();
            }
        })

        // Create a refresh service
        var _refreshApiRequests = function(pageData, loadAllDataFunction, time) {
            intervals.push($interval(function() {
                if (intervalState) {
                    angular.forEach(intervals, function(interval) {
                        $interval.cancel(interval);
                    });
                    intervals.length = 0; //clear the array
                    loadAllDataFunction(pageData);
                }
            }, _checkTime(time)));
        }

        var _pauseInterval = function(state) {
            intervalState = state;
        }

        // Cancel all intervals to fetch data
        var _cancelAllIntervals = function() {
            angular.forEach(intervals, function(interval) {
                $interval.cancel(interval);
            });
            intervals.length = 0; //clear the array
        }

        var _checkTime = function(time) {
            if (time) {
                return time;
            } else {
                return 600000;
            }
        }

        var suppressError = function(x) {
            return x.catch(function() {
                console.log("Silent API fail");
            });
        }

        // Fetch all api requests from array and process them
        var _loadApiRequests = function(apiRouteName, pageData, callback, route, options) {
            var arrayCalls = []; // Create an array to store all the separate API calls
            var arrayNames = []; // Create an array to store all the separate API calls names
            for (var keys = Object.keys(pageData.apiCalls), a = 0, end = keys.length; a < end; a++) {
                var key = keys[a],
                    value = pageData.apiCalls[key];
                var apiCall = pageData.apiCalls[key];
                if (apiCall) {
                    arrayCalls.push(apiCall);
                    arrayNames.push(key); // Store the array names for storing the data locally
                }
            }
            $q.all(arrayCalls.map(suppressError)).then(function(data) { // Make data call through array with separate API calls

                for (var i = 0; i < data.length; i++) { // Loop through all data received by separate API calls
                    var name = arrayNames[i];
                    if (typeof data[i] == "undefined") {
                        console.log("Something failed in single API call: " + name);
                    } else {
                        pageData.apiData[name] = data[i].data;
                        callback(name, pageData, apiRouteName);
                    }
                }

            });
        }

         var _loadApiCalls = function(pageData, route) {

            var calls = pageData.arrayCalls;

            pageData.apiData = {};

            for (var key in calls) {
                pageData.apiCalls = {};
                var call = calls[key];
                var callback = call.callback;
                var apiServiceName = key;
                var apiCallName = key;

                // If there's a name included, use this name
                if (call.name) {
                    apiCallName = key;
                    apiServiceName = call.name;
                }

               
                // This is for a call to receive all data without selections (line data)
                pageData.apiCalls[apiCallName] = apiService[apiServiceName](call.request, call.options, call.params, "all", call.id, call.data); // Get all items
                
                // If there's no callback provided. Just make an empty callback.
                if (!callback) {
                    callback = function() {}
                }

                // Send all apicalls to the loadApiRequests filters
                _loadApiRequests(apiCallName, pageData, callback, route, call.options); // Make the calls
            }
            console.log(pageData.apiCalls);

        }
       

        processApiCall.loadApiRequests = _loadApiRequests;
        processApiCall.refreshApiRequests = _refreshApiRequests;
        processApiCall.pauseInterval = _pauseInterval;
        processApiCall.cancelAllIntervals = _cancelAllIntervals;

        processApiCall.loadApiCalls = _loadApiCalls;

        return processApiCall;
    }
]);