(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('MessageDetailController', MessageDetailController);

    MessageDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Message'];

    function MessageDetailController($scope, $rootScope, $stateParams, entity, Message) {
        var vm = this;
        vm.message = entity;
        vm.load = function (id) {
            Message.get({id: id}, function(result) {
                vm.message = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:messageUpdate', function(event, result) {
            vm.message = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
