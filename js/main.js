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
          .state('business', {
            url: '/business',
            templateUrl: './views/business.html',
            controller: 'BusinessCtrl as business'
          })
          .state('admin', {
            url: '/admin',
            templateUrl: './views/admin.html',
            controller: 'AdminCtrl as admin'
          });
        uiSelectConfig.theme = 'select2';
        uiSelectConfig.resetSearchInput = true;
        uiSelectConfig.appendToBody = true;
    }])
    .run(function(editableOptions) {
      editableOptions.theme = 'bs3';
    });
})();