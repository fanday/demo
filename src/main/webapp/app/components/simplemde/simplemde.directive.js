(function() {
  'use strict';
  angular
    .module('demoApp')
    .directive('fndMde', function($timeout) {
      return {
        restrict: 'E',
        transclude: true,
        require: '?ngModel',
        scope: {},
        template: '<div class="mde-content"><textarea></textarea></div>',
        link: function(scope, element, attrs, ngModelCtrl) {//https://www.nadeau.tv/using-ngmodelcontroller-with-custom-directives/
          console.log("simplemde");
          var simplemde = new SimpleMDE();
          $timeout(function() {
                    var value = ngModelCtrl.$viewValue;
                    simplemde.value(value);
                }, 0);

          simplemde.codemirror.on("change", function(){
              console.log(simplemde.value());
              ngModelCtrl.$setViewValue(simplemde.value());
              scope.$apply();
          });
          scope.modelValue = function () {
                console.log('modelvalue - ' + ngModelCtrl.$viewValue);
                return ngModelCtrl.$viewValue;
            };
        }
      };
    });
})();
