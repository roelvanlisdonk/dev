var dev;
(function (dev) {
    "use strict";
    // Register angular app.
    var appName = 'app';
    dev.app = angular.module(appName, []);
    // Boot angular, when DOM is loaded.
    angular.element(document).ready(function () {
        angular.bootstrap(document, [appName]);
    });
    // Add a controller.
    dev.app.controller('AppController', ['$scope', AppController]);
    function AppController($scope) {
        $scope.startSpinner = startSpinner;
        $scope.stopSpinner = stopSpinner;
        function startSpinner() {
            $scope.spinnerVisible = true;
        }
        function stopSpinner() {
            $scope.spinnerVisible = false;
        }
    }
    // Add action button directive.
    dev.app.directive("actionButton", [ActionButton]);
    function ActionButton() {
        var spinnerDefaults = {
            lines: 13,
            length: 6,
            width: 2,
            radius: 3,
            scale: 1,
            corners: 1,
            color: '#ffffff',
            opacity: 0.3,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 20,
            zIndex: 2e9,
            className: 'spinner',
            top: '15px',
            left: '18px',
            shadow: false,
            hwaccel: false,
            position: 'absolute' // Element positioning
        };
        var template = "<button class=\"button\" type=\"button\">\n                            <div class=\"spinner\"></div>{{options.text}}\n                        </button>";
        function link($scope, $element) {
            $scope.$watch('options.spinnerVisible', watchForSpinnerVisibilityChange);
            function watchForSpinnerVisibilityChange(newValue, oldValue) {
                var shouldStartSpinner = (!oldValue && newValue === true);
                if (shouldStartSpinner) {
                    var element = $element.find(".spinner")[0];
                    var options = $.extend({}, spinnerDefaults, $scope.options.spinnerOptions);
                    var spinner = new Spinner(options);
                    $scope.spinner = spinner.spin(element);
                }
                var shouldStopSpinner = (oldValue === true && newValue === false);
                if (shouldStopSpinner) {
                    $scope.spinner.stop();
                }
            }
        }
        return {
            template: template,
            link: link,
            replace: true,
            scope: {
                options: "=actionButton"
            }
        };
    }
})(dev || (dev = {}));
//# sourceMappingURL=button.js.map