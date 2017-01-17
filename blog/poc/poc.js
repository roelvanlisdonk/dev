var poc;
(function (poc) {
    var mod = angular.module("poc", []);
    var PocController = (function () {
        function PocController($scope, $element) {
            var element = $element[0];
            var taakIdElement = element.querySelector('input[name="taakId"]');
            var a = taakIdElement;
            var b = a;
            var c = b;
        }
        return PocController;
    }());
    mod.controller("PocController", ["$scope", "$element", PocController]);
})(poc || (poc = {}));
//# sourceMappingURL=poc.js.map