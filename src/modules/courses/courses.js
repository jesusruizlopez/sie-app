angular.module('courses', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'courses/courses.html',
		controller: 'CoursesCtrl'
	})
}])

.controller('CoursesCtrl', ['$scope', '$modal', function($scope, $modal) {
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

	$scope.add = function() {
		var modalInstance = $modal.open({
			templateUrl: 'courses/course.html',
			controller: 'CoursesModalCtrl',
			backdrop: 'static',
			resolve: {
				data: function() {
					return {
						icon: "fa-plus",
						title: "Agregar curso"
					}
				},
				course: function() {
					return {
						id: "",
						name: "",
						description: "",
						responsible: ""
					}
				}
			}
		});
	};

	$scope.edit = function(course) {
		var modalInstance = $modal.open({
			templateUrl: 'courses/course.html',
			controller: 'CoursesModalCtrl',
			backdrop: 'static',
			resolve: {
				data: function() {
					return {
						icon: "fa-pencil",
						title: "Editar curso"
					}
				},
				course: function() {
					return course;
				}
			}
		});
	};

	$scope.remove = function(course) {
		console.log(course);
	};
}])

.controller('CoursesModalCtrl', ['$scope', '$modal', '$modalInstance', 'data', 'course', function($scope, $modal, $modalInstance, data, course) {
	$scope.data = data;
	$scope.course = course;

	$scope.save = function() {
		console.log($scope.course);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

	$scope.close = function() {
		$modalInstance.dismiss();
	};
}]);
