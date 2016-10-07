namespace poc {
    'use strict';

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const maxPages: number = 10;
    class AnimationDirective implements ng.IDirective {
        public link: ($scope: IAnimationScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public restrict = 'E';
        public template = `
<style>
    /*
        The overflow property is set to hidden, so when a page is made visible,
        it appears if it scrolls from the bottom to the top.
    */
    .animation .list {
        border: 1px solid rgb(50, 50, 50);
        margin-top: 20px;
        overflow: hidden; /* When the ng-hide class is removed from the page elementThis is used to hide, the hidden pages that have the ng-hide class */
    }

    /* 
        This is the default styling of a visible page.
        The "transition" property states, that whenever the value of the "transform" property changes,
        apply the new value linear, with a duration of 0.5s to transition from the orignal value to the new value.
    */
    .animation .list .page {
        height: 500px;
        padding: 10px;
        -webkit-transition: transform 0.5s linear 0s;
        -moz-transition: transform 0.5s linear 0s;
        -o-transition: transform 0.5s linear 0s;
        transition: transform 0.5s linear 0s;
        opacity:1;
    }

    /*
        Each hidden page is positioned at the bottom of the list, by applying a translateY(500px).
        When a page is made visible by removing the ng-hide class, 
        the hidden page immediately gets its normal styling, but it is not yet visible because the list has 
        an overflow set to hidden.
        The transition is only applied on the transform, so the hidden page is moved from the bottom of the list
        to the top of the list, at its normal position.

        The properties height, opacity, padding and margin, are set to 0, to immediately hide the current page, when navigating.
        Because the current page is immediately hidden, you don't see it move to the bottom of the list.
        We only want to see the next page scroll from the bottom to the top of the list.
    */
    .animation .list .page.ng-hide {
        transform: translateY(500px);
        height: 0;
        opacity: 0;
        padding: 0;
        margin: 0;
    }
    
</style>
<div class="animation">
    <button type="button" ng-click="setCurrentPageIndex(currentPageIndex + 1);">Next page</button>
    <div id="list" class="list">
        <div 
            id="page-{{$index}}" 
            class="page"
            ng-hide="!isCurrentPageIndex($index)"
            ng-repeat="page in pages"
            style="background-color: {{page.color}}">
            {{page}}
        </div>
    </div>
</div>`;

        constructor() {
            const self: AnimationDirective = this;
            
            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: IAnimationScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: AnimationDirective = this;

            function isCurrentPageIndex(index: number) {
                return $scope.currentPageIndex === index;
            }

            function setCurrentPageIndex(index: number) {
                $scope.currentPageIndex = index;
            }

            $scope.isCurrentPageIndex = isCurrentPageIndex;
            $scope.setCurrentPageIndex = setCurrentPageIndex;

            $scope.pages = [];
            for(let i = 0; i < maxPages; i++) {
                $scope.pages.push({
                    color: getRandomColor(),
                    name: `Page ${i.toString()}`
                });
            }
            $scope.currentPageIndex = 0;
        }
    }

    interface IPage {
        color: string;
        name: string;
    }

    interface IAnimationScope extends ng.IScope {
        currentPageIndex: number;
        isCurrentPageIndex: (index: number) => boolean;
        pages: Array<IPage>;
        setCurrentPageIndex: (index: number) => void;
    }

    angular.module('poc').directive('animation', [() => new AnimationDirective()]);
}