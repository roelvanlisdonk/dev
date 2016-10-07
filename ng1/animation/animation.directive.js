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
            this.template = "\n<style>\n    html, body {\n        height: 100%;\n    }\n\n    animation button {\n        margin-right: 20px;\n    }\n\n    /*\n        The overflow property is set to hidden, so pages can be made hidden, by moving them outside of the list at the top or bottom.\n    */\n    animation .list {\n        border: 1px solid rgb(50, 50, 50);\n        height: 500px;\n        margin-top: 20px;\n        overflow: hidden; /* When the ng-hide class is removed from the page elementThis is used to hide, the hidden pages that have the ng-hide class */\n        position: relative;\n    }\n\n    /* \n        This is the default styling of a visible page.\n        \n        The \"transition\" property states, that whenever the value of the \"transform\" property changes,\n        apply the new value linear, with a duration of 0.5s to transition from the orignal value to the \n        new value.\n\n        The pages are stacked on top of each other, by using absolute positioning.\n    */\n    animation .list .page {\n        bottom: 0;\n        left: 0;\n        padding: 10px;\n        position: absolute;\n        right: 0;\n        top: 0;\n        -webkit-transition: transform 0.5s linear 0s;\n        -moz-transition: transform 0.5s linear 0s;\n        -o-transition: transform 0.5s linear 0s;\n        transition: transform 0.5s linear 0s;\n    }\n    \n    /*\n        Move previous pages outside of the list (invisible for the user), on the top side of the list.\n    */\n    animation .list .page.previous {        \n        transform: translateY(-500px);\n    }\n\n    /*\n        Move next pages outside of the list (invisible for the user), on the bottom side of the list.\n    */\n    animation .list .page.next {\n        transform: translateY(500px);\n    }\n    \n</style>\n    <button type=\"button\" ng-click=\"setCurrentPageIndex(currentPageIndex - 1);\">Previous page</button>\n    <button type=\"button\" ng-click=\"setCurrentPageIndex(currentPageIndex + 1);\">Next page</button>\n    <div id=\"list\" class=\"list\">\n        <div \n            id=\"page-{{$index}}\" \n            class=\"page\"\n            ng-class=\"{ previous: $index < currentPageIndex, next: $index > currentPageIndex }\"\n            ng-repeat=\"page in pages\"\n            style=\"background-color: {{page.color}}\">\n            {{page}}\n        </div>\n    </div>";
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
                $scope.pages.push({
                    color: getRandomColor(),
                    name: "Page " + i.toString()
                });
            }
            $scope.currentPageIndex = 0;
        };
        return AnimationDirective;
    }());
    angular.module('poc').directive('animation', [function () { return new AnimationDirective(); }]);
})(poc || (poc = {}));
//# sourceMappingURL=animation.directive.js.map