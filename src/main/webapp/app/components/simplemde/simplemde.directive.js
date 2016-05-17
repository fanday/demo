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
        require: '?ngModel',
        scope: {},
        template: '<textarea></textarea>',
        link: function(scope, element, attrs, ngModel) {
          console.log("simplemde");
          var simplemde = new SimpleMDE();
          //var value = ngModel.$viewValue
          //simplemde.value(value);
          simplemde.codemirror.on("change", function(){
              console.log(simplemde.value());
              ngModel.$setViewValue(simplemde.value());
              scope.$apply();
          });
          //Todo Get and update editor value
        }
      };
    });
})();
