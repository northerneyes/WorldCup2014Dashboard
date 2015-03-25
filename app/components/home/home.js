'use strict';

angular.module('worldcup.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'components/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', function($scope, worldCupStatistics) {
	worldCupStatistics.groupResults().then(function(groups) {
		$scope.groups = groups.splice(0, 2);
	});
	$scope.groups = [];
});