namespace poc {
    'use strict';  
    const _slideWidth = 1000;

    angular.module('poc').directive('carousel', [() => new CarouselDirective()]);

    class CarouselDirective implements ng.IDirective {
        public link: ($scope: ICarouselScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public restrict = 'EA';
        public scope = {
            options: '=?carousel'
        };
        public templateUrl = '/ng1/poc/carousel/carousel.html';

        constructor() {
            const self: CarouselDirective = this;

            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: ICarouselScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: CarouselDirective = this;

            $scope.onNextClick = onNextClick;
            $scope.onPagerItemClick = onPagerItemClick;
            $scope.onPreviousClick = onPreviousClick;
            if (!$scope.options) {
                $scope.options = getStubOptions();
            }
            setTransform(0);
            setSlidesWidth();

            function setSlidesWidth() {
                $scope.slidesWidth = `${$scope.options.items.length * _slideWidth}px`;
            }

            function onNextClick() {
                const total = $scope.options.items.length;
                if (total === 0) { return; }
                const current = $scope.options.currentItemIndex || 0;

                let next = current + 1;
                if (next === total) {
                    next = 0;
                }
                $scope.options.currentItemIndex = next;

                setTransform(0 - ($scope.options.currentItemIndex * _slideWidth));
            }

            function onPagerItemClick(index: number) {
                $scope.options.currentItemIndex = index;
                setTransform(0 - ($scope.options.currentItemIndex * _slideWidth));
            }

            function onPreviousClick() {
                const total = $scope.options.items.length;
                if (total === 0) { return; }
                const current = $scope.options.currentItemIndex || 0;

                let previous = current - 1;
                if (previous < 0) {
                    previous = total - 1;
                }
                $scope.options.currentItemIndex = previous;

                setTransform(0 - ($scope.options.currentItemIndex * _slideWidth));
            }

            function setTransform(offSet: number) {
                $scope.transform = `translateX(${offSet}px)`;
            }
        }
    }

    interface ICarouselScope extends ng.IScope {
        onNextClick: () => void;
        onPagerItemClick: (index: number) => void;
        onPreviousClick: () => void;
        options: ICarouselOptions;
        slidesWidth: string;
        transform: string;
    }

    interface ICarouselOptions {
        currentItemIndex: number;
        items: Array<ICarouselItem>;
    }

    interface ICarouselItem {
        background: string;
        title: string;
    }

    function getStubOptions(): ICarouselOptions {
        const options: ICarouselOptions = {
            currentItemIndex: 0,
            items: [
                { title: 'title 1', background: 'url(/App/Core/Directives/Carousel/img1_small.png)' },
                { title: 'title 2', background: 'url(/App/Core/Directives/Carousel/img2_small.png)' },
                { title: 'title 3', background: 'url(/App/Core/Directives/Carousel/img3_small.png)' }
            ]
        }
        return options;
    }

    
}