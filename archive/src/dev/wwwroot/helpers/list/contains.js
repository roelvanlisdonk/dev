var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Returns true, when the given item is found in the list by exact match ("===").
             * @param item
             * @param list
             */
            function contains(list, item) {
                if (isNullOrUndefined(list, item)) {
                    return;
                }
                for (var i = 0, length = list.length; i < length; i++) {
                    if (list[i] === item) {
                        return true;
                    }
                }
                return false;
            }
            list_1.contains = contains;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=contains.js.map