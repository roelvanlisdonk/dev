var poc;
(function (poc) {
    'use strict';
    var _slideWidth = 1000;
    angular.module('poc').directive('carousel', [function () { return new CarouselDirective(); }]);
    var CarouselDirective = (function () {
        function CarouselDirective() {
            this.restrict = 'EA';
            this.scope = {
                options: '=?carousel'
            };
            this.templateUrl = '/ng1/poc/carousel/carousel.html';
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
            setTransform(0);
            setSlidesWidth();
            function setSlidesWidth() {
                $scope.slidesWidth = $scope.options.items.length * _slideWidth + "px";
            }
            function onNextClick() {
                var total = $scope.options.items.length;
                if (total === 0) {
                    return;
                }
                var current = $scope.options.currentItemIndex || 0;
                var next = current + 1;
                if (next === total) {
                    next = 0;
                }
                $scope.options.currentItemIndex = next;
                setTransform(0 - ($scope.options.currentItemIndex * _slideWidth));
            }
            function onPagerItemClick(index) {
                $scope.options.currentItemIndex = index;
                setTransform(0 - ($scope.options.currentItemIndex * _slideWidth));
            }
            function onPreviousClick() {
                var total = $scope.options.items.length;
                if (total === 0) {
                    return;
                }
                var current = $scope.options.currentItemIndex || 0;
                var previous = current - 1;
                if (previous < 0) {
                    previous = total - 1;
                }
                $scope.options.currentItemIndex = previous;
                setTransform(0 - ($scope.options.currentItemIndex * _slideWidth));
            }
            function setTransform(offSet) {
                $scope.transform = "translateX(" + offSet + "px)";
            }
        };
        return CarouselDirective;
    }());
    function getStubOptions() {
        var options = {
            currentItemIndex: 0,
            items: [
                { title: 'title 1', background: 'url(/App/Core/Directives/Carousel/img1_small.png)' },
                { title: 'title 2', background: 'url(/App/Core/Directives/Carousel/img2_small.png)' },
                { title: 'title 3', background: 'url(/App/Core/Directives/Carousel/img3_small.png)' }
            ]
        };
        return options;
    }
})(poc || (poc = {}));
//# sourceMappingURL=carousel.js.map