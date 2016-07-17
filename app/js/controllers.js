(function() {
    'user strict';

    angular
        .module('mizzcallApp')
        .controller('HomeCtrl', HomeCtrl)
        .controller('RegisterCtrl', RegisterCtrl)
        .controller('LoginCtrl', LoginCtrl)
        .controller('DashboardCtrl', DashboardCtrl);
    HomeCtrl.$inject = ['$state'];

    function HomeCtrl($state) {
        var vm = this;
    };

    RegisterCtrl.$inject = ['$state', '$firebaseArray', 'authService'];

    function RegisterCtrl($state, $firebaseArray, authService) {
        vm = this;
        vm.account = {};

        vm.registers = registers;
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
