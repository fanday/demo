(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MetricDetailController', MetricDetailController);

    MetricDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Metric', 'Goal', 'Entry'];

    function MetricDetailController($scope, $rootScope, $stateParams, entity, Metric, Goal, Entry) {
        var vm = this;
        vm.metric = entity;
        vm.load = function (id) {
            Metric.get({id: id}, function(result) {
                vm.metric = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:metricUpdate', function(event, result) {
            vm.metric = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
