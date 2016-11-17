var poc;
(function (poc) {
    'use strict';
    var _slideWidth = 1000;
    angular.module('poc').directive('carousel', ['$animate', '$timeout', function ($animate, $timeout) { return new CarouselDirective($animate, $timeout); }]);
    var CarouselDirective = (function () {
        function CarouselDirective($animate, $timeout) {
            this.$animate = $animate;
            this.$timeout = $timeout;
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
            var slidesJqueryElement = $element.find('.slides').first();
            $scope.onNextClick = onNextClick;
            $scope.onPagerItemClick = onPagerItemClick;
            $scope.onPreviousClick = onPreviousClick;
            if (!$scope.options) {
                $scope.options = getStubOptions();
            }
            var items = $scope.options.items;
            var slides = [];
            var totalItemCount = items.length;
            slides.unshift(items[totalItemCount - 1]);
            for (var i = 0, length_1 = totalItemCount; i < length_1; i++) {
                slides.push(items[i]);
            }
            slides.push(items[0]);
            $scope.slides = slides;
            $scope.currentPagerItemIndex = 0;
            $scope.currentSlideIndex = 1;
            setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
            setSlidesWidth();
            self.$animate.addClass(slidesJqueryElement, 'transition');
            function setSlidesWidth() {
                $scope.slidesWidth = $scope.slides.length * _slideWidth + "px";
            }
            function onNextClick() {
                var total = $scope.slides.length;
                if (total === 0) {
                    return;
                }
                var current = $scope.currentSlideIndex;
                var next = current + 1;
                if (next === total) {
                    next = 0;
                }
                $scope.currentSlideIndex = next;
                $scope.currentPagerItemIndex = next + 1;
                setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
            }
            function onPagerItemClick(index) {
                $scope.currentPagerItemIndex = index;
                $scope.currentSlideIndex = index + 1;
                setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
            }
            function onPreviousClick() {
                var total = $scope.slides.length;
                if (total === 0) {
                    return;
                }
                var current = $scope.currentSlideIndex;
                if (current === 0) {
                    self.$animate.removeClass(slidesJqueryElement, 'transition')
                        .then(function () {
                        return self.$animate.addClass(slidesJqueryElement, 'no-transition');
                    })
                        .then(function () {
                        var offset = 0 - ((total - 2) * _slideWidth);
                        $scope.transform = "translateX(" + offset + "px)";
                        slidesJqueryElement.removeClass('no-transition');
                    })
                        .then(function () {
                        return self.$animate.addClass(slidesJqueryElement, 'transition');
                    })
                        .then(function () {
                        setTransform(0 - ((total - 3) * _slideWidth));
                        $scope.currentSlideIndex = total - 3;
                        $scope.currentPagerItemIndex = total - 4;
                        $scope.currentSlideIndex = total - 3;
                        $scope.currentPagerItemIndex = total - 4;
                    });
                }
                else {
                    var previous = current - 1;
                    if (previous < 0) {
                        previous = total - 1;
                    }
                    $scope.currentSlideIndex = previous;
                    $scope.currentPagerItemIndex = previous - 1;
                    setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
                }
            }
            function setTransform(offSet) {
                $scope.transform = "translateX(" + offSet + "px)";
            }
        };
        return CarouselDirective;
    }());
    function getStubOptions() {
        var items = [
            { title: 'title 1', background: 'url(/ng1/poc/carousel/img1_small.png)' },
            { title: 'title 2', background: 'url(/ng1/poc/carousel/img2_small.png)' },
            { title: 'title 3', background: 'url(/ng1/poc/carousel/img3_small.png)' }
        ];
        var options = {
            items: items
        };
        return options;
    }
})(poc || (poc = {}));
//# sourceMappingURL=carousel.js.map