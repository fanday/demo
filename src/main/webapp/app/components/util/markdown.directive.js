(function() {
    'use strict';

    angular
        .module('demoApp')
        .directive('fndMarkdown', function() {
            var converter = new showdown.Converter();
            return {
                restrict: 'AE',
                link: function(scope, element, attrs) {
                    if (attrs.fndMarkdown) {
                        scope.$watch(attrs.fndMarkdown, function(newVal) {
                            var html = newVal ? converter.makeHtml(newVal) : '';
                            element.html(html);
                        });
                    } else {
                        var html = converter.makeHtml(element.text());
                        element.html(html);
                    }
                }
            };
        });
})();
