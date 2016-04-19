(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('ProvinceDialogController', ProvinceDialogController);

    ProvinceDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Province'];

    function ProvinceDialogController ($scope, $stateParams, $uibModalInstance, entity, Province) {
        var vm = this;
        vm.province = entity;
        vm.load = function(id) {
            Province.get({id : id}, function(result) {
                vm.province = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('demoApp:provinceUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.province.id !== null) {
                Province.update(vm.province, onSaveSuccess, onSaveError);
            } else {
                Province.save(vm.province, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
