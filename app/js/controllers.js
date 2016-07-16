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

    RegisterCtrl.$inject = ['$state', '$firebaseArray', 'Auth'];

    function RegisterCtrl($state, $firebaseArray, Auth) {

        // var list = $firebaseArray(ref);
        vm = this;
        vm.account = {};

        vm.registers = function() {
            Auth.$createUserWithEmailAndPassword(vm.account.email, vm.account.pass1)
                .then(function(error, userData) {
                    console.log(error, 'sdfsdfsdf')
                    console.log("User created with uid: " + userData.uid);
                }).catch(function(error) {
                    console.log('asdfsd');
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(error)
                });

            return false;
        }
    };

    LoginCtrl.$inject = ['$state', '$firebaseArray'];

    function LoginCtrl($state, $firebaseArray) {
        var ref = firebase.database().ref().child('business');
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
