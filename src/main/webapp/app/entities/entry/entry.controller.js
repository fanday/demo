(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('EntryController', EntryController);

    EntryController.$inject = ['$scope', '$state', 'Entry'];

    function EntryController ($scope, $state, Entry) {
        var vm = this;
        vm.entries = [];
        vm.loadAll = function() {
            Entry.query(function(result) {
                vm.entries = result;
            });
        };

        vm.loadAll();
        
    }
})();
