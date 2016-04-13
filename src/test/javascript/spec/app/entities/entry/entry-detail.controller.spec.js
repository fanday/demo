'use strict';

describe('Controller Tests', function() {

    describe('Entry Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockEntry, MockGoal;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockEntry = jasmine.createSpy('MockEntry');
            MockGoal = jasmine.createSpy('MockGoal');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Entry': MockEntry,
                'Goal': MockGoal
            };
            createController = function() {
                $injector.get('$controller')("EntryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'demoApp:entryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
