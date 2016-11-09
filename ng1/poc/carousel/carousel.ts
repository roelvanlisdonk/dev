namespace poc {
    'use strict';  
    
    class CarouselDirective implements ng.IDirective {
        public link: ($scope: ICarouselScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public restrict = 'EA';
        public scope = {
            options: '=?carousel'
        };
        public template = `
<div class="carousel">
    <button type="button" class="previous" ng-click="onPreviousClick()">
        <i>&lt;</i>
    </button>
    <div class="slide"></div>
    <div class="pager">
        <button type="button" 
                class="item"
                title="item.title"
                ng-click="onPagerItemClick()"
                ng-repeat="item in options.items">
            <i>.</i>
        </button>
    </div>
    <button type="button" class="next" ng-click="onPagerItemClick()">
        <i>&gt;</i>
    </button>
</div>`;

        constructor() {
            const self: CarouselDirective = this;
            
            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: ICarouselScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: CarouselDirective = this;

            $scope.onNextClick = onNextClick;
            $scope.onPagerItemClick = onPagerItemClick;
            $scope.onPreviousClick = onPreviousClick;
            if(!$scope.options) {
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
        }
    }

    interface ICarouselScope extends ng.IScope {
        onNextClick: () => void;
        onPagerItemClick: () => void;
        onPreviousClick: () => void;
        options: ICarouselOptions;
    }

    interface ICarouselOptions {
        currentItemIndex: number;
        items: Array<IItem>;
    }

    interface IItem {
        title: string;
    }

    function getStubOptions(): ICarouselOptions {
        const options: ICarouselOptions = {
            currentItemIndex: 0,
            items: [
                { title: 'title 1' },
                { title: 'title 2' },
                { title: 'title 3' }
            ]
        }
        return options;
    }

    angular.module('poc').directive('carousel', [() => new CarouselDirective()]);
}