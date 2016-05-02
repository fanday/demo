(function() {
    'use strict';
    angular
        .module('demoApp')
        .factory('Captcha', Captcha);

    Captcha.$inject = ['$resource', 'DateUtils'];

    function Captcha ($resource, DateUtils) {
        var resourceUrl =  'api/captchas/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.createDate = DateUtils.convertDateTimeFromServer(data.createDate);
                    data.modifyDate = DateUtils.convertDateTimeFromServer(data.modifyDate);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
