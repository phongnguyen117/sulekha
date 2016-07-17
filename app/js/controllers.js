(function() {
    'user strict';

    angular
        .module('mizzcallApp')
        .controller('HomeCtrl', HomeCtrl)
        .controller('ModalInstanceCtrl', ModalInstanceCtrl)
        .controller('RegisterCtrl', RegisterCtrl)
        .controller('LoginCtrl', LoginCtrl)
        .controller('DashboardCtrl', DashboardCtrl);

    HomeCtrl.$inject = ['$state'];

    function HomeCtrl($state) {
        var vm = this;
    };

    ModalInstanceCtrl.$inject = ['$scope', '$state', '$uibModalInstance', 'phone'];

    function ModalInstanceCtrl( $scope, $state, $uibModalInstance, phone) {
        var vm = this;
        vm.error = false;
        vm.phone = phone;
        vm.ok = function() {
            if(!vm.code) {
                vm.error = true;
                return;
            }
            $uibModalInstance.close(vm.code);
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    };

    RegisterCtrl.$inject = ['$state', '$firebaseArray', 'authService', '$scope', '$uibModal'];

    function RegisterCtrl($state, $firebaseArray, authService, $scope, $uibModal) {
        vm = this;
        vm.account = {};

        vm.registers = registers;
        vm.open = function() {

            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'modal',
                backdrop: false,
                resolve: {
                    phone: function() {
                        return vm.account.phone;
                    }
                }
            });

            modalInstance.result.then(function(code) {
                vm.selected = code;
                console.log(code)
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        function registers() {
            var user = {
                email: vm.account.email,
                password: vm.account.pass1
            };
            return authService.register(user)
                .then(function(data) {
                    return $state.go('login')
                })
                .then(function() {
                    console.log('bbb')
                })
                .catch(function(error) {
                    console.log('cccc', error)
                    vm.error = error.message
                });
        }
    };

    LoginCtrl.$inject = ['$state', '$firebaseArray', 'authService'];

    function LoginCtrl($state, $firebaseArray, authService) {
        vm = this;
        vm.account = {};

        vm.loginBusiness = loginBusiness;

        function loginBusiness() {
            var user = {
                email: vm.account.email,
                password: vm.account.password
            };
            return authService.login(user)
                .then(function(data) {
                    console.log(data);
                    $state.go('admin')
                })
                .catch(function(error) {
                    vm.error = error.message;
                });
        }
    };

    DashboardCtrl.$inject = ['$state', '$firebaseArray'];

    function DashboardCtrl($state, $firebaseArray) {

    };
}());
