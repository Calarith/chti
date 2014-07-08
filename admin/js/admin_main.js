var myAdminApp = angular.module('myAdminApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                    .when('/admin/accueil', {templateUrl: 'admin_accueil.html', controller: "AdminMainCtrl"})
                    .when('/', {templateUrl: 'admin_accueil.html', controller: "AdminMainCtrl", name: "accueil_admin"})

                    .otherwise({redirectTo: '/'});

            // configure html5 to get links working on jsfiddle
            //$locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix('!');

        });

myAdminApp.value('BASE_CONSTS', {
    SITE_NAME: "Ch'ti Transport",
    SITE_AUTHOR: 'Pierre Péchaud-Rivière',
    SITE_URL: ''
});

myAdminApp.controller('AdminHeaderCtrl', ['$scope', 'BASE_CONSTS', function($scope, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.navsites = [{
                name: "Accueil",
                url: "#accueil",
                icon: "home"
            }, {
                name: "Contact",
                url: "#contact",
                icon: "envelope"
            }, {
                name: "Devis",
                url: "#devis",
                icon: "road"
            }, {
                name: "Temoignages",
                url: "#temoignages",
                icon: "star-empty"
            }];
    }]);

myAdminApp.controller('AdminMainCtrl', ['$scope', '$route', '$routeParams', '$location', 'BASE_CONSTS', function($scope, $route, $routeParams, $location, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.name = "AdminMainCtrl";
        $scope.params = $routeParams;

    }]);

myAdminApp.controller('AdminClientsCtrl', ['$scope', '$http', '$modal', 'BASE_CONSTS', function($scope, $http, $modal, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "AdminClientsCtrl";
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
        $scope.clients = [];

        $scope.getClients = function(){
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {action: "getAllClients"},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function(json) {
                        if (json.status === "ok") {
                            $scope.clients = angular.copy(json.data);
                        }
                    })
                    .error(function(json) {
                        console.log(json);
                    });
        }

        $scope.addNewClient = function() {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_client.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function () {
                        return null;
                    },
                    action : function () {
                        return "addNewClient";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.action = null;
                $scope.getClients();
            });
        }

        $scope.dellClient = function(_client) {
            var modalInstance = $modal.open({
//                templateUrl: 'admin_modal_client.html',
                template: '<div class="modal-header"><h2>Confirmation</h2></div><div class="modal-body">Etes vous sur de vouloir supprimer ' + _client.nom + '(' + _client.id + ') ?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="oui()">OUI</button><button class="btn btn-warning"  ng-click="non()">NON</button></div>',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function () {
                        return null;
                    },
                    action : function () {
                        return "dellClient";
                    }
                }
            });
            modalInstance.result.then(function(_status) {
                debugger;
                if (_status === "oui") {
                    $http({
                        url: '../PHP/php-controller.php',
                        method: "POST",
                        data: {data : {id: _client.id}, action: "dellClient"},
                        headers: {'Content-Type': 'application/json'}
                    })
                            .success(function(data) {
                                $scope.getClients();
                            })
                            .error(function(data) {
                                console.log(data);
                            });
                }
            });
        }

        $scope.updateClient = function(_client) {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_client.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function () {
                        return _client;
                    },
                     action : function () {
                        return "updateClient";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.getClients();
            });
        }

        $scope.getClients();

    }]);

myAdminApp.controller('AdminCircuitsCtrl', ['$scope', '$http', 'BASE_CONSTS', function($scope, $http, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "AdminMainCtrl";
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
        $scope.circuits = [];

        $scope.getCircuits = function(){
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {action: "getAllCircuits"},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function(json) {
                        if (json.status === "ok") {
                            $scope.circuits = angular.copy(json.data);
                        }
                    })
                    .error(function(json) {
                        console.log(json);
                    });
        }

        $scope.addNewCircuit = function() {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_circuit.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function () {
                        return null;
                    },
                    action : function () {
                        return "addNewCircuit";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.action = null;
                $scope.getCircuits();
            });
        }

        $scope.dellClient = function(_circuit) {
            var modalInstance = $modal.open({
//                templateUrl: 'admin_modal_client.html',
                template: '<div class="modal-header"><h2>Confirmation</h2></div><div class="modal-body">Etes vous sur de vouloir supprimer ' + _circuit.libelle + '(' + _circuit.id + ') ?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="oui()">OUI</button><button class="btn btn-warning"  ng-click="non()">NON</button></div>',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function () {
                        return null;
                    },
                    action : function () {
                        return "dellCircuit";
                    }
                }
            });
            modalInstance.result.then(function(_status) {
                debugger;
                if (_status === "oui") {
                    $http({
                        url: '../PHP/php-controller.php',
                        method: "POST",
                        data: {data : {id: _circuit.id}, action: "dellCircuit"},
                        headers: {'Content-Type': 'application/json'}
                    })
                            .success(function(data) {
                                $scope.getCircuits();
                            })
                            .error(function(data) {
                                console.log(data);
                            });
                }
            });
        }

        $scope.updateClient = function(_circuit) {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_circuit.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function () {
                        return _circuit;
                    },
                     action : function () {
                        return "updatetCircuit";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.getCircuits();
            });
        }

        $scope.getCircuits();

    }]);

myAdminApp.controller('AdminPlanningsCtrl', ['$scope', '$http', '$modal', 'BASE_CONSTS', function($scope, $http, $modal, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "AdminMainCtrl";
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.circuits = [];
        $http({
            url: '../PHP/php-controller.php',
            method: "POST",
            data: {data :null, action: "getAllClients"},
            headers: {'Content-Type': 'application/json'}
        })
                .success(function(json) {
                    if (json.status === "ok") {
                        $scope.clients = json.data;
                    }
                })
                .error(function(json) {
                    console.log(json);
                });

    }]);

myAdminApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'dataForm', 'action', '$timeout', function($scope, $modalInstance, $http, dataForm, action, $timeout) {
        
        $scope.action = action;
        $scope.processForm = function(_form) {
            if (_form.$valid) {
                $scope.form_scope = angular.element("#formData_id").scope();
                $http({
                    url: '../PHP/php-controller.php',
                    method: "POST",
                    data: { data : $scope.form_scope.formData, action : $scope.action},
                    headers: {'Content-Type': 'application/json'}
                })
                        .success(function(json) {
                            if (json.status === "ok") {
                                $modalInstance.close();
                            }
                        })
                        .error(function(json) {
                            console.log(json);
                        });
            }
        };
        
        $scope.init = function(){
            if(dataForm != null && dataForm != undefined){
               $timeout(function(){
                   var _scope = angular.element("#formData_id").scope();
                    formulaire_merge(_scope.formData, dataForm,['created_at', 'updated_at']);
               }, 100); 
            }
           
            //
        };
        
        $scope.checkIsNaN = function(_number){
            return isNaN(_number);
        };
     
        $scope.ok = function() {
            //$modalInstance.close($scope.selected.item);
        };

        $scope.non = function() {
            $modalInstance.close('non');
        };

        $scope.oui = function() {
            $modalInstance.close('oui');
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }]);
