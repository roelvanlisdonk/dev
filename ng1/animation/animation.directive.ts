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
    animation, body, button, div, html {
        border: 0;
        border-image-width: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        outline: 0;
        padding: 0;
    }
    
    html, body {
        height: 100%;
    }

    body {
        padding: 40px;
    }

    animation button {
        cursor: pointer;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        margin-right: 20px;
        padding: 10px;
    }

    /*
        The overflow property is set to hidden, so pages can be made hidden, by moving them outside of the list at the top or bottom.
    */
    animation .list {
        border: 1px solid rgb(50, 50, 50);
        height: 500px;
        margin-top: 20px;
        overflow: hidden; /* When the ng-hide class is removed from the page elementThis is used to hide, the hidden pages that have the ng-hide class */
        position: relative;
    }

    /* 
        This is the default styling of a visible page.
        
        The "transition" property states, that whenever the value of the "transform" property changes,
        apply the new value linear, with a duration of 0.5s to transition from the orignal value to the 
        new value.

        The pages are stacked on top of each other, by using absolute positioning.
    */
    animation .list .page {
        bottom: 0;
        left: 0;
        padding: 10px;
        position: absolute;
        right: 0;
        top: 0;
        -webkit-transition: transform 0.5s linear 0s;
        -moz-transition: transform 0.5s linear 0s;
        -o-transition: transform 0.5s linear 0s;
        transition: transform 0.5s linear 0s;
    }
    
    /*
        Move previous pages outside of the list (invisible for the user), on the top side of the list.
    */
    animation .list .page.previous {        
        transform: translateY(-500px);
    }

    /*
        Move next pages outside of the list (invisible for the user), on the bottom side of the list.
    */
    animation .list .page.next {
        transform: translateY(500px);
    }
</style>
    <button type="button" ng-click="setCurrentPageIndex(currentPageIndex - 1);">Previous page</button>
    <button type="button" ng-click="setCurrentPageIndex(currentPageIndex + 1);">Next page</button>
    <div id="list" class="list">
        <div 
            id="page-{{$index}}" 
            class="page"
            ng-class="{ previous: $index < currentPageIndex, next: $index > currentPageIndex }"
            ng-repeat="page in pages"
            style="background-color: {{page.color}}">
            {{page}}
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
                index = index < 0 ? 0 : index;
                index = index >= maxPages ? maxPages - 1 : index;

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