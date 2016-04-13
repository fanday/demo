(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('EntryDetailController', EntryDetailController);

    EntryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Entry', 'Goal'];

    function EntryDetailController($scope, $rootScope, $stateParams, entity, Entry, Goal) {
        var vm = this;
        vm.entry = entity;
        vm.load = function (id) {
            Entry.get({id: id}, function(result) {
                vm.entry = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:entryUpdate', function(event, result) {
            vm.entry = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
