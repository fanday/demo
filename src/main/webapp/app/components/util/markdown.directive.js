(function() {
    'use strict';

    angular
        .module('demoApp')
        .directive('fndMarkdown', function($sanitize) {
            var converter = new showdown.Converter();
            return {
                restrict: 'AE',
                link: function(scope, element, attrs) {
                    if (attrs.fndMarkdown) {
                        scope.$watch(attrs.fndMarkdown, function(newVal) {
                            var html = newVal ? $sanitize(converter.makeHtml(newVal)) : '';
                            element.html(html);
                        });
                    } else {
                        var html = $sanitize(converter.makeHtml(element.text()));
                        element.html(html);
                    }
                }
            };
        });
})();
