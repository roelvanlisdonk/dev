var poc;
(function (poc) {
    'use strict';
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    var maxPages = 10;
    var AnimationDirective = (function () {
        function AnimationDirective() {
            this.restrict = 'E';
            this.template = "\n\n    <button type=\"button\" ng-click=\"setCurrentPageIndex(currentPageIndex - 1);\">Previous page</button>\n    <button type=\"button\" ng-click=\"setCurrentPageIndex(currentPageIndex + 1);\">Next page</button>\n    <div id=\"list\" class=\"list\">\n        <div \n            id=\"page-{{$index}}\" \n            class=\"page\"\n            ng-class=\"{ previous: $index < currentPageIndex, next: $index > currentPageIndex }\"\n            ng-repeat=\"page in pages\"\n            ng-style=\"page.style\">\n            {{page}}\n        </div>\n    </div>\n    \n    ";
            var self = this;
            self.link = self.unboundLink.bind(self);
        }
        AnimationDirective.prototype.unboundLink = function ($scope, $element, attrs) {
            var self = this;
            function isCurrentPageIndex(index) {
                return $scope.currentPageIndex === index;
            }
            function setCurrentPageIndex(index) {
                index = index < 0 ? 0 : index;
                index = index >= maxPages ? maxPages - 1 : index;
                $scope.currentPageIndex = index;
            }
            $scope.isCurrentPageIndex = isCurrentPageIndex;
            $scope.setCurrentPageIndex = setCurrentPageIndex;
            $scope.pages = [];
            for (var i = 0; i < maxPages; i++) {
                var color = getRandomColor();
                $scope.pages.push({
                    color: color,
                    name: "Page " + i.toString(),
                    style: { 'background-color': color }
                });
            }
            $scope.currentPageIndex = 0;
        };
        return AnimationDirective;
    }());
    angular.module('poc').directive('animation', [function () { return new AnimationDirective(); }]);
})(poc || (poc = {}));
//# sourceMappingURL=animation.directive.js.map