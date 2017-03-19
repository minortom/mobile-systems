'use strict';
app.factory('authInterceptorService', ['$q', '$injector', '$location', 'store', '$timeout', '$rootScope', '$window', 'ngAuthSettings',
    function($q, $injector, $location, store, $timeout, $rootScope, $window, ngAuthSettings) {
        /**
         * Service to intercept all API calls
         */

        var authInterceptorServiceFactory = {};
        var pendingRequests = {};
        var allPendingRequests = [];

        /**
         * Hash generator
         */

        function hash(str) {
            var h = 0;
            var strlen = str.length;
            if (strlen === 0) {
                return h;
            }
            for (var i = 0, n; i < strlen; ++i) {
                n = str.charCodeAt(i);
                h = ((h << 5) - h) + n;
                h = h & h;
            }
            return h >>> 0;
        }

        /**
         * Helper to generate a unique identifier for a request
         */

        function getRequestIdentifier(config) {
            var str = config.method + config.url;
            if (config.data && typeof config.data === 'object') {
                str += angular.toJson(config.data);
            }
            return hash(str);
        }

        /**
         * Capture all requests and put it in the pending request list
         */

        var _request = function(config) {
            config.headers = config.headers || {};

            var authData = store.get('authorizationData');
            if (authData && !config.skipAuthorization) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }
            // All captured requests
            if (config.timeout === undefined && !config.neverCancelRequest) {
                var cancelPromise = $q.defer();
                allPendingRequests.push(cancelPromise);
                config.timeout = cancelPromise.promise;
            }

            if (config.url.indexOf(ngAuthSettings.apiServiceBaseUri) >= 0) {

                var identifier = getRequestIdentifier(config);
                //Check if such a request is pending already
                if (pendingRequests[identifier] && !config.ignoreDuplicateRequest) {
                    return $q.reject({
                        data: '',
                        headers: {},
                        status: config.rejectDuplicateStatusCode || 429,
                        config: config
                    });
                    return pendingRequests[identifier];
                }
                //Create promise using $http and make sure it's reset when resolved
                pendingRequests[identifier] = config;
                pendingRequests[identifier].id = identifier;

                return pendingRequests[identifier];
            }
            return config;

        }

        /**
         * Check if a response is finished and delete it from the pending list
         */

        var _response = function(config) {
    
            var $state = $injector.get('$state');
        
            if (config.config.id) {
                delete pendingRequests[config.config.id];
            }
            return config;
        }

        /**
         * Check if there are errors in the request
         */

        var errorResponse = false; // Create a boolean when there is an error (to prevent multiple error messages and checks)
        var _responseError = function(rejection) {
            // Embed all services needed
            var Notification = $injector.get('Notification');
            var authService = $injector.get('authService');
            var apiService = $injector.get('apiService');
            var $state = $injector.get('$state');
            var processApiCallService = $injector.get('processApiCallService');
            var authData = store.get('authorizationData');
            var gameData = store.get('gameData');
            var deferred = $q.defer();
            if (rejection.status === 401) { // Unauthorized access. 
                errorResponse = false;
                $location.path('/login');
            }
            if (!errorResponse) {

                errorResponse = true; // If there's an error. We don't want to show multiple errors that will follow.
                
                if (rejection.status === 500) {
                    Notification.error({
                        message: 'Er is iets fout gegaan met het ophalen van data. Wellicht reageert de server niet correct..',
                        title: '<i class="icon-connection-error"></i> Ophalen van data mislukt!',
                        delay: 3000,
                        replaceMessage: true
                    });
                    errorResponse = false;
                }

                if (rejection.status === 422) {
                    Notification.error({
                        message: 'De selectie is ongeldig. ' + rejection.data.detail + '',
                        title: '<i class="icon-connection-error"></i> Ongeldige selectie!',
                        delay: 3000,
                        replaceMessage: true
                    });
                    errorResponse = false;
                }
                if (rejection.status === 409) {
                    Notification.error({
                        message: 'De actie is ongeldig ' + rejection.data.detail + '',
                        title: '<i class="icon-connection-error"></i> Ongeldige actie!',
                        delay: 3000,
                        replaceMessage: true
                    });
                    errorResponse = false;
                }
                if (rejection.status === 400) {
                    // If rejection code is 400 the login credentials are probably wrong.
                    Notification.error({
                        message: 'Inloggegevens onjuist.',
                        title: '<i class="icon-connection-error"></i> Geen toegang!',
                        delay: 2000,
                        replaceMessage: true
                    });

                    $timeout(function() {
                        $location.path('/login');
                    }, 1000);

                    errorResponse = false;
                    return $q.reject(rejection);
                }
   


            }


            return $q.reject(rejection);
        }

        var _cancelAllPendingRequests = function() {
            console.log("cancel");
            angular.forEach(allPendingRequests, function(cancelPromise) {
                cancelPromise.promise.isGloballyCancelled = true;
                cancelPromise.resolve();
            });
            allPendingRequests.length = 0;

        }

        authInterceptorServiceFactory.response = _response;
        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;
        authInterceptorServiceFactory.cancelAllPendingRequests = _cancelAllPendingRequests;

        return authInterceptorServiceFactory;
    }
]);