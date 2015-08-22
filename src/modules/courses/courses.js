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

.controller('CoursesCtrl', ['$scope', '$modal', 'courses', 'resources', '$route', 'ngToast', function($scope, $modal, courses, resources, $route, ngToast) {
	$scope.courses = courses;

	// se agregan dos nuevas propiedades a data (text, onlyText)
	$scope.add = function() {
		var modalInstance = $modal.open({
			templateUrl: 'courses/course.html',
			controller: 'CoursesModalCtrl',
			backdrop: 'static',
			resolve: {
				data: function() {
					return {
						icon: "fa-plus",
						title: "Agregar curso",
						text: "",
						onlyText: false
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
						title: "Editar curso",
						text: "",
						onlyText: false
					}
				},
				course: function() {
					return course;
				}
			}
		});
	};

	$scope.remove = function(course) {
		var modalInstance = $modal.open({
			templateUrl: 'courses/course.html',
			controller: 'CoursesModalCtrl',
			backdrop: 'static',
			resolve: {
				data: function() {
					return {
						icon: "fa-trash",
						title: "Eliminar curso",
						text: "¿Desea eliminar el curso?",
						onlyText: true
					}
				},
				course: function() {
					return course;
				}
			}
		});
	};
}])

.controller('CoursesModalCtrl', ['$scope', '$modal', '$modalInstance', 'data', 'course', 'resources', '$route', 'ngToast', function($scope, $modal, $modalInstance, data, course, resources, $route, ngToast) {
	$scope.data = data;
	// se debe generar una copia de la variable para no afetar a la otra referencia
	$scope.course = angular.copy(course);
	
	$scope.save = function() {
		// validación para saber si debe atualizar o guardar
		// cuando es un curso nuevo para guardar id == undefined
		// cuando es un curso a actualizar, ya tiene un id y es != a undefined
		if ($scope.course.id != undefined) {
			resources.updateCourse($scope.course).
			success(function(response) {
				$modalInstance.dismiss();
				ngToast.create({
					content: "Se actualizó correctamente el curso",
					class: "success"
				});
				$route.reload();
			})
			.error(function(response) {
				ngToast.create({
					content: "Error al actualizar el curso",
					class: "danger"
				});
			});
		}
		else {
			resources.createCourse($scope.course).
			success(function(response) {
				$modalInstance.dismiss();
				ngToast.create({
					content: "Se guardó correctamente el curso",
					class: "success"
				});
				$route.reload();
			})
			.error(function(response) {
				ngToast.create({
					content: "Error al guardar el curso",
					class: "danger"
				});
			});
		}
	};

	$scope.confirm = function() {
		resources.deleteCourse($scope.course.id).
		success(function(response) {
			$modalInstance.dismiss();
			ngToast.create({
				content: "Se eliminó correctamente el curso",
				class: "success"
			});
			$route.reload();
		})
		.error(function(response) {
			ngToast.create({
				content: "Error al eliminar el curso",
				class: "danger"
			});
		});
	}

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

	$scope.close = function() {
		$modalInstance.dismiss();
	};
}]);
