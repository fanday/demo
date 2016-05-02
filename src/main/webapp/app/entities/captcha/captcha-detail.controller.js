(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('CaptchaDetailController', CaptchaDetailController);

    CaptchaDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Captcha'];

    function CaptchaDetailController($scope, $rootScope, $stateParams, entity, Captcha) {
        var vm = this;
        vm.captcha = entity;
        vm.load = function (id) {
            Captcha.get({id: id}, function(result) {
                vm.captcha = result;
            });
        };
        var unsubscribe = $rootScope.$on('demoApp:captchaUpdate', function(event, result) {
            vm.captcha = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
