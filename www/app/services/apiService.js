'use strict';
app.factory('apiService', ['$http', 'ngAuthSettings', '$resource', '$q', '$injector', 'apiHandlerService',
    function($http, ngAuthSettings, $resource, $q, $injector, apiHandlerService) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var apiServiceFactory = {};

        // Check the user
        // var _userLoginCheck = function(request, options, params, sort, id, data) {
        //     return apiHandlerService[request](apiHandlerService.getUrl("user/login/check", params, request, id, options), apiHandlerService.getOptions(options), data);
        // }

        // apiServiceFactory.userLoginCheck = _userLoginCheck;



        return apiServiceFactory;

    }
]);