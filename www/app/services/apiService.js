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

        // Submit user
        var _postUser = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("user/new", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.postUser = _postUser;

        // Submit user tags
        var _postUserTags = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("user/tags", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.postUserTags = _postUserTags;

        // Get user tags
        var _getUserTags = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("user/tags/get", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.getUserTags = _getUserTags;

        // Post question
        var _postAsk = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("ask/new", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.postAsk = _postAsk;

        // Submit question tags
        var _postAskTags = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("ask/tags", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.postAskTags = _postAskTags;

        // Submit question tags
        var _getUserAsk = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("user/ask", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.getUserAsk = _getUserAsk;

        // Submit question tags
        var _getUserAnswer = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("user/answer", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.getUserAnswer = _getUserAnswer;

         // Submit question tags
        var _postUserAnswer = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("user/answer/new", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.postUserAnswer = _postUserAnswer;

         // Submit question tags
        var _postUserAnswerAccept = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("user/answer/accept", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.postUserAnswerAccept = _postUserAnswerAccept;
        

        // Submit question tags
        var _postAskMatch = function(request, options, params, sort, id, data) {
            return apiHandlerService[request](apiHandlerService.getUrl("ask/match", params, request, id, options), apiHandlerService.getOptions(options), data);
        }

        apiServiceFactory.postAskMatch = _postAskMatch;

        

        return apiServiceFactory;

    }
]);