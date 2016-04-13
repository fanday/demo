(function() {
    'use strict';
    angular
        .module('demoApp')
        .factory('Goal', Goal);

    Goal.$inject = ['$resource'];

    function Goal ($resource) {
        var resourceUrl =  'api/goals/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
