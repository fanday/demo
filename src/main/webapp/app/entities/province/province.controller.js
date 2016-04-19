(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('ProvinceController', ProvinceController);

    ProvinceController.$inject = ['$scope', '$state', 'Province'];

    function ProvinceController ($scope, $state, Province) {
        var vm = this;
        vm.provinces = [];
        vm.loadAll = function() {
            Province.query(function(result) {
                vm.provinces = result;
            });
        };

        vm.loadAll();
        
    }
})();
