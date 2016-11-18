namespace poc {
    'use strict';  
    const _slideWidth = 1000;
    const _defaultAnimiationDuration = 1000;

    angular.module('poc').directive('carousel', ['$animate', '$timeout', ($animate, $timeout) => new CarouselDirective($animate, $timeout)]);

    class CarouselDirective implements ng.IDirective {
        public link: ($scope: ICarouselScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public restrict = 'EA';
        public scope = {
            options: '=?carousel'
        };
        public templateUrl = '/ng1/poc/carousel/carousel.html';

        constructor(public $animate: ng.animate.IAnimateService, public $timeout: ng.ITimeoutService) {
            const self: CarouselDirective = this;

            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: ICarouselScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: CarouselDirective = this;
            const slidesJqueryElement = $element.find('.slides').first();

            $scope.onNextClick = onNextClick;
            $scope.onPagerItemClick = onPagerItemClick;
            $scope.onPreviousClick = onPreviousClick;

            if (!$scope.options) {
                $scope.options = getStubOptions();
            }
            createSlides();
            moveToSecondSlide(false);

            function createSlides() {
                const items = $scope.options.items;
                const slides: Array<ICarouselItem> = [];
                const totalItemCount = items.length;

                // Create a clone of the last slide and use it, as first slide, to prevent flikkering, when cycling the carousel. 
                slides.unshift(items[totalItemCount - 1]);
                for(let i = 0, length = totalItemCount; i < length; i++) {
                    slides.push(items[i]);
                }
                // Create a clone of the first slide and use it, as last slide, to prevent flikkering, when cycling the carousel.
                slides.push(items[0]);
                $scope.slidesWidth = `${slides.length * _slideWidth}px`;
                $scope.slides = slides;
            }

            function onNextClick() {
                const total = $scope.slides.length;
                if (total === 0) { return; }

                const current = $scope.currentSlideIndex;
                if(current === total - 1) {
                    moveToSecondSlide(false);
                    moveToThirdSlide(true);
                    
                } else {
                    moveToNextSlide();
                }
            }

            function onPagerItemClick(index: number) {
                $scope.currentPagerItemIndex = index;
                $scope.currentSlideIndex = index + 1;
                moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
            }

            function onPreviousClick() {
                const total = $scope.slides.length;
                if (total === 0) { return; }

                const current = $scope.currentSlideIndex;
                if(current === 0) {
                    moveToSecondLastSlide(false);
                    moveToThirdLastSlide(true);
                    
                } else {
                    moveToPreviousSlide();
                }
            }

            function moveSlide(offset: number, duration?: number, cb?: Function) {
                const useAnimation = duration !== 0;
                duration = duration || _defaultAnimiationDuration;
                cb = cb || onSlideAnimationEnd;

                if(useAnimation) {
                    $scope.slideAnimationInProgress = true;
                    slidesJqueryElement.animate({
                        left: `${offset}px`
                    }, duration,'swing', cb);
                    
                } else {
                    slidesJqueryElement.css("left", `${offset}px`);
                }
            }

            function moveToFirstSlide(useAnimation: boolean) {
                const duration = useAnimation ? _defaultAnimiationDuration : 0;
                const offset = 0 - ($scope.currentSlideIndex * _slideWidth);
                moveSlide(offset, 0);
                $scope.currentPagerItemIndex = 0;
                $scope.currentSlideIndex = 1;
            }

            function moveToSecondLastSlide(useAnimation: boolean) {
                const duration = useAnimation ? _defaultAnimiationDuration : 0;
                const total = $scope.slides.length;
                const offset = 0 - ((total - 2)  * _slideWidth);
                moveSlide(offset, duration);
                $scope.currentPagerItemIndex = 0;
                $scope.currentSlideIndex = 1;
            }

            function moveToNextSlide() {
                const current = $scope.currentSlideIndex;
                const total = $scope.slides.length;

                let next = current + 1;
                $scope.currentSlideIndex = next;

                if (next === total - 1) {
                    $scope.currentPagerItemIndex = 0;
                } else {
                    $scope.currentPagerItemIndex = $scope.currentPagerItemIndex + 1;
                }

                moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
            }

            function moveToPreviousSlide() {
                const current = $scope.currentSlideIndex;
                const total = $scope.slides.length;

                let previous = current - 1;
                $scope.currentSlideIndex = previous;

                if (previous === 0) {
                    $scope.currentPagerItemIndex = total - 3;
                } else {
                    $scope.currentPagerItemIndex = $scope.currentPagerItemIndex - 1;
                }

                moveSlide(0 - ($scope.currentSlideIndex * _slideWidth));
            }

            function moveToSecondSlide(useAnimation: boolean) {
                const duration = useAnimation ? _defaultAnimiationDuration : 0;
                const total = $scope.slides.length;
                moveSlide(0 - (1  * _slideWidth), duration);
                $scope.currentPagerItemIndex = 0;
                $scope.currentSlideIndex = 1;
            }

            function moveToThirdSlide(useAnimation: boolean) {
                const duration = useAnimation ? _defaultAnimiationDuration : 0;
                const total = $scope.slides.length;
                moveSlide(0 - (2  * _slideWidth), duration);
                $scope.currentPagerItemIndex = 1;
                $scope.currentSlideIndex = 2;
            }

            function moveToThirdLastSlide(useAnimation: boolean) {
                const duration = useAnimation ? _defaultAnimiationDuration : 0;
                const total = $scope.slides.length;
                moveSlide(0 - ((total - 3)  * _slideWidth), duration);
                $scope.currentPagerItemIndex = total - 4;
                $scope.currentSlideIndex = total - 3;
            }
            
            function onSlideAnimationEnd() {
                $scope.slideAnimationInProgress = false;
            }
        }
    }

    interface ICarouselScope extends ng.IScope {
        currentPagerItemIndex: number;
        currentSlideIndex: number;
        onNextClick: () => void;
        onPagerItemClick: (index: number) => void;
        onPreviousClick: () => void;
        options: ICarouselOptions;
        slides: Array<ICarouselItem>;
        slideAnimationInProgress: boolean;
        slidesWidth: string;
    }

    interface ICarouselOptions {
        items: Array<ICarouselItem>;
    }

    interface ICarouselItem {
        background: string;
        title: string;
    }

    function getStubOptions(): ICarouselOptions {
        const items = [
                { title: 'title 1', background: 'url(/ng1/poc/carousel/img1_small.png)' },
                { title: 'title 2', background: 'url(/ng1/poc/carousel/img2_small.png)' },
                { title: 'title 3', background: 'url(/ng1/poc/carousel/img3_small.png)' }
            ];

        const options: ICarouselOptions = {
            items: items
        }
        return options;
    } 
}