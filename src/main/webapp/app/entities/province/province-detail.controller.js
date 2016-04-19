(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('ProvinceDetailController', ProvinceDetailController);

    ProvinceDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Province'];

    function ProvinceDetailController($scope, $rootScope, $stateParams, entity, Province) {
        var vm = this;
        vm.province = entity;
        vm.load = function (id) {
            Province.get({id: id}, function(result) {
                vm.province = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:provinceUpdate', function(event, result) {
            vm.province = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
