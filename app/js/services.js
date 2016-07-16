(function() {
    'user strict';

    angular
        .module('sulekhaApp')
        .factory('Auth', Auth)

    Auth.$inject = ['$firebaseAuth'];

    function Auth($firebaseAuth) {
        return $firebaseAuth();
    };
}());
