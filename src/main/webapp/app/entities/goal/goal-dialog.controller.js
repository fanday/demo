(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('GoalDialogController', GoalDialogController);

    GoalDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Goal', 'UserInfo', 'Metric'];

    function GoalDialogController ($scope, $stateParams, $uibModalInstance, entity, Goal, UserInfo, Metric) {
        var vm = this;
        vm.goal = entity;
        vm.userinfos = UserInfo.query();
        vm.metrics = Metric.query();
        vm.load = function(id) {
            Goal.get({id : id}, function(result) {
                vm.goal = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('demoApp:goalUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.goal.id !== null) {
                Goal.update(vm.goal, onSaveSuccess, onSaveError);
            } else {
                Goal.save(vm.goal, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
