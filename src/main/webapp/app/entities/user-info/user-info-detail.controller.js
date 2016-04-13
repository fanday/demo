(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('UserInfoDetailController', UserInfoDetailController);

    UserInfoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'UserInfo'];

    function UserInfoDetailController($scope, $rootScope, $stateParams, entity, UserInfo) {
        var vm = this;
        vm.userInfo = entity;
        vm.load = function (id) {
            UserInfo.get({id: id}, function(result) {
                vm.userInfo = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:userInfoUpdate', function(event, result) {
            vm.userInfo = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
