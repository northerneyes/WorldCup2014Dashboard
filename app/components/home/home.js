'use strict';

angular.module('worldcup.home', ['ngRoute', 'chart.js', 'ngActivityIndicator'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'components/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', function($scope, worldCupStatistics, _, $activityIndicator) {
	$activityIndicator.startAnimating();
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
		$activityIndicator.stopAnimating();
	});

	//preload
	$scope.groups = _.map(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], function(letter){
		return {
			group: {
				letter: letter,
				teams:[]
			}
		};
	});

	$scope.split = function(index, length, groups) {
		var ret = groups.slice(index * length, (index * length) + length);
		return ret;
	};
});