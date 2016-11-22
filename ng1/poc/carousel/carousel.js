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
            function move(direction) {
                var total = $scope.slides.length;
                var first = (direction === Direction.forward) ? 0 : total - 1;
                var last = (direction === Direction.forward) ? total - 1 : 0;
                var incrementor = (direction === Direction.forward) ? 1 : -1;
                $scope.currentPagerItemIndex = getPagerItemIndex(0, total - 1, direction);
                setSlideIndexAndMove(first, last, incrementor);
            }
            function moveSlide(offset, duration, cb) {
                var useAnimation = duration !== 0;
                duration = duration || _defaultAnimiationDuration;
                cb = cb || onSlideAnimationEnd;
                if (useAnimation) {
                    $scope.slideAnimationInProgress = true;
                    slidesJqueryElement.animate({ left: offset + "px" }, duration, 'swing', cb);
                }
                else {
                    slidesJqueryElement.css("left", offset + "px");
                }
            }
            function moveToSecondSlide(useAnimation) {
                var duration = useAnimation ? _defaultAnimiationDuration : 0;
                var total = $scope.slides.length;
                moveSlide(0 - (1 * _slideWidth), duration);
                $scope.currentPagerItemIndex = 0;
                $scope.currentSlideIndex = 1;
            }
            function onNextClick() {
                move(Direction.forward);
            }
            function onPagerItemClick(index) {
                $scope.currentPagerItemIndex = index;
                $scope.currentSlideIndex = index + 1;
                moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
            }
            function onPreviousClick() {
                move(Direction.backward);
            }
            function onSlideAnimationEnd() {
                $scope.slideAnimationInProgress = false;
            }
            function getPagerItemIndex(first, last, direction) {
                if (direction === Direction.backward) {
                    if ($scope.currentSlideIndex === first) {
                        return first;
                    }
                    if ($scope.currentSlideIndex === first + 1) {
                        return first + 1;
                    }
                    return $scope.currentSlideIndex - 2;
                }
                if (direction === Direction.forward) {
                    if ($scope.currentSlideIndex === last) {
                        return first + 1;
                    }
                    if ($scope.currentSlideIndex === last - 1) {
                        return first;
                    }
                    return $scope.currentSlideIndex;
                }
                throw new Error("Unknown direction.");
            }
            function setSlideIndexAndMove(first, last, incrementor) {
                if ($scope.currentSlideIndex === last) {
                    $scope.currentSlideIndex = first + incrementor;
                    moveSlide(0 - ($scope.currentSlideIndex * _slideWidth), 0);
                    $scope.currentSlideIndex = $scope.currentSlideIndex + incrementor;
                    moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
                }
                else {
                    $scope.currentSlideIndex = $scope.currentSlideIndex + incrementor;
                    moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
                }
            }
        };
        return CarouselDirective;
    }());
    var Direction;
    (function (Direction) {
        Direction[Direction["backward"] = 0] = "backward";
        Direction[Direction["forward"] = 1] = "forward";
    })(Direction || (Direction = {}));
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