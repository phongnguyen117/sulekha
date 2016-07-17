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
            controller: 'DashboardCtrl as dashboard'
          });
    }])

})();