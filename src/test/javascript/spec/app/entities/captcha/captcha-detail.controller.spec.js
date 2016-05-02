'use strict';

describe('Controller Tests', function() {

    describe('Captcha Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockCaptcha;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockCaptcha = jasmine.createSpy('MockCaptcha');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Captcha': MockCaptcha
            };
            createController = function() {
                $injector.get('$controller')("CaptchaDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'demoApp:captchaUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
