(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MessageController', MessageController);

    MessageController.$inject = ['$scope', '$state', 'Message'];

    function MessageController ($scope, $state, Message) {
        var vm = this;
        vm.messages = [];
        vm.loadAll = function() {
            Message.query(function(result) {
                vm.messages = result;
            });
        };

        vm.loadAll();
        
    }
})();
