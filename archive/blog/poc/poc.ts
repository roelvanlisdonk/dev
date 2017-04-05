namespace poc {

    const mod = angular.module("poc", []);

    class PocController {
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery){
            
            const element = $element[0];
            const taakIdElement = element.querySelector('input[name="taakId"]');
            const a = taakIdElement;
            const b = a;
            const c = b;
        }
    }
    mod.controller("PocController", ["$scope", "$element", PocController]);
}