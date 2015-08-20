angular.module('courses', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'courses/courses.html',
		controller: 'CoursesCtrl'
	})
}])

.controller('CoursesCtrl', ['$scope', function($scope) {
	$scope.courses = [
		{
			id: "12DE34FR",
			name: "Programación Web",
			description: "Curso avanzado de programación web",
			responsible: "Martín Nevarez"
		},
		{
			id: "12EE14ZR",
			name: "Matemáticas",
			description: "Curso avanzado de Matemáticas",
			responsible: "Felix de la Rocha"
		}
	];

	$scope.edit = function(id) {
		console.log(id);
	};

	$scope.remove = function(course) {
		console.log(course);
	};
}]);
