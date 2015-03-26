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
'use strict';

angular.module('worldcup.group', [
  'worldcup.group.groupDirective'
]);

'use strict';

angular.module('worldcup.providers', [
	'worldcup.providers.worldCupProvider'
]);
'use strict';

angular.module('worldcup.scrollFader', [
  'worldcup.scrollFader.scrollFaderDirective'
]);
'use strict';

angular.module('worldcup.utils', [
  'worldcup.utils.underscore'
]);
'use strict';

angular.module('worldcup.home', ['ngRoute', 'chart.js', 'ngActivityIndicator', 'worldcup.providers'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'components/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ["$scope", "worldCupProvider", "_", "$activityIndicator", function($scope, worldCupProvider, _, $activityIndicator) {
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

}]);
'use strict';

angular.module('worldcup.group.groupDirective', [])

.directive('group', function() {
    return {
        restrict: 'AE',
        scope: {
            teams: '='
        },
        templateUrl: 'shared/group/groupView.html',
        link: function(scope, iElement, iAttrs) {
            
        }
    };
});
'use strict';

angular.module('worldcup.providers.worldCupProvider', [])

.service("worldCupProvider",
	["$http", "$q", function($http, $q) {
		return ({
			groupResults: groupResults,
			groups: function() {
				return [{
					letter: 'A',
					color: 'red'
				}, {
					letter: 'B',
					color: 'pink'
				}, {
					letter: 'C',
					color: 'yellow'
				}, {
					letter: 'D',
					color: 'green'
				}, {
					letter: 'E',
					color: 'blue'
				}, {
					letter: 'F',
					color: 'purple'
				}, {
					letter: 'G',
					color: 'carmine'
				}, {
					letter: 'H',
					color: 'orange'
				}];

			}
		});

		function groupResults() {

			var request = $http({
				method: "get",
				url: "http://worldcup.sfg.io/teams/group_results",
				params: {
					action: "get"
				}
			});

			return (request.then(handleSuccess, handleError));

		}

		function handleError(response) {

			// The API response from the server should be returned in a
			// nomralized format. However, if the request was not handled by the
			// server (or what not handles properly - ex. server error), then we
			// may have to normalize it on our end, as best we can.
			if (!angular.isObject(response.data) ||
				!response.data.message
			) {

				return ($q.reject("An unknown error occurred."));

			}

			// Otherwise, use expected error message.
			return ($q.reject(response.data.message));

		}


		// I transform the successful response, unwrapping the application data
		// from the API response payload.
		function handleSuccess(response) {

			return (response.data);

		}
	}]);
'use strict';

angular.module('worldcup.scrollFader.scrollFaderDirective', [])

.directive('scrollFader', ["$window", function($window) {
	return {
		restrict: 'A',
		scope: {},
		link: function(scope, iElement, iAttrs) {

			function fader() {
				var r = angular.element(document.getElementsByClassName('blurred'));
				var wh = $window.innerHeight;
				var dt = $window.pageYOffset;
				var elView, opacity;

				angular.forEach(r, function(value) {
					var el = angular.element(value);
					elView = wh - (el.prop('offsetTop') - dt + 200);
					if (elView > 0) { // Top of DIV above bottom of window.
						opacity = dt / el[0].offsetHeight * 1.5;
						if (opacity < 1) // Bottom of DIV below top of window.
							el.css('opacity', opacity);
					}
				});
			}

			angular.element($window).bind('scroll', fader);

		}
	};
}]);
'use strict';

angular.module('worldcup.utils.underscore', [])

