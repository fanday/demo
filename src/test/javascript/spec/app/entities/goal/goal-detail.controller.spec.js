'use strict';

describe('Controller Tests', function() {

    describe('Goal Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockGoal, MockUserInfo, MockMetric;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockGoal = jasmine.createSpy('MockGoal');
            MockUserInfo = jasmine.createSpy('MockUserInfo');
            MockMetric = jasmine.createSpy('MockMetric');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Goal': MockGoal,
                'UserInfo': MockUserInfo,
                'Metric': MockMetric
            };
            createController = function() {
                $injector.get('$controller')("GoalDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'demoApp:goalUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
