angular.module('services.resources', [])

.factory('resources', ['$http', function($http) {
	var BASE = "http://localhost:3000/api";
	return {
		getCourses: function() {
			return $http({method: 'GET', url: BASE + '/courses'});
		},
		createCourse: function(course) {
			return $http({method: 'POST', url: BASE + '/courses', data: course});
		},
		deleteCourse: function(id) {
			return $http({method: 'DELETE', url: BASE + '/courses/' + id});
		}
	};
}]);