.factory('_', function(){
	return window._;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJzaGFyZWQvZ3JvdXAvZ3JvdXAubW9kdWxlLmpzIiwic2hhcmVkL3Byb3ZpZGVycy9wcm92aWRlcnMubW9kdWxlLmpzIiwic2hhcmVkL3Njcm9sbEZhZGVyL3Njcm9sbEZhZGVyLm1vZHVsZS5qcyIsInNoYXJlZC91dGlscy91dGlscy5tb2R1bGUuanMiLCJjb21wb25lbnRzL2hvbWUvaG9tZS5qcyIsInNoYXJlZC9ncm91cC9ncm91cERpcmVjdGl2ZS5qcyIsInNoYXJlZC9wcm92aWRlcnMvd29ybGRDdXBQcm92aWRlci5qcyIsInNoYXJlZC9zY3JvbGxGYWRlci9zY3JvbGxGYWRlckRpcmVjdGl2ZS5qcyIsInNoYXJlZC91dGlscy91bmRlcnNjb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxRQUFBLE9BQUEsWUFBQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0FBRUEsT0FBQSxDQUFBLGtCQUFBLFNBQUEsZ0JBQUE7Q0FDQSxlQUFBLFVBQUE7RUFDQSxZQUFBOzs7QUNaQTs7QUFFQSxRQUFBLE9BQUEsa0JBQUE7RUFDQTs7O0FDSEE7O0FBRUEsUUFBQSxPQUFBLHNCQUFBO0NBQ0E7O0FDSEE7O0FBRUEsUUFBQSxPQUFBLHdCQUFBO0VBQ0E7O0FDSEE7O0FBRUEsUUFBQSxPQUFBLGtCQUFBO0VBQ0E7O0FDSEE7O0FBRUEsUUFBQSxPQUFBLGlCQUFBLENBQUEsV0FBQSxZQUFBLHVCQUFBOztDQUVBLE9BQUEsQ0FBQSxrQkFBQSxTQUFBLGdCQUFBO0NBQ0EsZUFBQSxLQUFBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTs7OztDQUlBLFdBQUEsc0VBQUEsU0FBQSxRQUFBLGtCQUFBLEdBQUEsb0JBQUE7Q0FDQSxtQkFBQTs7Q0FFQSxpQkFBQSxlQUFBLEtBQUEsU0FBQSxRQUFBO0VBQ0EsRUFBQSxLQUFBLFFBQUEsU0FBQSxNQUFBOztHQUVBLEtBQUEsTUFBQSxRQUFBLEVBQUEsSUFBQSxLQUFBLE1BQUEsT0FBQSxTQUFBLEdBQUE7SUFDQSxPQUFBO0tBQ0EsT0FBQSxFQUFBLEtBQUE7S0FDQSxPQUFBLEVBQUEsS0FBQTs7O0dBR0EsS0FBQSxNQUFBLE9BQUEsRUFBQSxNQUFBLEtBQUEsTUFBQSxPQUFBO0dBQ0EsS0FBQSxNQUFBLFNBQUEsRUFBQSxNQUFBLEtBQUEsTUFBQSxPQUFBO0dBQ0EsS0FBQSxNQUFBLFFBQUEsRUFBQSxLQUFBLGlCQUFBLFVBQUEsU0FBQSxHQUFBO0lBQ0EsT0FBQSxFQUFBLFdBQUEsS0FBQSxNQUFBO01BQ0E7OztFQUdBLE9BQUEsU0FBQTtFQUNBLG1CQUFBOzs7OztDQUtBLE9BQUEsU0FBQSxFQUFBLElBQUEsaUJBQUEsVUFBQSxTQUFBLE9BQUE7RUFDQSxPQUFBO0dBQ0EsT0FBQTtJQUNBLFFBQUEsTUFBQTtJQUNBLE9BQUEsTUFBQTtJQUNBLE9BQUE7Ozs7OztBQ3pDQTs7QUFFQSxRQUFBLE9BQUEsaUNBQUE7O0NBRUEsVUFBQSxTQUFBLFdBQUE7SUFDQSxPQUFBO1FBQ0EsVUFBQTtRQUNBLE9BQUE7WUFDQSxPQUFBOztRQUVBLGFBQUE7UUFDQSxNQUFBLFNBQUEsT0FBQSxVQUFBLFFBQUE7Ozs7O0FDWEE7O0FBRUEsUUFBQSxPQUFBLHVDQUFBOztDQUVBLFFBQUE7aUJBQ0EsU0FBQSxPQUFBLElBQUE7RUFDQSxRQUFBO0dBQ0EsY0FBQTtHQUNBLFFBQUEsV0FBQTtJQUNBLE9BQUEsQ0FBQTtLQUNBLFFBQUE7S0FDQSxPQUFBO09BQ0E7S0FDQSxRQUFBO0tBQ0EsT0FBQTtPQUNBO0tBQ0EsUUFBQTtLQUNBLE9BQUE7T0FDQTtLQUNBLFFBQUE7S0FDQSxPQUFBO09BQ0E7S0FDQSxRQUFBO0tBQ0EsT0FBQTtPQUNBO0tBQ0EsUUFBQTtLQUNBLE9BQUE7T0FDQTtLQUNBLFFBQUE7S0FDQSxPQUFBO09BQ0E7S0FDQSxRQUFBO0tBQ0EsT0FBQTs7Ozs7O0VBTUEsU0FBQSxlQUFBOztHQUVBLElBQUEsVUFBQSxNQUFBO0lBQ0EsUUFBQTtJQUNBLEtBQUE7SUFDQSxRQUFBO0tBQ0EsUUFBQTs7OztHQUlBLFFBQUEsUUFBQSxLQUFBLGVBQUE7Ozs7RUFJQSxTQUFBLFlBQUEsVUFBQTs7Ozs7O0dBTUEsSUFBQSxDQUFBLFFBQUEsU0FBQSxTQUFBO0lBQ0EsQ0FBQSxTQUFBLEtBQUE7S0FDQTs7SUFFQSxRQUFBLEdBQUEsT0FBQTs7Ozs7R0FLQSxRQUFBLEdBQUEsT0FBQSxTQUFBLEtBQUE7Ozs7Ozs7RUFPQSxTQUFBLGNBQUEsVUFBQTs7R0FFQSxRQUFBLFNBQUE7Ozs7QUM1RUE7O0FBRUEsUUFBQSxPQUFBLDZDQUFBOztDQUVBLFVBQUEsMkJBQUEsU0FBQSxTQUFBO0NBQ0EsT0FBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsTUFBQSxTQUFBLE9BQUEsVUFBQSxRQUFBOztHQUVBLFNBQUEsUUFBQTtJQUNBLElBQUEsSUFBQSxRQUFBLFFBQUEsU0FBQSx1QkFBQTtJQUNBLElBQUEsS0FBQSxRQUFBO0lBQ0EsSUFBQSxLQUFBLFFBQUE7SUFDQSxJQUFBLFFBQUE7O0lBRUEsUUFBQSxRQUFBLEdBQUEsU0FBQSxPQUFBO0tBQ0EsSUFBQSxLQUFBLFFBQUEsUUFBQTtLQUNBLFNBQUEsTUFBQSxHQUFBLEtBQUEsZUFBQSxLQUFBO0tBQ0EsSUFBQSxTQUFBLEdBQUE7TUFDQSxVQUFBLEtBQUEsR0FBQSxHQUFBLGVBQUE7TUFDQSxJQUFBLFVBQUE7T0FDQSxHQUFBLElBQUEsV0FBQTs7Ozs7R0FLQSxRQUFBLFFBQUEsU0FBQSxLQUFBLFVBQUE7Ozs7O0FDM0JBOztBQUVBLFFBQUEsT0FBQSw2QkFBQTs7Q0FFQSxRQUFBLEtBQUEsVUFBQTtDQUNBLE9BQUEsT0FBQTtHQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLy8gRGVjbGFyZSBhcHAgbGV2ZWwgbW9kdWxlIHdoaWNoIGRlcGVuZHMgb24gdmlld3MsIGFuZCBjb21wb25lbnRzXG5hbmd1bGFyLm1vZHVsZSgnd29ybGRjdXAnLCBbXG5cdCduZ1JvdXRlJyxcblx0J3dvcmxkY3VwLmhvbWUnLFxuXHQnd29ybGRjdXAuZ3JvdXAnLFxuXHQnd29ybGRjdXAudXRpbHMnLFxuXHQnd29ybGRjdXAuc2Nyb2xsRmFkZXInXG5dKS5cbmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcblx0JHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKHtcblx0XHRyZWRpcmVjdFRvOiAnL2hvbWUnXG5cdH0pO1xufV0pOyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ3dvcmxkY3VwLmdyb3VwJywgW1xuICAnd29ybGRjdXAuZ3JvdXAuZ3JvdXBEaXJlY3RpdmUnXG5dKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ3dvcmxkY3VwLnByb3ZpZGVycycsIFtcblx0J3dvcmxkY3VwLnByb3ZpZGVycy53b3JsZEN1cFByb3ZpZGVyJ1xuXSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnd29ybGRjdXAuc2Nyb2xsRmFkZXInLCBbXG4gICd3b3JsZGN1cC5zY3JvbGxGYWRlci5zY3JvbGxGYWRlckRpcmVjdGl2ZSdcbl0pOyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ3dvcmxkY3VwLnV0aWxzJywgW1xuICAnd29ybGRjdXAudXRpbHMudW5kZXJzY29yZSdcbl0pOyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ3dvcmxkY3VwLmhvbWUnLCBbJ25nUm91dGUnLCAnY2hhcnQuanMnLCAnbmdBY3Rpdml0eUluZGljYXRvcicsICd3b3JsZGN1cC5wcm92aWRlcnMnXSlcblxuLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcblx0JHJvdXRlUHJvdmlkZXIud2hlbignL2hvbWUnLCB7XG5cdFx0dGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2hvbWUvaG9tZS5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnSG9tZUN0cmwnXG5cdH0pO1xufV0pXG5cbi5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgd29ybGRDdXBQcm92aWRlciwgXywgJGFjdGl2aXR5SW5kaWNhdG9yKSB7XG5cdCRhY3Rpdml0eUluZGljYXRvci5zdGFydEFuaW1hdGluZygpO1xuXHRcblx0d29ybGRDdXBQcm92aWRlci5ncm91cFJlc3VsdHMoKS50aGVuKGZ1bmN0aW9uKGdyb3Vwcykge1xuXHRcdF8uZWFjaChncm91cHMsIGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdC8vY29sbGVjdCBkYXRhIGZvciBjaGFydHNcblx0XHRcdGl0ZW0uZ3JvdXAuY2hhcnQgPSBfLm1hcChpdGVtLmdyb3VwLnRlYW1zLCBmdW5jdGlvbihwKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dmFsdWU6IHAudGVhbS5wb2ludHMsXG5cdFx0XHRcdFx0bGFiZWw6IHAudGVhbS5jb3VudHJ5XG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHRcdGl0ZW0uZ3JvdXAuZGF0YSA9IF8ucGx1Y2soaXRlbS5ncm91cC5jaGFydCwgJ3ZhbHVlJyk7XG5cdFx0XHRpdGVtLmdyb3VwLmxhYmVscyA9IF8ucGx1Y2soaXRlbS5ncm91cC5jaGFydCwgJ2xhYmVsJyk7XG5cdFx0XHRpdGVtLmdyb3VwLmNvbG9yID0gXy5maW5kKHdvcmxkQ3VwUHJvdmlkZXIuZ3JvdXBzKCksIGZ1bmN0aW9uKHApIHtcblx0XHRcdFx0cmV0dXJuIHAubGV0dGVyID09PSBpdGVtLmdyb3VwLmxldHRlcjtcblx0XHRcdH0pLmNvbG9yO1xuXHRcdH0pO1xuXG5cdFx0JHNjb3BlLmdyb3VwcyA9IGdyb3Vwcztcblx0XHQkYWN0aXZpdHlJbmRpY2F0b3Iuc3RvcEFuaW1hdGluZygpO1xuXHR9KTtcblxuXG5cdC8vcHJlbG9hZFxuXHQkc2NvcGUuZ3JvdXBzID0gXy5tYXAod29ybGRDdXBQcm92aWRlci5ncm91cHMoKSwgZnVuY3Rpb24oZ3JvdXApIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Z3JvdXA6IHtcblx0XHRcdFx0bGV0dGVyOiBncm91cC5sZXR0ZXIsXG5cdFx0XHRcdGNvbG9yOiBncm91cC5jb2xvcixcblx0XHRcdFx0dGVhbXM6IFtdXG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ3dvcmxkY3VwLmdyb3VwLmdyb3VwRGlyZWN0aXZlJywgW10pXG5cbi5kaXJlY3RpdmUoJ2dyb3VwJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICB0ZWFtczogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2hhcmVkL2dyb3VwL2dyb3VwVmlldy5odG1sJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGlFbGVtZW50LCBpQXR0cnMpIHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfTtcbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ3dvcmxkY3VwLnByb3ZpZGVycy53b3JsZEN1cFByb3ZpZGVyJywgW10pXG5cbi5zZXJ2aWNlKFwid29ybGRDdXBQcm92aWRlclwiLFxuXHRmdW5jdGlvbigkaHR0cCwgJHEpIHtcblx0XHRyZXR1cm4gKHtcblx0XHRcdGdyb3VwUmVzdWx0czogZ3JvdXBSZXN1bHRzLFxuXHRcdFx0Z3JvdXBzOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIFt7XG5cdFx0XHRcdFx0bGV0dGVyOiAnQScsXG5cdFx0XHRcdFx0Y29sb3I6ICdyZWQnXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRsZXR0ZXI6ICdCJyxcblx0XHRcdFx0XHRjb2xvcjogJ3BpbmsnXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRsZXR0ZXI6ICdDJyxcblx0XHRcdFx0XHRjb2xvcjogJ3llbGxvdydcblx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdGxldHRlcjogJ0QnLFxuXHRcdFx0XHRcdGNvbG9yOiAnZ3JlZW4nXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRsZXR0ZXI6ICdFJyxcblx0XHRcdFx0XHRjb2xvcjogJ2JsdWUnXG5cdFx0XHRcdH0sIHtcblx0XHRcdFx0XHRsZXR0ZXI6ICdGJyxcblx0XHRcdFx0XHRjb2xvcjogJ3B1cnBsZSdcblx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdGxldHRlcjogJ0cnLFxuXHRcdFx0XHRcdGNvbG9yOiAnY2FybWluZSdcblx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdGxldHRlcjogJ0gnLFxuXHRcdFx0XHRcdGNvbG9yOiAnb3JhbmdlJ1xuXHRcdFx0XHR9XTtcblxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZnVuY3Rpb24gZ3JvdXBSZXN1bHRzKCkge1xuXG5cdFx0XHR2YXIgcmVxdWVzdCA9ICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiBcImdldFwiLFxuXHRcdFx0XHR1cmw6IFwiaHR0cDovL3dvcmxkY3VwLnNmZy5pby90ZWFtcy9ncm91cF9yZXN1bHRzXCIsXG5cdFx0XHRcdHBhcmFtczoge1xuXHRcdFx0XHRcdGFjdGlvbjogXCJnZXRcIlxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIChyZXF1ZXN0LnRoZW4oaGFuZGxlU3VjY2VzcywgaGFuZGxlRXJyb3IpKTtcblxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGhhbmRsZUVycm9yKHJlc3BvbnNlKSB7XG5cblx0XHRcdC8vIFRoZSBBUEkgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIHNob3VsZCBiZSByZXR1cm5lZCBpbiBhXG5cdFx0XHQvLyBub21yYWxpemVkIGZvcm1hdC4gSG93ZXZlciwgaWYgdGhlIHJlcXVlc3Qgd2FzIG5vdCBoYW5kbGVkIGJ5IHRoZVxuXHRcdFx0Ly8gc2VydmVyIChvciB3aGF0IG5vdCBoYW5kbGVzIHByb3Blcmx5IC0gZXguIHNlcnZlciBlcnJvciksIHRoZW4gd2Vcblx0XHRcdC8vIG1heSBoYXZlIHRvIG5vcm1hbGl6ZSBpdCBvbiBvdXIgZW5kLCBhcyBiZXN0IHdlIGNhbi5cblx0XHRcdGlmICghYW5ndWxhci5pc09iamVjdChyZXNwb25zZS5kYXRhKSB8fFxuXHRcdFx0XHQhcmVzcG9uc2UuZGF0YS5tZXNzYWdlXG5cdFx0XHQpIHtcblxuXHRcdFx0XHRyZXR1cm4gKCRxLnJlamVjdChcIkFuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuXCIpKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBPdGhlcndpc2UsIHVzZSBleHBlY3RlZCBlcnJvciBtZXNzYWdlLlxuXHRcdFx0cmV0dXJuICgkcS5yZWplY3QocmVzcG9uc2UuZGF0YS5tZXNzYWdlKSk7XG5cblx0XHR9XG5cblxuXHRcdC8vIEkgdHJhbnNmb3JtIHRoZSBzdWNjZXNzZnVsIHJlc3BvbnNlLCB1bndyYXBwaW5nIHRoZSBhcHBsaWNhdGlvbiBkYXRhXG5cdFx0Ly8gZnJvbSB0aGUgQVBJIHJlc3BvbnNlIHBheWxvYWQuXG5cdFx0ZnVuY3Rpb24gaGFuZGxlU3VjY2VzcyhyZXNwb25zZSkge1xuXG5cdFx0XHRyZXR1cm4gKHJlc3BvbnNlLmRhdGEpO1xuXG5cdFx0fVxuXHR9KTsiLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCd3b3JsZGN1cC5zY3JvbGxGYWRlci5zY3JvbGxGYWRlckRpcmVjdGl2ZScsIFtdKVxuXG4uZGlyZWN0aXZlKCdzY3JvbGxGYWRlcicsIGZ1bmN0aW9uKCR3aW5kb3cpIHtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0EnLFxuXHRcdHNjb3BlOiB7fSxcblx0XHRsaW5rOiBmdW5jdGlvbihzY29wZSwgaUVsZW1lbnQsIGlBdHRycykge1xuXG5cdFx0XHRmdW5jdGlvbiBmYWRlcigpIHtcblx0XHRcdFx0dmFyIHIgPSBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYmx1cnJlZCcpKTtcblx0XHRcdFx0dmFyIHdoID0gJHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHRcdFx0dmFyIGR0ID0gJHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRcdFx0dmFyIGVsVmlldywgb3BhY2l0eTtcblxuXHRcdFx0XHRhbmd1bGFyLmZvckVhY2gociwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0XHR2YXIgZWwgPSBhbmd1bGFyLmVsZW1lbnQodmFsdWUpO1xuXHRcdFx0XHRcdGVsVmlldyA9IHdoIC0gKGVsLnByb3AoJ29mZnNldFRvcCcpIC0gZHQgKyAyMDApO1xuXHRcdFx0XHRcdGlmIChlbFZpZXcgPiAwKSB7IC8vIFRvcCBvZiBESVYgYWJvdmUgYm90dG9tIG9mIHdpbmRvdy5cblx0XHRcdFx0XHRcdG9wYWNpdHkgPSBkdCAvIGVsWzBdLm9mZnNldEhlaWdodCAqIDEuNTtcblx0XHRcdFx0XHRcdGlmIChvcGFjaXR5IDwgMSkgLy8gQm90dG9tIG9mIERJViBiZWxvdyB0b3Agb2Ygd2luZG93LlxuXHRcdFx0XHRcdFx0XHRlbC5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRhbmd1bGFyLmVsZW1lbnQoJHdpbmRvdykuYmluZCgnc2Nyb2xsJywgZmFkZXIpO1xuXG5cdFx0fVxuXHR9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnd29ybGRjdXAudXRpbHMudW5kZXJzY29yZScsIFtdKVxuXG4uZmFjdG9yeSgnXycsIGZ1bmN0aW9uKCl7XG5cdHJldHVybiB3aW5kb3cuXztcbn0pOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==