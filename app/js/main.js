(function(){
  'use strict';

  angular
    .module('sulekhaApp', [
      'ui.router',
      'ui.select',
      'ngSanitize',
      'ui.bootstrap',
      'firebase',
      'xeditable'
    ])
    .config(['$stateProvider', '$urlRouterProvider', 'uiSelectConfig',
      function($stateProvider, $urlRouterProvider, uiSelectConfig) {
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