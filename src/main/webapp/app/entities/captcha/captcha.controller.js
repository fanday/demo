(function() {
    'use strict';

    angular
        .module('demoApp')
        .controller('CaptchaController', CaptchaController);

    CaptchaController.$inject = ['$scope', '$state', 'Captcha'];

    function CaptchaController ($scope, $state, Captcha) {
        var vm = this;
        vm.captchas = [];
        vm.loadAll = function() {
            Captcha.query(function(result) {
                vm.captchas = result;
            });
        };

        vm.loadAll();
        
    }
})();
