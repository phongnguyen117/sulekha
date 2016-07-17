(function() {
    'use strict';

    angular
        .module('mizzcallApp')
        .directive('addModal', addModal);

    function addModal() {
        return {
            restrict: 'E',
            templateUrl: 'myModalContent.html',
            controller: function($scope) {
                $scope.selected = {
                    item: $scope.items[0]
                };
            }

        };
    }

})();
