(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('CityDetailController', CityDetailController);

    CityDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'City', 'Province'];

    function CityDetailController($scope, $rootScope, $stateParams, entity, City, Province) {
        var vm = this;
        vm.city = entity;
        vm.load = function (id) {
            City.get({id: id}, function(result) {
                vm.city = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:cityUpdate', function(event, result) {
            vm.city = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
