'use strict';
app.factory('apiService', ['$http', 'ngAuthSettings', '$resource', '$q', '$injector', 'apiHandlerService',
    function($http, ngAuthSettings, $resource, $q, $injector, apiHandlerService) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var apiServiceFactory = {};

        // Search for tags in db
        var _tagSearch = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("tag", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.tagSearch = _tagSearch;



        return apiServiceFactory;

    }
]);