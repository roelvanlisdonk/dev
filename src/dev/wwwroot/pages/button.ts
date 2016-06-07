module dev {
    "use strict";

    // Register angular app.
    var appName = 'app';
    export var app = angular.module(appName, []);

    // Boot angular, when DOM is loaded.
    angular.element(document).ready(function () {
        angular.bootstrap(document, [appName]);
    });

    // Add a controller.
    app.controller('AppController', ['$scope', AppController]);
    function AppController($scope: AppControllerScope) {
        $scope.startSpinner = startSpinner;
        $scope.stopSpinner = stopSpinner;

        function startSpinner() {
            $scope.spinnerVisible = true;
        }

        function stopSpinner() {
            $scope.spinnerVisible = false;
        }
    }
    interface AppControllerScope extends ng.IScope {
        spinnerVisible: boolean;
        startSpinner: () => void;
        stopSpinner: () => void;
    }



    // Add action button directive.
    app.directive("actionButton", [ActionButton]);

    function ActionButton() {
        
        var spinnerDefaults: SpinnerOptions = {
            lines: 13, // The number of lines to draw
            length: 6, // The length of each line
            width: 2, // The line thickness
            radius: 3, // The radius of the inner circle
            scale: 1, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            color: '#ffffff', // #rgb or #rrggbb or array of colors
            opacity: 0.3, // Opacity of the lines
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            className: 'spinner', // The CSS class to assign to the spinner
            top: '15px', // Top position relative to parent
            left: '18px', // Left position relative to parent
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            position: 'absolute' // Element positioning
        }
        var template = `<button class="button" type="button">
                            <div class="spinner"></div>{{options.text}}
                        </button>`;

        function link($scope: IActionButtonScope, $element: ng.IAugmentedJQuery) {

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

    interface IActionButtonScope extends ng.IScope {
        options: IActionButtonScopeOptions;
        spinner: Spinner;
    }

    interface IActionButtonScopeOptions {
        action: (evt?: any) => boolean;
        spinnerOptions: SpinnerOptions;
        spinnerVisible: boolean;
        text: string;
    }
}