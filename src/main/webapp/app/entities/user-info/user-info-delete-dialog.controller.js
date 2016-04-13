(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('UserInfoDeleteController',UserInfoDeleteController);

    UserInfoDeleteController.$inject = ['$uibModalInstance', 'entity', 'UserInfo'];

    function UserInfoDeleteController($uibModalInstance, entity, UserInfo) {
        var vm = this;
        vm.userInfo = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            UserInfo.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
