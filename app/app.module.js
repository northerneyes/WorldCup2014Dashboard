'use strict';

// Declare app level module which depends on views, and components
angular.module('worldcup', [
	'ngRoute',
	'worldcup.home',
	'worldcup.group',
	'worldcup.utils',
	'worldcup.scrollFader'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({
		redirectTo: '/home'
	});
}]);