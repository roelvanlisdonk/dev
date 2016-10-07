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
            this.template = "\n<style>\n    /*\n        The overflow property is set to hidden, so when a page is made visible,\n        it appears if it scrolls from the bottom to the top.\n    */\n    .animation .list {\n        border: 1px solid rgb(50, 50, 50);\n        margin-top: 20px;\n        overflow: hidden; /* When the ng-hide class is removed from the page elementThis is used to hide, the hidden pages that have the ng-hide class */\n    }\n\n    /* \n        This is the default styling of a visible page.\n        The \"transition\" property states, that whenever the value of the \"transform\" property changes,\n        apply the new value linear, with a duration of 0.5s to transition from the orignal value to the new value.\n    */\n    .animation .list .page {\n        height: 500px;\n        padding: 10px;\n        -webkit-transition: transform 0.5s linear 0s;\n        -moz-transition: transform 0.5s linear 0s;\n        -o-transition: transform 0.5s linear 0s;\n        transition: transform 0.5s linear 0s;\n        opacity:1;\n    }\n\n    /*\n        Each hidden page is positioned at the bottom of the list, by applying a translateY(500px).\n        When a page is made visible by removing the ng-hide class, \n        the hidden page immediately gets its normal styling, but it is not yet visible because the list has \n        an overflow set to hidden.\n        The transition is only applied on the transform, so the hidden page is moved from the bottom of the list\n        to the top of the list, at its normal position.\n\n        The properties height, opacity, padding and margin, are set to 0, to immediately hide the current page, when navigating.\n        Because the current page is immediately hidden, you don't see it move to the bottom of the list.\n        We only want to see the next page scroll from the bottom to the top of the list.\n    */\n    .animation .list .page.ng-hide {\n        transform: translateY(500px);\n        height: 0;\n        opacity: 0;\n        padding: 0;\n        margin: 0;\n    }\n    \n</style>\n<div class=\"animation\">\n    <button type=\"button\" ng-click=\"setCurrentPageIndex(currentPageIndex + 1);\">Next page</button>\n    <div id=\"list\" class=\"list\">\n        <div \n            id=\"page-{{$index}}\" \n            class=\"page\"\n            ng-hide=\"!isCurrentPageIndex($index)\"\n            ng-repeat=\"page in pages\"\n            style=\"background-color: {{page.color}}\">\n            {{page}}\n        </div>\n    </div>\n</div>";
            var self = this;
            self.link = self.unboundLink.bind(self);
        }
        AnimationDirective.prototype.unboundLink = function ($scope, $element, attrs) {
            var self = this;
            function isCurrentPageIndex(index) {
                return $scope.currentPageIndex === index;
            }
            function setCurrentPageIndex(index) {
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