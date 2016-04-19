(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('ProvinceDeleteController',ProvinceDeleteController);

    ProvinceDeleteController.$inject = ['$uibModalInstance', 'entity', 'Province'];

    function ProvinceDeleteController($uibModalInstance, entity, Province) {
        var vm = this;
        vm.province = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Province.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
