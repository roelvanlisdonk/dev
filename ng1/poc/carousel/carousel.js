var poc;
(function (poc) {
    'use strict';
    var CarouselDirective = (function () {
        function CarouselDirective() {
            this.restrict = 'EA';
            this.scope = {
                options: '=?carousel'
            };
            this.template = "\n<div class=\"carousel\">\n    <button type=\"button\" class=\"previous\" ng-click=\"onPreviousClick()\">\n        <i>&lt;</i>\n    </button>\n    <div class=\"slide\"></div>\n    <div class=\"pager\">\n        <button type=\"button\" \n                class=\"item\"\n                title=\"item.title\"\n                ng-click=\"onPagerItemClick()\"\n                ng-repeat=\"item in options.items\">\n            <i>.</i>\n        </button>\n    </div>\n    <button type=\"button\" class=\"next\" ng-click=\"onPagerItemClick()\">\n        <i>&gt;</i>\n    </button>\n</div>";
            var self = this;
            self.link = self.unboundLink.bind(self);
        }
        CarouselDirective.prototype.unboundLink = function ($scope, $element, attrs) {
            var self = this;
            $scope.onNextClick = onNextClick;
            $scope.onPagerItemClick = onPagerItemClick;
            $scope.onPreviousClick = onPreviousClick;
            if (!$scope.options) {
                $scope.options = getStubOptions();
            }
            function onNextClick() {
                throw new Error('Not implemented!');
            }
            function onPagerItemClick() {
                throw new Error('Not implemented!');
            }
            function onPreviousClick() {
                throw new Error('Not implemented!');
            }
        };
        return CarouselDirective;
    }());
    function getStubOptions() {
        var options = {
            currentItemIndex: 0,
            items: [
                { title: 'title 1' },
                { title: 'title 2' },
                { title: 'title 3' }
            ]
        };
        return options;
    }
    angular.module('poc').directive('carousel', [function () { return new CarouselDirective(); }]);
})(poc || (poc = {}));
//# sourceMappingURL=carousel.js.map