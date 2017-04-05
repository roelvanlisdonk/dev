var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Remove item from the list if found.
             * Add item to the list if NOT found.
             * @param list
             * @param item
             */
            function removeOrInsert(list, item) {
                if (isNullOrUndefined(list, item)) {
                    return;
                }
                for (var i = 0, length = list.length; i < length; i++) {
                    if (list[i] === item) {
                        list.splice(i, 1);
                        return;
                    }
                }
                list.push(item);
                return;
            }
            list_1.removeOrInsert = removeOrInsert;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=remove.or.insert.js.map