(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('CityDeleteController',CityDeleteController);

    CityDeleteController.$inject = ['$uibModalInstance', 'entity', 'City'];

    function CityDeleteController($uibModalInstance, entity, City) {
        var vm = this;
        vm.city = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            City.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
