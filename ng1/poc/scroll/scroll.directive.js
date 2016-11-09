var poc;
(function (poc) {
    'use strict';
    function scrollToItem(list, item, extraOffset) {
        var scrollTop = (item.offsetTop - extraOffset) - list.offsetTop;
        $(list).animate({
            scrollTop: scrollTop
        }, 3000);
        return scrollTop;
    }
    var ScrollDirective = (function () {
        function ScrollDirective() {
            this.restrict = 'E';
            this.template = "\n<style>\n    .scroll {\n        \n    }\n\n    .scroll .hidden {\n        visibility: hidden;\n    }\n\n    .scroll .list {\n        border: 1px solid rgb(50, 50, 50);\n        height: 500px;\n        margin-top: 20px;\n        overflow-y: hidden;\n    }\n\n    .scroll .list .item {\n        height: 100px;\n        padding: 10px;\n    }\n</style>\n<div class=\"scroll\">\n    <input type=\"number\" ng-model=\"currentItemIndex\" />\n    <button type=\"button\" ng-click=\"onScrollToItem()\">Scroll to item</button>\n    <button type=\"button\" ng-click=\"onMakeItemVisible()\">Make item visible</button>\n    <div id=\"list\" class=\"list\">\n        <div id=\"item-{{$index}}\" ng-class=\"{'hidden': !item.visible}\" ng-repeat=\"item in items\" class=\"item\">\n            {{item.name}}\n        </div>\n    </div>\n</div>";
            var self = this;
            self.link = self.unboundLink.bind(self);
        }
        ScrollDirective.prototype.unboundLink = function ($scope, $element, attrs) {
            var self = this;
            var specialItemIndex = 15;
            $scope.items = [];
            for (var i = 0; i < 40; i++) {
                var item = {
                    name: "Item " + i.toString(),
                    visible: false
                };
                $scope.items.push(item);
            }
            $scope.onMakeItemVisible = function () {
                $scope.items[specialItemIndex].visible = true;
            };
            $scope.onScrollToItem = function () {
                $scope.items[$scope.currentItemIndex].visible = true;
                scrollToItem(document.getElementById('list'), document.getElementById("item-" + $scope.currentItemIndex.toString()), 50);
            };
        };
        return ScrollDirective;
    }());
    angular.module('poc').directive('scroll', [function () { return new ScrollDirective(); }]);
})(poc || (poc = {}));
//# sourceMappingURL=scroll.directive.js.map