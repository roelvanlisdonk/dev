var poc;
(function (poc) {
    'use strict';
    var CarouselDirective = (function () {
        function CarouselDirective() {
            this.restrict = 'EA';
            this.template = "\n<div class=\"carousel\">\n    Test\n</div>";
            var self = this;
            self.link = self.unboundLink.bind(self);
        }
        CarouselDirective.prototype.unboundLink = function ($scope, $element, attrs) {
            var self = this;
        };
        return CarouselDirective;
    }());
    angular.module('poc').directive('carousel', [function () { return new CarouselDirective(); }]);
})(poc || (poc = {}));
//# sourceMappingURL=carousel.js.map