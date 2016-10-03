var poc;
(function (poc) {
    'use strict';
    var app = angular.module('poc', []);
    var PocDirective = (function () {
        function PocDirective($timeout) {
            this.$timeout = $timeout;
            this.restrict = 'E';
            this.template = "<action-button>\n            <button id=\"button-1\" type=\"button\">Tab on this button</button>\n        </action-button>\n        <action-button>\n            <button poc-tab=\"{ fn: onTab }\" type=\"button\">Tab on this button</button>\n        </action-button>\n        <div ng-bind=\"message\"></div>";
            var self = this;
            self.link = self.unboundLink.bind(self);
        }
        PocDirective.prototype.unboundLink = function ($scope, $element, attrs) {
            var self = this;
            function onTab() {
                $scope.message = "Tabbed on button";
            }
            self.$timeout(function () {
                var button1 = document.getElementById('button-1');
                button1.focus();
            });
            $scope.onTab = onTab;
        };
        return PocDirective;
    }());
    app.directive('poc', ['$timeout', function ($timeout) { return new PocDirective($timeout); }]);
    function safeApply($scope) {
        var result = false;
        var phase = $scope.$root.$$phase;
        if (phase !== '$apply' && phase !== '$digest') {
            $scope.$apply();
            result = true;
        }
        return result;
    }
    var TabDirective = (function () {
        function TabDirective($parse) {
            this.$parse = $parse;
            this.restrict = 'A';
            var self = this;
            self.link = self.unboundLink.bind(self);
        }
        TabDirective.prototype.unboundLink = function (scope, element, attrs) {
            var self = this;
            element.bind('keydown keypress', function (event) {
                var tabKey = 9;
                var tabIsPressed = (event.which === tabKey);
                if (tabIsPressed) {
                    var optionsAsString = attrs.pocTab;
                    var optionsAsExpression = self.$parse(optionsAsString);
                    var options = optionsAsExpression(scope);
                    options.fn();
                    safeApply(scope);
                    event.preventDefault();
                }
            });
        };
        return TabDirective;
    }());
    app.directive('pocTab', ['$parse', function ($parse) { return new TabDirective($parse); }]);
    angular.bootstrap(document, ['poc']);
})(poc || (poc = {}));
//# sourceMappingURL=app.js.map