(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MetricController', MetricController);

    MetricController.$inject = ['$scope', '$state', 'Metric'];

    function MetricController ($scope, $state, Metric) {
        var vm = this;
        vm.metrics = [];
        vm.loadAll = function() {
            Metric.query(function(result) {
                vm.metrics = result;
            });
        };

        vm.loadAll();
        
    }
})();
