var poc;
(function (poc) {
    'use strict';
    var _slideWidth = 1000;
    var _defaultAnimiationDuration = 1000;
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
            createSlides();
            moveToSecondSlide(false);
            function createSlides() {
                var items = $scope.options.items;
                var slides = [];
                var totalItemCount = items.length;
                slides.unshift(items[totalItemCount - 1]);
                for (var i = 0, length_1 = totalItemCount; i < length_1; i++) {
                    slides.push(items[i]);
                }
                slides.push(items[0]);
                $scope.slidesWidth = slides.length * _slideWidth + "px";
                $scope.slides = slides;
            }
            function onNextClick() {
                var total = $scope.slides.length;
                if (total === 0) {
                    return;
                }
                var current = $scope.currentSlideIndex;
                if (current === total - 1) {
                    moveToSecondSlide(false);
                    moveToThirdSlide(true);
                }
                else {
                    moveToNextSlide();
                }
            }
            function onPagerItemClick(index) {
                $scope.currentPagerItemIndex = index;
                $scope.currentSlideIndex = index + 1;
                moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
            }
            function onPreviousClick() {
                var total = $scope.slides.length;
                if (total === 0) {
                    return;
                }
                var current = $scope.currentSlideIndex;
                if (current === 0) {
                    moveToSecondLastSlide(false);
                    moveToThirdLastSlide(true);
                }
                else {
                    moveToPreviousSlide();
                }
            }
            function moveSlide(offset, duration, cb) {
                var useAnimation = duration !== 0;
                duration = duration || _defaultAnimiationDuration;
                cb = cb || onSlideAnimationEnd;
                if (useAnimation) {
                    $scope.slideAnimationInProgress = true;
                    slidesJqueryElement.animate({
                        left: offset + "px"
                    }, duration, 'swing', cb);
                }
                else {
                    slidesJqueryElement.css("left", offset + "px");
                }
            }
            function moveToFirstSlide(useAnimation) {
                var duration = useAnimation ? _defaultAnimiationDuration : 0;
                var offset = 0 - ($scope.currentSlideIndex * _slideWidth);
                moveSlide(offset, 0);
                $scope.currentPagerItemIndex = 0;
                $scope.currentSlideIndex = 1;
            }
            function moveToSecondLastSlide(useAnimation) {
                var duration = useAnimation ? _defaultAnimiationDuration : 0;
                var total = $scope.slides.length;
                var offset = 0 - ((total - 2) * _slideWidth);
                moveSlide(offset, duration);
                $scope.currentPagerItemIndex = 0;
                $scope.currentSlideIndex = 1;
            }
            function moveToNextSlide() {
                var current = $scope.currentSlideIndex;
                var total = $scope.slides.length;
                var next = current + 1;
                $scope.currentSlideIndex = next;
                if (next === total - 1) {
                    $scope.currentPagerItemIndex = 0;
                }
                else {
                    $scope.currentPagerItemIndex = $scope.currentPagerItemIndex + 1;
                }
                moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
            }
            function moveToPreviousSlide() {
                var current = $scope.currentSlideIndex;
                var total = $scope.slides.length;
                var previous = current - 1;
                $scope.currentSlideIndex = previous;
                if (previous === 0) {
                    $scope.currentPagerItemIndex = total - 3;
                }
                else {
                    $scope.currentPagerItemIndex = $scope.currentPagerItemIndex - 1;
                }
                moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
            }
            function moveToSecondSlide(useAnimation) {
                var duration = useAnimation ? _defaultAnimiationDuration : 0;
                var total = $scope.slides.length;
                moveSlide(0 - (1 * _slideWidth), duration);
                $scope.currentPagerItemIndex = 0;
                $scope.currentSlideIndex = 1;
            }
            function moveToThirdSlide(useAnimation) {
                var duration = useAnimation ? _defaultAnimiationDuration : 0;
                var total = $scope.slides.length;
                moveSlide(0 - (2 * _slideWidth), duration);
                $scope.currentPagerItemIndex = 1;
                $scope.currentSlideIndex = 2;
            }
            function moveToThirdLastSlide(useAnimation) {
                var duration = useAnimation ? _defaultAnimiationDuration : 0;
                var total = $scope.slides.length;
                moveSlide(0 - ((total - 3) * _slideWidth), duration);
                $scope.currentPagerItemIndex = total - 4;
                $scope.currentSlideIndex = total - 3;
            }
            function onSlideAnimationEnd() {
                $scope.slideAnimationInProgress = false;
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