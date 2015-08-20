angular.module('courses', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'courses/courses.html',
		controller: 'CoursesCtrl'
	})
}])

.controller('CoursesCtrl', ['$scope', function($scope) {

}]);
