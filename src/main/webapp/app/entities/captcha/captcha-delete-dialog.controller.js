(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('CaptchaDeleteController',CaptchaDeleteController);

    CaptchaDeleteController.$inject = ['$uibModalInstance', 'entity', 'Captcha'];

    function CaptchaDeleteController($uibModalInstance, entity, Captcha) {
        var vm = this;
        vm.captcha = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Captcha.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
