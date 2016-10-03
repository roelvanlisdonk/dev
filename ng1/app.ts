namespace poc {
    'use strict';
        
    const app = angular.module('poc', []);

    class PocDirective implements ng.IDirective {
        public link: ($scope: IPocScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public restrict = 'E';
        public template = `<action-button>
            <button id="button-1" type="button">Tab on this button</button>
        </action-button>
        <action-button>
            <button poc-tab="{ fn: onTab }" type="button">Tab on this button</button>
        </action-button>
        <div ng-bind="message"></div>`;

        constructor(public $timeout:ng.ITimeoutService) {
            const self: PocDirective = this;
            
            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: IPocScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: PocDirective = this;

            function onTab(){
                $scope.message = "Tabbed on button";
            }
                   
            self.$timeout(function() {
               const button1 = document.getElementById('button-1');
               button1.focus();
            });

            $scope.onTab = onTab;
        }
    }

    interface IPocScope extends ng.IScope {
        message: string;
        onTab: () => void;
    }

    app.directive('poc', ['$timeout', ($timeout) => new PocDirective($timeout)]);

    function safeApply($scope: ng.IScope): boolean {
        var result = false;

        var phase = $scope.$root.$$phase;
        if (phase !== '$apply' && phase !== '$digest') {
            $scope.$apply();
            result = true;
        }

        return result;
    }

    /**
     * We want to able to use this directive in association with other directives on the same element.
     * So we don't use isolated scope, to prevent the error:
     *      "Multiple directives [..., ...] asking for new/isolated scope on: ...".
     * But we want to be able to pass a function to this directive from outside, 
     * thats why we parse the value of the "poc-tab" attribute.
     */
    class TabDirective implements ng.IDirective {
        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ITabAttributes) => void;
        public restrict = 'A';

        constructor(public $parse: ng.IParseService) {
            const self: TabDirective = this;

            self.link = self.unboundLink.bind(self);
        }

        unboundLink(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ITabAttributes) {
            const self: TabDirective = this;
            
            element.bind('keydown keypress', function (event) {
                const tabKey = 9;
                const tabIsPressed = (event.which === tabKey); 
                if (tabIsPressed) {
                    const optionsAsString: string = attrs.pocTab;
                    const optionsAsExpression: ng.ICompiledExpression = self.$parse(optionsAsString);
                    const options: ITabOptions = optionsAsExpression(scope);

                    options.fn();
                    safeApply(scope);
                    event.preventDefault();
                }
            });
        }
    }

    interface ITabAttributes extends ng.IAttributes {
        pocTab: string;
    }

    export interface ITabOptions {
        fn: () => void;
        ignore?: boolean; // When true, given fn is NOT executed.
    }

    app.directive('pocTab', ['$parse', ($parse) => new TabDirective($parse)]);
    
    angular.bootstrap(document, ['poc']);
}