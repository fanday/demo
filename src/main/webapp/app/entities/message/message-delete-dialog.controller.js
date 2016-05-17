(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MessageDeleteController',MessageDeleteController);

    MessageDeleteController.$inject = ['$uibModalInstance', 'entity', 'Message'];

    function MessageDeleteController($uibModalInstance, entity, Message) {
        var vm = this;
        vm.message = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Message.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
