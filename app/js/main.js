(function(){
  'use strict';

  angular
    .module('mizzcallApp', [
      'ui.router',
      'ui.bootstrap',
      'firebase',
      'xeditable',
      'slick'
    ])
    .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('index', {
            url: '/',
            templateUrl: './views/home.html',
            controller: 'HomeCtrl as home'
          })
          .state('register', {
            url: '/register',
            templateUrl: './views/register.html',
            controller: 'RegisterCtrl as register'
          })
          .state('login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'LoginCtrl as login'
          })
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: './views/dashboard.html',
            controller: 'DashboardCtrl as dashboard',
            resolve: {
              currentAuth: ["authService", function(authService) {
                return authService.firebaseAuthObject.$requireSignIn();
              }]
            }
          })
          .state('response', {
            url: '/response',
            templateUrl: './views/response.html',
            controller: 'ResponseCtrl as response'
          });
    }])
    .run(["$rootScope", "$state", function($rootScope, $state) {
      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
          $state.go("index");
        }
      });
    }]);

})();