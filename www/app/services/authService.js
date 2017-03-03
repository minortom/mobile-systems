'use strict';
app.factory('authService', ['$http', '$q', 'store', 'ngAuthSettings', '$location', '$injector', '$timeout', '$rootScope', 'Notification', '$window', 'apiService', 'authInterceptorService', '$fancyModal',
    function($http, $q, store, ngAuthSettings, $location, $injector, $timeout, $rootScope, Notification, $window, apiService, authInterceptorService, $fancyModal) {

        /**
         * Service that contains all authorization operations
         */

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: "",
            useRefreshTokens: true,
            me: ""
        };

        var _externalAuthData = {
            provider: "",
            userName: "",
            externalAccessToken: ""
        };

        /**
         * Login function to request a bearer token
         */

        var _login = function(loginData) {
            var deferred = $q.defer();
            apiService["userLoginCheck"]("post", {
                ignoreDuplicateRequest: true,
                noDateSelection: true
            }, null, "all", null, loginData).then(function(res) {
                deferred.resolve(res);
            }).catch(function(response) {
                Notification.warning({
                    message: 'Als je echt niet kunt inloggen, vraag dan om hulp bij de servicedesk',
                    title: '<i class="icon-connection-error"></i> Login niet gelukt!',
                    delay: 2000
                });
                deferred.reject(response);
            });

            return deferred.promise;

        };

        /**
         * Logout function to destroy all tokens and authorization data
         */

        var _logOut = function() {
            var authData = store.get('authorizationData');
            var gameData = store.get('gameData');
            // console.log(authData);
            if (authData) {
                if (typeof authData.userData != 'undefined' && authData.userData) {
                    Notification.success({ // Show successful logout message
                        message: 'Zie je snel!',
                        title: '<i class="icon-check"></i> Doei, ' + authData.userData.firstName + '!',
                        replaceMessage: true
                    });

                    var processApiCallService = $injector.get('processApiCallService');

                    authInterceptorService.cancelAllPendingRequests(); // Cancel all pending HTTP requests
                    processApiCallService.cancelAllIntervals(); // Cancel all refresh intervals for fetching API calls
                     $location.path('/scan').search({game: gameData.gameId});
                }
            }
            store.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.me = "";
            _authentication.useRefreshTokens = false;

        };

        /**
         * Function to populate data out of localstorage on start
         */

        var _fillAuthData = function() {

            var authData = store.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.me = authData.me;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
            }

        };

        var _checkToken = function() {
            var deferred = $q.defer();
            var authData = store.get('authorizationData');
            console.log(authData);
            apiService["userLoginCheckToken"]("get", {
                ignoreDuplicateRequest: true,
                noDateSelection: true,
                skipAuthorization: true
            }, null, "all", null, null).then(function(res) {
                console.log(res);
                deferred.resolve(res); // Return promise for url to resolve
            }).catch(function(response) {
                Notification.warning({
                    message: 'Helaas ben je te lang bezig en nu uitgelogd.',
                    title: '<i class="icon-connection-error"></i> Je bent niet (meer) ingelogd!',
                    delay: 2000
                });
                deferred.reject(response);
            });
            return deferred.promise;
        };


        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.checkToken = _checkToken;
      

        return authServiceFactory;
    }
]);