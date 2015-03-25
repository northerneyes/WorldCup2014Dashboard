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