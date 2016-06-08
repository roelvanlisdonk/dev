var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var findIndexByItem = dev.helpers.list.findIndexByItem;
            /**
             * Get the next item in the list based on the index of the given item.
             */
            function findNextOnItem(list, item) {
                var index = findIndexByItem(list, item);
                var nextIndex = index + 1;
                if (nextIndex >= list.length) {
                    return null;
                }
                return list[nextIndex];
            }
            list_1.findNextOnItem = findNextOnItem;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=find.next.on.item.js.map