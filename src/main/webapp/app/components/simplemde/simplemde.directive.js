(function() {
  'use strict';
  angular
    .module('demoApp')
    .controller('fndController', ['$scope', function($scope) {
      $scope.value = 'Hello';
    }])
    .directive('fndMde', function() {
      return {
        restrict: 'E',
        transclude: true,
        scope: {},
        template: '<textarea></textarea>',
        link: function(scope, element) {
          console.log("simplemde");
          var simplemde = new SimpleMDE();
          //Todo Get and update editor value
        }
      };
    });
})();
