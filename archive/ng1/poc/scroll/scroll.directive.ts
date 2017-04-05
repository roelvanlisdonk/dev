namespace poc {
    'use strict';  
    
    function scrollToItem(list: HTMLElement, item: HTMLElement, extraOffset: number): number {
        var scrollTop = (item.offsetTop - extraOffset) - list.offsetTop;

        // To animate the scroll we use jQuery animate.
        // Stop must be called before animate to prevent jank.
        $(list).animate({
            scrollTop: scrollTop
        }, 3000);

        return scrollTop;
    }

    class ScrollDirective implements ng.IDirective {
        public link: ($scope: IScrollScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void;
        public restrict = 'E';
        public template = `
<style>
    .scroll {
        
    }

    .scroll .hidden {
        visibility: hidden;
    }

    .scroll .list {
        border: 1px solid rgb(50, 50, 50);
        height: 500px;
        margin-top: 20px;
        overflow-y: hidden;
    }

    .scroll .list .item {
        height: 100px;
        padding: 10px;
    }
</style>
<div class="scroll">
    <input type="number" ng-model="currentItemIndex" />
    <button type="button" ng-click="onScrollToItem()">Scroll to item</button>
    <button type="button" ng-click="onMakeItemVisible()">Make item visible</button>
    <div id="list" class="list">
        <div id="item-{{$index}}" ng-class="{'hidden': !item.visible}" ng-repeat="item in items" class="item">
            {{item.name}}
        </div>
    </div>
</div>`;

        constructor() {
            const self: ScrollDirective = this;
            
            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: IScrollScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: ScrollDirective = this;
            const specialItemIndex = 15;
            $scope.items = [];
            for(let i = 0; i< 40; i++) {
                const item = {
                    name: `Item ${i.toString()}`,
                    visible: false
                };
                $scope.items.push(item);
            }

            $scope.onMakeItemVisible = function() {
                $scope.items[specialItemIndex].visible = true;
            };

            $scope.onScrollToItem = function() {
                $scope.items[$scope.currentItemIndex].visible = true;
                scrollToItem(document.getElementById('list'), document.getElementById(`item-${$scope.currentItemIndex.toString()}`), 50);
            };
        }
    }

    interface IScrollScope extends ng.IScope {
        currentItemIndex: number;
        items: Array<IItem>;
        onMakeItemVisible: () => void;
        onScrollToItem: () => void;
    }

    interface IItem {
        name: string;
        visible: boolean;
    }

    angular.module('poc').directive('scroll', [() => new ScrollDirective()]);
}