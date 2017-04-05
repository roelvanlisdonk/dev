var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            /**
             * Check if the given item exists in the list by doing an exact comparison ("===").
             * @param list
             * @param itemToFind
             */
            function itemExists(list, itemToFind) {
                for (var i = 0, length = list.length; i < length; i++) {
                    var item = list[i];
                    if (item === itemToFind) {
                        return true;
                    }
                }
                return false;
            }
            list_1.itemExists = itemExists;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=item.exists.js.map