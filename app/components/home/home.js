'use strict';

angular.module('worldcup.home', ['ngRoute', "chart.js"])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'components/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', function($scope, worldCupStatistics, _) {
	worldCupStatistics.groupResults().then(function(groups) {
		_.each(groups, function(item) {
			//collect data for charts
			item.group.chart = _.map(item.group.teams, function(p) {
				return {
					value: p.team.points,
					label: p.team.country
				};
			});
			item.group.data = _.pluck(item.group.chart, 'value');
			item.group.labels = _.pluck(item.group.chart, 'label');
		});

		$scope.groups = groups;
	});
	$scope.groups = [];

	$scope.split = function(index, length, attempts) {
		var ret = attempts.slice(index * length, (index * length) + length);
		return ret;
	};
});