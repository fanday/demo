(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MessageDialogController', MessageDialogController);

    MessageDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Message'];

    function MessageDialogController ($scope, $stateParams, $uibModalInstance, entity, Message) {
        var vm = this;
        vm.message = entity;
        vm.load = function(id) {
            Message.get({id : id}, function(result) {
                vm.message = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('demoApp:messageUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.message.id !== null) {
                Message.update(vm.message, onSaveSuccess, onSaveError);
            } else {
                Message.save(vm.message, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
