'use strict';

// instancia de la aplicación con sus respectivos módulos
angular.module('app', [
	'ngRoute',
	'ui.bootstrap',
	'ngToast',
	'courses',
	'templates.general',
	'templates.commons',
	'templates.modules'
])

// configuraciones generales del ngToast (aplica para todos los toast en la app)
.config(['ngToastProvider', function(ngToast) {
	ngToast.configure({
		verticalPosition: 'bottom',
		horizontalPosition: 'left',
		dismissOnTimeout: true,
        timeout: 6000,
        dismissButton: true,
        dismissButtonHtml: '&times;',
        dismissOnClick: true,
        compileContent: true,
		maxNumber: 0
	});
}])

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
