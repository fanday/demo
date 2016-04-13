(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('UserInfoDialogController', UserInfoDialogController);

    UserInfoDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'UserInfo'];

    function UserInfoDialogController ($scope, $stateParams, $uibModalInstance, entity, UserInfo) {
        var vm = this;
        vm.userInfo = entity;
        vm.load = function(id) {
            UserInfo.get({id : id}, function(result) {
                vm.userInfo = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('demoApp:userInfoUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.userInfo.id !== null) {
                UserInfo.update(vm.userInfo, onSaveSuccess, onSaveError);
            } else {
                UserInfo.save(vm.userInfo, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
