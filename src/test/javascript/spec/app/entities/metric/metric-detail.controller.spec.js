'use strict';

describe('Controller Tests', function() {

    describe('Metric Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockMetric, MockGoal, MockEntry;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockMetric = jasmine.createSpy('MockMetric');
            MockGoal = jasmine.createSpy('MockGoal');
            MockEntry = jasmine.createSpy('MockEntry');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Metric': MockMetric,
                'Goal': MockGoal,
                'Entry': MockEntry
            };
            createController = function() {
                $injector.get('$controller')("MetricDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'demoApp:metricUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
