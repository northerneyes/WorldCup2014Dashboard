'use strict';

// Declare app level module which depends on views, and components
angular.module('worldcup', [
	'ngRoute',
	'worldcup.home'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
}]);