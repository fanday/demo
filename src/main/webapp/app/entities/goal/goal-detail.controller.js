(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('GoalDetailController', GoalDetailController);

    GoalDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Goal', 'UserInfo', 'Metric'];

    function GoalDetailController($scope, $rootScope, $stateParams, entity, Goal, UserInfo, Metric) {
        var vm = this;
        vm.goal = entity;
        vm.load = function (id) {
            Goal.get({id: id}, function(result) {
                vm.goal = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:goalUpdate', function(event, result) {
            vm.goal = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
