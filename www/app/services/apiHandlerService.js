'use strict';
app.factory('apiHandlerService', ['$http', 'ngAuthSettings', '$resource', '$q', '$injector',
    function($http, ngAuthSettings, $resource, $q, $injector) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var apiHandler = {};

        var _get = function(url, options, data) {
            var d = $q.defer();

            $http.get(serviceBase + url, options).
            then(function(data) {
                d.resolve(data);
            }).
            catch(function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        var _post = function(url, options, data) {

            var d = $q.defer();

            $http.post(serviceBase + url, data, options).
            then(function(data) {
                d.resolve(data);
            }).
            catch(function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        var _put = function(url, options, data) {

            var d = $q.defer();

            $http.put(serviceBase + url, data, options).
            then(function(data) {
                d.resolve(data);
            }).
            catch(function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        var _delete = function(url, options, data) {

            var d = $q.defer();
            console.log(options);
            console.log(data);
            $http.delete(serviceBase + url, data).
            then(function(data) {
                d.resolve(data);
            }).
            catch(function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        var _patch = function(url, options, data) {

            var d = $q.defer();

            $http.patch(serviceBase + url, data, options).
            then(function(data) {
                d.resolve(data);
            }).
            catch(function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        var _getUrl = function(name, params, sort, id, options) {
            var url = "";
            url = name;
            if (id) {
                url = url + "/" + id + "?";
            } else {
                url = url + "?";
            }
            
            for (var param in params) {
                if (typeof params[param] != "undefined" && (params[param] !== null)) {
                    if (params[param] instanceof Array) {
                        var data = params[param];
                        for (var i = 0; i < data.length; i++) {
                            for (var arrayParams in data[i]) {
                                url = url + "&" + arrayParams + "=" + data[i][arrayParams];
                            }
                        }
                    } else {
                        url = url + "&" + param + "=" + params[param];
                    }
                }
            }
            
            return url;
        }

        var _getOptions = function(options) {
            var data = {};
            if (options.ignoreDuplicateRequest) {
                data.ignoreDuplicateRequest = options.ignoreDuplicateRequest;
            }
            if (options.cache) {
                data.cache = options.cache;
            }
            if (options.neverCancelRequest) {
                data.neverCancelRequest = options.neverCancelRequest;
            }

            return data;
        }

       
        apiHandler.get = _get;
        apiHandler.post = _post;
        apiHandler.put = _put;
        apiHandler.delete = _delete;
        apiHandler.patch = _patch;

        apiHandler.getUrl = _getUrl;
        apiHandler.getOptions = _getOptions;


        return apiHandler;

    }
]);