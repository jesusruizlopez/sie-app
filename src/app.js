'use strict';

// instancia de la aplicación con sus respectivos módulos
angular.module('app', [
	'ngRoute',
	'courses',
	'templates.general',
	'templates.commons',
	'templates.modules'
])

// configuraciones globales de la aplicación
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$routeProvider.otherwise({redirectTo: '/'});
}])

.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	
}]);
