(function() {
    'user strict';

    angular
        .module('sulekhaApp')
        .controller('HomeCtrl', HomeCtrl)
        .controller('RegisterCtrl', RegisterCtrl)
        .controller('LoginCtrl', LoginCtrl)
        .controller('AdminCtrl', AdminCtrl);
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

    AdminCtrl.$inject = ['$state', '$firebaseArray'];

    function AdminCtrl($state, $firebaseArray) {
        var ref = firebase.database().ref().child('business');
        vm = this;
        vm.listBusiness = $firebaseArray(ref);

        vm.addBusiness = function() {
            vm.inserted = {
                email: '',
                company_name: '',
                phone: ''
            };
            vm.listBusiness.$add(vm.inserted)
        };

        vm.removeBusiness = function(index, id) {
            if (id) {
                var item = vm.listBusiness.$getRecord(id);
                vm.listBusiness.$remove(item);
            }
        };

        vm.saveBusiness = function(data, id) {
            if (id) {
                var item = vm.listBusiness.$getRecord(id);
                item.email = data.email;
                item.company_name = data.company_name;
                item.phone = data.phone;
                vm.listBusiness.$save(item);
            }
        };

    };
}());
