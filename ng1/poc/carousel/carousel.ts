namespace poc {
    'use strict';  
    const _slideWidth = 1000;

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
            const items = $scope.options.items;
            const slides: Array<ICarouselItem> = [];
            const totalItemCount = items.length;
            slides.unshift(items[totalItemCount - 1]);
            for(let i = 0, length = totalItemCount; i < length; i++) {
                slides.push(items[i]);
            }
            slides.push(items[0]);
            $scope.slides = slides;
            $scope.currentPagerItemIndex = 0;
            $scope.currentSlideIndex = 1;

            setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
            setSlidesWidth();
            slidesJqueryElement.addClass('slidetran');           

            function setSlidesWidth() {
                $scope.slidesWidth = `${$scope.slides.length * _slideWidth}px`;
            }

            function onNextClick() {
                const total = $scope.slides.length;
                if (total === 0) { return; }
                const current = $scope.currentSlideIndex;

                let next = current + 1;
                if (next === total) {
                    next = 0;
                }
                $scope.currentSlideIndex = next;
                $scope.currentPagerItemIndex = next + 1;

                setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
            }

            function onPagerItemClick(index: number) {
                $scope.currentPagerItemIndex = index;
                $scope.currentSlideIndex = index + 1;
                setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
            }

            function onPreviousClick() {
                const total = $scope.slides.length;
                if (total === 0) { return; }
                const current = $scope.currentSlideIndex;
                if(current === 0) {
                    slidesJqueryElement.removeClass('slidetran');
                    const offset = 0 - ((total - 2)  * _slideWidth);
                    $scope.transform = `translateX(${offset}px)`;

                    self.$timeout(() => {
                        slidesJqueryElement.addClass('slidetran');
                        self.$timeout(() => {
                            setTransform(0 - ((total - 3)  * _slideWidth));
                            $scope.currentSlideIndex = total - 3;
                            $scope.currentPagerItemIndex = total - 4;
                            $scope.currentSlideIndex = total - 3;
                            $scope.currentPagerItemIndex = total - 4;
                        }, 0);
                    }, 0);
                } else {
                    let previous = current - 1;
                    if (previous < 0) {
                        previous = total - 1;
                    }
                    $scope.currentSlideIndex = previous;
                    $scope.currentPagerItemIndex = previous - 1;

                    setTransform(0 - ($scope.currentSlideIndex * _slideWidth));
                }
            }

            function setTransform(offSet: number) {
                $scope.transform = `translateX(${offSet}px)`;
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
        slidesWidth: string;
        transform: string;
        transitionEnabled: boolean; // TODO: remove this.
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