'use strict';

angular.module('worldcup.scrollFader.scrollFaderDirective', [])

.directive('scrollFader', function($window) {
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
});