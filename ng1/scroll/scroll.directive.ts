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

    .scroll .list {
        border: 1px solid rgb(50, 50, 50);
        height: 500px;
        margin-top: 20px;
        overflow-y: auto;
    }

    .scroll .list .item {
        height: 50px;
        padding: 10px;
    }
</style>
<div class="scroll">
    <button type="button" ng-click="onScrollToItem()">Scroll to item</button>
    <div id="list" class="list">
        <div id="item-{{$index}}" ng-repeat="item in items" class="item">
            {{item}}
        </div>
    </div>
</div>`;

        constructor() {
            const self: ScrollDirective = this;
            
            self.link = self.unboundLink.bind(self);
        }

        unboundLink($scope: IScrollScope, $element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            const self: ScrollDirective = this;
            
            $scope.items = [];
            for(let i = 0; i< 40; i++) {
                $scope.items.push(`Item ${i.toString()}`);
            }

            $scope.onScrollToItem = function() {
                scrollToItem(document.getElementById('list'), document.getElementById('item-26'), 50);
            };
        }
    }

    interface IScrollScope extends ng.IScope {
        items: Array<string>;
        onScrollToItem: () => void;
    }

    angular.module('poc').directive('scroll', [() => new ScrollDirective()]);
}