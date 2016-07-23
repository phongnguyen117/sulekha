(function() {
    'user strict';

    angular
        .module('mizzcallApp')
        .controller('HomeCtrl', HomeCtrl)
        .controller('NavbarController', NavbarController)
        .controller('ModalInstanceCtrl', ModalInstanceCtrl)
        .controller('RegisterCtrl', RegisterCtrl)
        .controller('LoginCtrl', LoginCtrl)
        .controller('DashboardCtrl', DashboardCtrl)
        .controller('ResponseCtrl', ResponseCtrl);

    HomeCtrl.$inject = ['$state'];

    function HomeCtrl($state) {
        var vm = this;
    };

    NavbarController.$inject = ['$state', 'authService'];

    function NavbarController($state, authService) {
        var vm = this;
        vm.state = $state.current.name;
        // console.log($state.current.name);
    }

    ModalInstanceCtrl.$inject = ['$scope', '$state', '$uibModalInstance', 'account', '$http'];

    function ModalInstanceCtrl( $scope, $state, $uibModalInstance, account, $http) {
        var vm = this;
        vm.error = false;
        vm.account = account;
        vm.ok = function() {
            if(!vm.code) {
                vm.error = true;
                return;
            }
            vm.account.code = vm.code;
            checkCode(vm.account).then(function(data){
                if (data.data.isError) {
                    return vm.errorWrongCode = 'Wrong verification code';
                } else {
                    $uibModalInstance.close();
                }
            });
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        function checkCode(acc) {
            return $http.post('/api/checkcode', acc);
        }
    };

    RegisterCtrl.$inject = ['$state', '$firebaseArray', 'authService', '$scope',
        '$uibModal', '$http', 'firebaseDataService'];

    function RegisterCtrl($state, $firebaseArray, authService, $scope, $uibModal,
        $http, firebaseDataService) {
        var vm = this;
        vm.account = {};

        vm.registers = registers;
        vm.open = function() {
            createCode(vm.account).then(function(data) {
                if(data.data.isError && data.data.message === 'E-mail address already exists') {
                    return vm.error = data.data.message;
                }
                var modalInstance = $uibModal.open({
                    animation: vm.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: 'modal',
                    backdrop: false,
                    resolve: {
                        account: function() {
                            return vm.account;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    registers();
                }, function() {
                    console.log('Modal dismissed at: ' + new Date());
                });
            },function(err) {
                console.log(err);
            });
        };

        $scope.$watch('register.account.email', function(newVal, oldVal){
            vm.error= null
        });

        function createCode(account) {
            return $http.post('/api/createcode', account);
        }

        function registers() {
            var user = {
                email: vm.account.email,
                password: vm.account.pass1
            };
            return authService.register(user)
                .then(function(data) {
                    if(data.uid) {
                        firebaseDataService.business.child(data.uid).set({
                            email: vm.account.email,
                            businessName: vm.account.name,
                            phone: vm.account.phone
                        });

                    }
                    return $state.go('login');
                })
                .catch(function(error) {
                    console.log('cccc', error)
                    vm.error = error.message
                });
        }
    };

    LoginCtrl.$inject = ['$state', '$firebaseArray', 'authService'];

    function LoginCtrl($state, $firebaseArray, authService) {
        var vm = this;
        vm.account = {};

        vm.loginBusiness = loginBusiness;

        function loginBusiness() {
            var user = {
                email: vm.account.email,
                password: vm.account.password
            };
            return authService.login(user)
                .then(function(data) {
                    $state.go('dashboard')
                })
                .catch(function(error) {
                    vm.error = error.message;
                });
        }
    };

    DashboardCtrl.$inject = ['$state', '$firebaseObject', '$firebaseArray', 'firebaseDataService','authService', 'currentAuth'];

    function DashboardCtrl($state, $firebaseObject, $firebaseArray, firebaseDataService, authService, currentAuth) {
        var vm = this;
        var email = currentAuth.email;
        var dataService = firebaseDataService.business;
        var myUserId = currentAuth.uid;

        vm.business = $firebaseObject(dataService.child(myUserId));
        console.log(vm.business);

        vm.currentStep = 1;
        vm.widthProgress = '33%'
        vm.previous = previous;
        vm.next = next;
        vm.logout = logout;


        function logout() {
            authService.logout();
            $state.go('login');
        }

        function previous() {
            vm.currentStep = vm.currentStep - 1 ;
            setWidth();
        }

        function next() {
            vm.currentStep = vm.currentStep + 1;
            setWidth();
        }

        function setWidth() {
            switch(vm.currentStep) {
                case 1:
                    vm.widthProgress = '33%';
                    break;
                case 2:
                    vm.widthProgress = '66%';
                    break;
                case 3:
                    vm.widthProgress = '100%';
                    break;
            }
        }
    };

    ResponseCtrl.$inject = ['$state', '$firebaseArray'];
    function ResponseCtrl($state, $firebaseArray) {

    };
}());
