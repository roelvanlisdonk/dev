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

    <button type="button" ng-click="setCurrentPageIndex(currentPageIndex - 1);">Previous page</button>
    <button type="button" ng-click="setCurrentPageIndex(currentPageIndex + 1);">Next page</button>
    <div id="list" class="list">
        <div 
            id="page-{{$index}}" 
            class="page"
            ng-class="{ previous: $index < currentPageIndex, next: $index > currentPageIndex }"
            ng-repeat="page in pages"
            ng-style="page.style">
            {{page}}
        </div>
    </div>
    
    `;

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
                const color = getRandomColor();
                $scope.pages.push({
                    color: color,
                    name: `Page ${i.toString()}`,
                    style: { 'background-color': color }
                });
            }
            $scope.currentPageIndex = 0;
        }
    }

    interface IPage {
        color: string;
        name: string;
        style: any;
    }

    interface IAnimationScope extends ng.IScope {
        currentPageIndex: number;
        isCurrentPageIndex: (index: number) => boolean;
        pages: Array<IPage>;
        setCurrentPageIndex: (index: number) => void;
    }

    angular.module('poc').directive('animation', [() => new AnimationDirective()]);
}