(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MetricDeleteController',MetricDeleteController);

    MetricDeleteController.$inject = ['$uibModalInstance', 'entity', 'Metric'];

    function MetricDeleteController($uibModalInstance, entity, Metric) {
        var vm = this;
        vm.metric = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Metric.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
