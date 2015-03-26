'use strict';

angular.module('worldcup.providers.worldCupProvider', [])

.service("worldCupProvider",
	function($http, $q) {
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
	});