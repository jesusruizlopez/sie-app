'use strict';

angular.module('app', [
	'ngRoute',
	'templates.general',
	'templates.commons',
	'templates.modules'
])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$routeProvider.otherwise({redirectTo: '/'});
}])

.controller('AppCtrl', ['$scope', '$location', function($scope, $location) {
	
}]);
