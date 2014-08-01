var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                    .when('/accueil', {templateUrl: 'accueil.html', controller: "MainCtrl"})
                    .when('/', {templateUrl: 'accueil.html', controller: "MainCtrl"})
                    .when('/presentation', {templateUrl: 'presentation.html', controller: "PresentationCtrl"})
                    .when('/connaissances', {templateUrl: 'connaissances.html', controller: "ConnaissancesCtrl", name: "connaissances"})
                    .when('/contact', {templateUrl: 'contact.html', controller: "ContactCtrl", name: "contact"})
                    .when('/404', {templateUrl: '404.html'})
                    .when('/devis', {templateUrl: 'devis.html', controller: "DevisCtrl", name: "devis"})
                    .when('/temoignages', {templateUrl: 'temoignages.html', controller: "TemoignagesCtrl", name: "temoignages"})

                    .otherwise({redirectTo: '/'});

            // configure html5 to get links working on jsfiddle
            //$locationProvider.html5Mode(true);
            //$locationProvider.hashPrefix('!');

        });

//myApp.config(['$routeProvider',
//  function($routeProvider) {
//      $routeProvider
//        .when('/accueil', {templateUrl: 'accueil.html', controller: "MainCtrl", name: "accueil"})
//        .when('/', {templateUrl: 'accueil.html', controller: "MainCtrl", name: "accueil"})
//        .when('/presentation', {templateUrl: 'presentation.html', controller: "PresentationCtrl", name: "presentation"})
//        .when('/connaissances', {templateUrl: 'connaissances.html', controller: "ConnaissancesCtrl", name: "connaissances"})
//        .when('/404', {templateUrl: '404.html'})
//        .otherwise({redirectTo: '/'});
//
//            // configure html5 to get links working on jsfiddle
//            //$locationProvider.html5Mode(true);
//            //$locationProvider.hashPrefix(false);
//}]);

myApp.value('BASE_CONSTS', {
    SITE_NAME: "Ch'ti Transport",
    SITE_AUTHOR: 'Pierre Péchaud-Rivière',
    SITE_URL: ''
});

myApp.controller('HeaderCtrl', ['$scope', 'BASE_CONSTS', function($scope, BASE_CONSTS) {
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

myApp.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', 'BASE_CONSTS', function($scope, $route, $routeParams, $location, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.name = "MainCtrl";
        $scope.params = $routeParams;

    }]);

myApp.controller('ContactCtrl', ['$scope', '$route', '$routeParams', '$location', 'BASE_CONSTS' ,'$http', function($scope, $route, $routeParams, $location, BASE_CONSTS, $http) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "ContactCtrl";
        $scope.params = $routeParams;

        $scope.formData = {};
        
        $scope.processForm = function() {
            if(!$scope.formData.$valid){
                console.log("formulaire incorrect");
                return;
            }
            var data = $.param({
                name : $scope.formData.name,
                email : $scope.formData.email.$modelValue,
                from : "<"+$scope.formData.email.$modelValue+">",
                object : $scope.formData.object,
                message : $scope.formData.message
            });
            $http({
                method: 'POST',
                url: 'PHP/sendMail.php',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            })
                    .success(function(data) {
                        console.log(data);
                    })
                    .error(function(data){
                        console.log(data);       
                    });
        };
        
 

    }]);

myApp.controller('DevisCtrl', ['$scope', '$route', '$routeParams', '$location', 'BASE_CONSTS', function($scope, $route, $routeParams, $location, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "ProjetsCtrl";
        $scope.params = $routeParams;
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.formData = {};


    }]);

myApp.controller('TemoignagesCtrl', ['$scope','$location', '$anchorScroll','$http', '$modal','BASE_CONSTS', function($scope, $location, $anchorScroll,$http, $modal, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "TemoignagesCtrl";
        $scope.temoignages = [];
        
        $scope.getTemoignages = function(){
            //TODO : BDD retourne que les validate = true
//            $scope.temoignages = [
//                {
//                    "date": "12/05/2014",
//                    "message": "Une personne compétence et fiable en tout points de vue.",
//                    "initiale": "Alexiel J TEsEEEST.",
//                    "validate": true
//                },
//                {
//                    "date": "05/05/2014",
//                    "message": "Très pro, je le recommande !",
//                    "initiale": "Cedric S.",
//                    "validate": true
//                },
//                {
//                    "date": "22/04/2014",
//                    "message": "A l'heure et très amicale",
//                    "initiale": "Cecille D.",
//                    "validate": true
//                },
//                {
//                    "date": "22/04/2014",
//                    "message": "Connait de bon raccourcie, pratique et efficace.",
//                    "initiale": "Anthoine D.",
//                    "validate": true    },
//                {
//                    "date": "12/05/2014",
//                    "message": "Cher pour la prestation",
//                    "initiale": "Félix J.",
//                    "validate": false    },
//                {
//                    "date": "12/05/2014",
//                    "message": "Une personne compétence et fiable en tout points de vue.",
//                    "initiale": "Alexiel J TEsEEEST.",
//                    "validate": true
//                },
//                {
//                    "date": "05/05/2014",
//                    "message": "Très pro, je le recommande !",
//                    "initiale": "Cedric S.",
//                    "validate": true
//                },
//                {
//                    "date": "22/04/2014",
//                    "message": "A l'heure et très amicale",
//                    "initiale": "Cecille D.",
//                    "validate": true
//                },
//                {
//                    "date": "22/04/2014",
//                    "message": "Connait de bon raccourcie, pratique et efficace.",
//                    "initiale": "Anthoine D.",
//                    "validate": false    },
//                {
//                    "date": "12/05/2014",
//                    "message": "Cher pour la prestation",
//                    "initiale": "Félix J.",
//                    "validate": false    }
//            ];

            $http({
                url : 'PHP/php-controller.php',
                method : "POST",
                data : JSON.stringify({action : "getAllValideTemoignages"}),
                headers : {'Content-Type' : 'application/json'}
              })
                    .success(function(json) {
                        angular.forEach(json.data, function(value, key) {
                             $scope.temoignages.push(value);
                        });
                        $scope.temoignages = json.data;
                    })
                    .error(function(json){
                        console.log(json);       
                    });  
        };


        $scope.addTemoignage = function(_form) {
            if (_form.$valid) {
                _form.valide = false;
                _form.date = new Date();
                $http({
                    url: 'PHP/php-controller.php',
                    method: "POST",
                    data: {data: _form, action: "addNewTemoignage"},
                    headers: {'Content-Type': 'application/json'}
                })
                        .success(function(json) {
                            if (json.status === "ok") {
                                var modalInstance = $modal.open({
                    //                templateUrl: 'admin_modal_client.html',
                                    template: '<div class="modal-header"><h2>Message</h2></div><div class="modal-body">Merci pour votre temoignage. </div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">CONTINUER</button></div>',
                                    scope: $scope,
                                    backdrop: 'static',
                                    controller: 'ModalInstanceCtrl'
                                       
                                });
                                modalInstance.result.then(function(_status) {
                                    $scope.formData.nom = "";
                                    $scope.formData.prenom = "";
                                    $scope.formData.message = "";
                                    $scope.formData.$setPristine();
                                    $scope.getTemoignages();
                                });
 
                            }
                        })
                        .error(function(json) {
                            console.log(json);
                        });
                 
            }
            
            
        };

        $scope.scrollToAddNew = function(id) {
            $location.hash(id);
            $anchorScroll();
        };
        
        $scope.getTemoignages();
    }]);

myApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
       
        $scope.ok = function () {
          $modalInstance.close('ok');
        };

    }]);
