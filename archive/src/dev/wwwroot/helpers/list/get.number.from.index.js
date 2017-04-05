var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            var findIndexByItem = dev.helpers.list.findIndexByItem;
            /**
             * The number will be the index value of the item plus 1.
             * @param list
             * @param item
             */
            function getNumberFromIndex(list, item) {
                if (isNullOrUndefined(list, item)) {
                    return;
                }
                var index = findIndexByItem(list, item) || 0;
                return index + 1;
            }
            list_1.getNumberFromIndex = getNumberFromIndex;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=get.number.from.index.js.map