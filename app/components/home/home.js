'use strict';

angular.module('worldcup.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'components/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', function($scope) {
	$scope.rating = 42;
});