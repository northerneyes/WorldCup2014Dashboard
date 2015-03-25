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
	var colors = {
		'A': 'red',
		'B': 'pink',
		'C': 'yellow',
		'D': 'green',
		'E': 'blue',
		'F': 'purple',
		'G': 'carmine',
		'H': 'orange'
	};

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
			item.group.color = colors[item.group.letter]; 
		});

		$scope.groups = groups;
		$activityIndicator.stopAnimating();
	});


	

	//preload
	$scope.groups = _.map(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], function(letter){
		return {
			group: {
				letter: letter,
				color: colors[letter],
				teams:[]
			}
		};
	});

});