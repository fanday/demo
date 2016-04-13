(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('GoalDeleteController',GoalDeleteController);

    GoalDeleteController.$inject = ['$uibModalInstance', 'entity', 'Goal'];

    function GoalDeleteController($uibModalInstance, entity, Goal) {
        var vm = this;
        vm.goal = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Goal.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
