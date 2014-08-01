var myAdminApp = angular.module('myAdminApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'angularFileUpload'])
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

        $scope.getClients = function() {
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
                    dataForm: function() {
                        return null;
                    },
                    action: function() {
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
                    dataForm: function() {
                        return null;
                    },
                    action: function() {
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
                        data: {data: {id: _client.id}, action: "dellClient"},
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
                    dataForm: function() {
                        return _client;
                    },
                    action: function() {
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

myAdminApp.controller('AdminCircuitsCtrl', ['$scope', '$http', '$modal', 'BASE_CONSTS', function($scope, $http, $modal, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "AdminCircuitsCtrl";
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
        $scope.circuits = [];

        $scope.getCircuits = function() {
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {action: "getAllCircuits"},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function(json) {
                        if (json.status === "ok" && json.data != null) {
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
                    dataForm: function() {
                        return null;
                    },
                    action: function() {
                        return "addNewCircuit";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.action = null;
                $scope.getCircuits();
            });
        }

        $scope.dellCircuit = function(_circuit) {
            var modalInstance = $modal.open({
//                templateUrl: 'admin_modal_client.html',
                template: '<div class="modal-header"><h2>Confirmation</h2></div><div class="modal-body">Etes vous sur de vouloir supprimer ' + _circuit.libelle + ' (' + _circuit.id + ') ?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="oui()">OUI</button><button class="btn btn-warning"  ng-click="non()">NON</button></div>',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return null;
                    },
                    action: function() {
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
                        data: {data: {id: _circuit.id}, action: "dellCircuit"},
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

        $scope.updateCircuit = function(_circuit) {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_circuit.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return _circuit;
                    },
                    action: function() {
                        return "updateCircuit";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.getCircuits();
            });
        }

        $scope.downloadCircuit = function(_circuit) {
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {data: {id: _circuit.id}, action: "downloadFileCircuit"},
                headers: {'Content-Type': 'application/octet-stream'}
            })
                    .success(function(json) {
//                            window.open('../PHP/force-download.php?filename='+json.data.data_filename,'_blank');
                        window.location.href = '../PHP/force-download.php?filename=' + json.data.data_filename;
                    })
                    .error(function(data) {
                        console.log(data);
                    });

        }

        $scope.getCircuits();

    }]);

myAdminApp.controller('AdminPlanningsCtrl', ['$scope', '$http', '$modal', '$filter', 'BASE_CONSTS', function($scope, $http, $modal,$filter, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "AdminPlanningsCtrl";
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.selectedDate = null;
        $scope.plannings = [];
        $scope.monthAndYear = [];
        
        $scope.getPlannings = function() {
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {action: "getAllPlannings"},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function(json) {
                        if (json.status === "ok") {
                            if(json.data === null){
                                $scope.plannings = [];
                            }else{
                                $scope.plannings = angular.copy(json.data);
                            }
                            
                            $scope.selectedDate = null;
                        }
                    })
                    .error(function(json) {
                        console.log(json);
                    });
                    
        }

        $scope.$watch('selectedDate', function() {
            if ($scope.selectedDate !== null
                    && $scope.selectedDate !== undefined
                    && $scope.selectedDate instanceof Date) {
                $scope.selectedPlanning = $scope.getPlanningByMonth($scope.selectedDate.getMonth());
                $scope.monthAndYear = getMonthArray()[$scope.selectedDate.getMonth()].label + " " + $scope.selectedDate.getFullYear();
            }else{
                $scope.selectedPlanning = null;
            }
        });

        $scope.getPlanningByMonth = function(_indexMonth) {
            debugger;
            for (var i = 0; i < $scope.plannings.length; i++) {
                if ($scope.plannings[i].mois == _indexMonth) {
                    return $scope.plannings[i];
                }
            }
        }
        
        $scope.addNewPlanning = function() {
            //$scope.strPeriode = $filter('toFormatedDate')($scope.selectedDate);
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_planning.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return {periode : $scope.selectedDate, mois : $scope.selectedDate.getMonth()};
                    },
                    action: function() {
                        return "addNewPlanning";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.action = null;
                $scope.getPlannings();
            });
        }

        $scope.dellPlanning = function(_planning) {
            var modalInstance = $modal.open({
//                templateUrl: 'admin_modal_client.html',
                template: '<div class="modal-header"><h2>Confirmation</h2></div><div class="modal-body">Etes vous sur de vouloir supprimer le planning de ' + $scope.monthAndYear + ' (' + _planning.id + ') ?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="oui()">OUI</button><button class="btn btn-warning"  ng-click="non()">NON</button></div>',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return null;
                    },
                    action: function() {
                        return "dellPlanning";
                    }
                }
            });
            modalInstance.result.then(function(_status) {
                debugger;
                if (_status === "oui") {
                    $http({
                        url: '../PHP/php-controller.php',
                        method: "POST",
                        data: {data: {id: _planning.id}, action: "dellPlanning"},
                        headers: {'Content-Type': 'application/json'}
                    })
                            .success(function(data) {
                                $scope.selectedPlanning = null;
                                $scope.selectedDate = null;
                                $scope.getPlannings();
                            })
                            .error(function(data) {
                                console.log(data);
                            });
                }
            });
        }

        $scope.updatePlanning = function(_planning) {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_planning.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return _planning;
                    },
                    action: function() {
                        return "updatePlanning";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.selectedPlanning = null;
                $scope.selectedDate = null;
                $scope.getPlannings();
            });
        }

        $scope.downloadPlanning = function(_planning) {
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {data: {id: _planning.id}, action: "downloadFilePlanning"},
                headers: {'Content-Type': 'application/octet-stream'}
            })
                    .success(function(json) {
//                            window.open('../PHP/force-download.php?filename='+json.data.data_filename,'_blank');
                        window.location.href = '../PHP/force-download.php?filename=' + json.data.data_filename;
                    })
                    .error(function(data) {
                        console.log(data);
                    });

        }
        
        $scope.getPlannings();
        


    }]);


