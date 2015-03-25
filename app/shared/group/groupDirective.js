'use strict';

angular.module('worldcup.group.groupDirective', [])

.directive('group', function() {
    return {
        restrict: 'AE',
        scope: {
            value: '=ngModel'
        },
        templateUrl: 'group/groupView.html',
        link: function(scope, iElement, iAttrs) {
            scope.increment = function() {
                scope.value++;
            };

            scope.decrement = function() {
                scope.value--;
            };
        }
    };
});