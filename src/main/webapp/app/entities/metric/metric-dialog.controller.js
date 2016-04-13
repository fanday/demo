(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MetricDialogController', MetricDialogController);

    MetricDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Metric', 'Goal', 'Entry'];

    function MetricDialogController ($scope, $stateParams, $uibModalInstance, entity, Metric, Goal, Entry) {
        var vm = this;
        vm.metric = entity;
        vm.goals = Goal.query();
        vm.entrys = Entry.query();
        vm.load = function(id) {
            Metric.get({id : id}, function(result) {
                vm.metric = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('demoApp:metricUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.metric.id !== null) {
                Metric.update(vm.metric, onSaveSuccess, onSaveError);
            } else {
                Metric.save(vm.metric, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