myAdminApp.controller('AdminFacturesCtrl', ['$scope', '$http', '$modal', '$filter', 'BASE_CONSTS', function($scope, $http, $modal,$filter, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "AdminFacturesCtrl";

        $scope.factures = [];
        $scope.now = new Date();
        
        $scope.getFactures = function() {
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {action: "getAllFactures"},
                headers: {'Content-Type': 'application/json'}
            })
                    .success(function(json) {
                        if (json.status === "ok" && json.data != null) {
                            $scope.factures = angular.copy(json.data);
                        }
                    })
                    .error(function(json) {
                        console.log(json);
                    });
        }

        $scope.addNewFacture = function() {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_facture.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return null;
                    },
                    action: function() {
                        return "addNewFacture";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.action = null;
                $scope.getFactures();
            });
        }

        $scope.dellFacture = function(_facture) {
            var modalInstance = $modal.open({
//                templateUrl: 'admin_modal_client.html',
                template: '<div class="modal-header"><h2>Confirmation</h2></div><div class="modal-body">Etes vous sur de vouloir supprimer ' + _facture.libelle + ' (' + _facture.id + ') ?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="oui()">OUI</button><button class="btn btn-warning"  ng-click="non()">NON</button></div>',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return null;
                    },
                    action: function() {
                        return "dellFacture";
                    }
                }
            });
            modalInstance.result.then(function(_status) {
                debugger;
                if (_status === "oui") {
                    $http({
                        url: '../PHP/php-controller.php',
                        method: "POST",
                        data: {data: {id: _facture.id}, action: "dellFacture"},
                        headers: {'Content-Type': 'application/json'}
                    })
                            .success(function(data) {
                                $scope.getFactures();
                            })
                            .error(function(data) {
                                console.log(data);
                            });
                }
            });
        }

        $scope.updateFacture = function(_facture) {
            var modalInstance = $modal.open({
                templateUrl: 'admin_modal_facture.html',
                controller: 'ModalInstanceCtrl',
                scope: $scope,
//                size: 'lg',
                backdrop: 'static',
                resolve: {
                    dataForm: function() {
                        return _facture;
                    },
                    action: function() {
                        return "updateFacture";
                    }
                }
            });

            modalInstance.result.then(function(_status) {
                $scope.getFactures();
            });
        }

        $scope.downloadFacture = function(_facture) {
            $http({
                url: '../PHP/php-controller.php',
                method: "POST",
                data: {data: {id: _circuit.id}, action: "downloadFileFacture"},
                headers: {'Content-Type': 'application/octet-stream'}
            })
                    .success(function(json) {
//                            window.open('../PHP/force-download.php?filename='+json.data.data_filename,'_blank');
                        window.location.href = '../PHP/force-download.php?filename=' + json.data.data_filename;
                    })
                    .error(function(data) {
                        console.log(data);
                    });

        }
        
        $scope.openCalendar = function($event) {
            debugger;
            $event.preventDefault();
            $event.stopPropagation();

            $scope.$$childHead.$$childHead.toggleOpen();
          };

        $scope.getFactures();




    }]);

myAdminApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$http', 'dataForm', 'action', '$timeout', '$upload', function($scope, $modalInstance, $http, dataForm, action, $timeout, $upload) {

        $scope.action = action;
        $scope.files = null;
        $scope.processForm = function(_form) {
            if (_form.$valid) {
                $scope.form_scope = angular.element("#formData_id").scope();
                $http({
                    url: '../PHP/php-controller.php',
                    method: "POST",
                    data: {data: $scope.form_scope.formData, action: $scope.action},
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

        $scope.init = function() {
            debugger;
            if (dataForm != null && dataForm != undefined) {
                    $timeout(function() {
                        debugger;
                        var _scope = angular.element("#formData_id").scope();
                        formulaire_merge(_scope.formData, dataForm, ['created_at', 'updated_at']);
                    }, 100);
            }

            //
        };
        
        $scope.cleanUpForm =function(_form){
            array_miss = ['created_at', 'updated_at', 'formData'];
             debugger;
            for (i in _form) {
                if (array_miss.indexOf(i) != -1) {
                   
                    delete _form[i];
                }
            }
            return _form;
        }

        $scope.checkIsNaN = function(_number) {
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

        $scope.onFileSelected = function($files) {
            debugger;
            $scope.files = $files;
            $scope.form_scope = angular.element("#formData_id").scope();
            $scope.form_scope.formData.data_filename = $files[0] != undefined ? $files[0].name : null;
            $scope.form_scope.formData.$setDirty();
            debugger;
        };

        $scope.processUploadForm = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            $scope.form_scope = angular.element("#formData_id").scope();
            debugger;
            if($scope.form_scope.formData)
            $scope.upload = $upload.upload({
                url: '../PHP/php-controller.php', //upload.php script, node.js route, or servlet url
                // method: 'POST' or 'PUT',
                // headers: {'header-key': 'header-value'},
                // withCredentials: true,
                data: {data: $scope.cleanUpForm($scope.form_scope.formData), action: $scope.action},
                file: $scope.files != null ? ($scope.files.length == 1 ? $scope.files[0] : null) : null, // or list of files: $files for html5 only
                // fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file
                /* customize file formData name ('Content-Desposition'), server side file variable name. 
                 Default is 'file' */
                //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                //formDataAppender: function(formData, key, val){}
            }).progress(function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);

            }).success(function(data, status, headers, config) {
                $timeout(function() {
                    $modalInstance.close();
                }, 200)

            });
        };

    }]);

myAdminApp.filter('toFormatedDate', function() {
    return function(_date) {
      debugger;
        var d = _date;
		var dd = d.getDate();
		if (dd < 10) dd = '0' + dd

		var mm = d.getMonth() + 1
		if (mm < 10) mm = '0' + mm

		var yy = d.getFullYear() % 100
		if (yy < 10) yy = '0' + yy

		return dd + "/" + mm + "/" + d.getFullYear();
    //return _date.getDay() +"-"+ _date.getMonth() +"-"+ _date.getFullYear();
  };
});
myAdminApp.filter('toFactureFormatedDate', function() {
  return function(_date) {
        var d = _date;
		var dd = d.getDate();
		if (dd < 10) dd = '0' + dd

		var mm = d.getMonth() + 1
		if (mm < 10) mm = '0' + mm

		var yy = d.getFullYear() % 100
		if (yy < 10) yy = '0' + yy

		return d.getFullYear() + mm + dd; 
    //return _date.getDay() +"-"+ _date.getMonth() +"-"+ _date.getFullYear();
  };
});
myAdminApp.filter('toFactureFormatedNumero', function() {
  return function(_num) {
        return _num;
  };
});
