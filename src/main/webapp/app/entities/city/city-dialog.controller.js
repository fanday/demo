(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('CityDialogController', CityDialogController);

    CityDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'City', 'Province'];

    function CityDialogController ($scope, $stateParams, $uibModalInstance, entity, City, Province) {
        var vm = this;
        vm.city = entity;
        vm.provinces = Province.query();
        vm.load = function(id) {
            City.get({id : id}, function(result) {
                vm.city = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('demoApp:cityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.city.id !== null) {
                City.update(vm.city, onSaveSuccess, onSaveError);
            } else {
                City.save(vm.city, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
