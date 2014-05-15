var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                    .when('/accueil', {templateUrl: 'accueil.html', controller: "MainCtrl"})
                    .when('/', {templateUrl: 'accueil.html', controller: "MainCtrl"})
                    .when('/presentation', {templateUrl: 'presentation.html', controller: "PresentationCtrl"})
                    .when('/connaissances', {templateUrl: 'connaissances.html', controller: "ConnaissancesCtrl", name: "connaissances"})
                    .when('/contact', {templateUrl: 'contact.html', controller: "ContactCtrl", name: "contact"})
                    .when('/404', {templateUrl: '404.html'})
            
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
                icon : "envelope"
            },{
                name: "Devis",
                url: "#devis",
                icon : "road"
            }, {
                name: "Temoignages",
                url: "#temoignages",
                icon : "star-empty"
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

myApp.controller('ContactCtrl', ['$scope', '$route', '$routeParams', '$location', 'BASE_CONSTS', function($scope, $route, $routeParams, $location, BASE_CONSTS) {
        $scope.BASE_CONSTS = BASE_CONSTS;
        $scope.name = "ContactCtrl";
        $scope.params = $routeParams;
        debugger;
        $scope.formData = {};
        
        $scope.processForm = function() {
            $http({
                method: 'POST',
                url: '/PHP/sendMail.php',
                data: $.param($scope.formData), // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}  // set the headers so angular passing info as form data (not request payload)
            })
                    .success(function(data) {
                        console.log(data);

                        if (!data.success) {
                            // if not successful, bind errors to error variables
                            $scope.errorName = data.errors.name;
                            $scope.errorSuperhero = data.errors.superheroAlias;
                        } else {
                            // if successful, bind success message to message
                            $scope.message = data.message;
                        }
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
        
        
    }]);

//
//myApp.controller('ConnaissancesCtrl', ['$scope', '$route', '$routeParams', '$location', 'BASE_CONSTS', '$http', function($scope, $route, $routeParams, $location, BASE_CONSTS, $http) {
//        $scope.BASE_CONSTS = BASE_CONSTS;
//        $scope.name = "ProjetsCtrl";
//        $scope.params = $routeParams;
//        $scope.$route = $route;
//        $scope.$location = $location;
//        $scope.$routeParams = $routeParams;
//        $scope.competences = [];
//        $http.get('competences.json').success(function(data) {
//            $scope.competences = data;
//        });
//    }]);
//
//myApp.controller('PresentationCtrl', ['$scope', '$route', '$routeParams', '$location', 'BASE_CONSTS', function($scope, $route, $routeParams, $location, BASE_CONSTS) {
//        $scope.BASE_CONSTS = BASE_CONSTS;
//        $scope.name = "PresentationCtrl";
//        $scope.params = $routeParams;
//    }]);
//
//function Project(name, language, annee) {
//    this.name = name;
//    this.language = language;
//    this.annee = annee;
//    
//}  