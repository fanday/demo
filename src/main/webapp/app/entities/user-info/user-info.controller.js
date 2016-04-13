(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['$scope', '$state', 'UserInfo'];

    function UserInfoController ($scope, $state, UserInfo) {
        var vm = this;
        vm.userInfos = [];
        vm.loadAll = function() {
            UserInfo.query(function(result) {
                vm.userInfos = result;
            });
        };

        vm.loadAll();
        
    }
})();
