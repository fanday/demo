(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('CaptchaDialogController', CaptchaDialogController);

    CaptchaDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Captcha'];

    function CaptchaDialogController ($scope, $stateParams, $uibModalInstance, entity, Captcha) {
        var vm = this;
        vm.captcha = entity;
        vm.load = function(id) {
            Captcha.get({id : id}, function(result) {
                vm.captcha = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('demoApp:captchaUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.captcha.id !== null) {
                Captcha.update(vm.captcha, onSaveSuccess, onSaveError);
            } else {
                Captcha.save(vm.captcha, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.createDate = false;
        vm.datePickerOpenStatus.modifyDate = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
