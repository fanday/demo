(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('GoalController', GoalController);

    GoalController.$inject = ['$scope', '$state', 'Goal'];

    function GoalController ($scope, $state, Goal) {
        var vm = this;
        vm.goals = [];
        vm.loadAll = function() {
            Goal.query(function(result) {
                vm.goals = result;
            });
        };

        vm.loadAll();
        
    }
})();
