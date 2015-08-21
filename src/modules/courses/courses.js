angular.module('courses', ['services.resources'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'courses/courses.html',
		controller: 'CoursesCtrl',
		resolve: {
			courses: ['resources', function(resources) {
				return resources.getCourses().
				then(function(response) {
					return response.data;
				})
			}]
		}
	})
}])

.controller('CoursesCtrl', ['$scope', '$modal', 'courses', 'resources', '$route', function($scope, $modal, courses, resources, $route) {
	$scope.courses = courses;

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
		var answer = confirm("¿Desea eliminar este curso?");
		if (answer) {
			resources.deleteCourse(course.id)
			.success(function(response, code) {
				if (code == 204) {
					alert("Se eliminó correctamente el curso");
					$route.reload();
				}
			})
			.error(function(response, code) {
				alert("Error al eliminar el curso");
			})
		}
	};
}])

.controller('CoursesModalCtrl', ['$scope', '$modal', '$modalInstance', 'data', 'course', 'resources', '$route', function($scope, $modal, $modalInstance, data, course, resources, $route) {
	$scope.data = data;
	$scope.course = course;

	$scope.save = function() {
		resources.createCourse($scope.course).
		success(function(response, code) {
			if (code == 200) {
				$modalInstance.dismiss();
				alert("Se guardó correctamente el curso");
				$route.reload();
			}
		})
		.error(function(response, code) {
			alert("Error al guardar el curso");
		});
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

	$scope.close = function() {
		$modalInstance.dismiss();
	};
}]);
