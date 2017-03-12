// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', 
  [
    'ionic',
    'ui-notification',
    'ui.router',
    'ngRoute',
    'ngResource',
    'angular-storage',
    'vesparny.fancyModal',
    "ngSanitize",
    'ngCookies',
    'ngCordova',
    'ngCordovaOauth',
    'ion-autocomplete',
    'ngLodash',
    'highcharts-ng'
]);


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    // resolve: {
    //     resolveUrl: function($q, authService, $state, Notification, $location, $timeout, store) { // Resolve function to check if user is logged in (only for paths with dashboard.)
    //         var deferred = $q.defer();
    //         var gameData = store.get('gameData');
    //         authService.checkToken().then(function(data) { // If response is successful set authData with new me object
    //             deferred.resolve(data);
    //         }).catch(function(rejection) {
    //             $timeout(function() {
    //                 $location.path('/scan').search({game: gameData.gameId});
    //             });
    //             store.remove('gameData');
    //             deferred.reject(rejection);
    //         });
    //         return deferred.promise;
    //     }
    // }
  })
  // setup an abstract state for the tabs directive
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginController'
  })
  // setup an abstract state for the tabs directive
  .state('addinterests', {
    url: '/add-interests',
    templateUrl: 'templates/addinterests.html',
    controller: 'addInterestsController'
  })
  // setup an abstract state for the tabs directive
  .state('askquestion', {
    url: '/ask-question',
    templateUrl: 'templates/askquestion.html',
    controller: 'askQuestionController'
  })
  // Each tab has its own nav history stack:

  .state('tab.overview', {
    url: '/overview',
    views: {
      'tab-overview': {
        templateUrl: 'templates/tab-overview.html',
        controller: 'overviewController'
      }
    }
  })

  .state('tab.ask', {
      url: '/ask',
      views: {
        'tab-ask': {
          templateUrl: 'templates/tab-ask.html',
          controller: 'askController'
        }
      }
    })
    .state('tab.answer', {
      url: '/answer',
      views: {
        'tab-answer': {
          templateUrl: 'templates/tab-answer.html',
          controller: 'answerController'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'settingsController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

/**
 * Add interceptors to the $http provider (http timeout interceptor and authentification interceptor)
 */

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

/**
 * Populate (or re-populate) auth data on start application
 */

app.run(['authService',
    function(authService) {
        authService.fillAuthData();
    }
]);

var testingState = false; // Boolean to choose testing state or not
if (testingState) {
    var serviceBase = 'http://localhost/game/api/';
    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
    });
} else {
    var serviceBase = 'https://www.creativeforce.nl/game/api/';
    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
    });
}
