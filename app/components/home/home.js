'use strict';

angular.module('worldcup.home', ['ngRoute', 'chart.js', 'ngActivityIndicator', 'worldcup.providers'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'components/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', function($scope, worldCupProvider, _, $activityIndicator) {
	$activityIndicator.startAnimating();
	
	worldCupProvider.groupResults().then(function(groups) {
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
			item.group.color = _.find(worldCupProvider.groups(), function(p) {
				return p.letter === item.group.letter;
			}).color;
		});

		$scope.groups = groups;
		$activityIndicator.stopAnimating();
	});


	//preload
	$scope.groups = _.map(worldCupProvider.groups(), function(group) {
		return {
			group: {
				letter: group.letter,
				color: group.color,
				teams: []
			}
		};
	});

});