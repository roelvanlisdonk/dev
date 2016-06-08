var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var isNullOrUndefined = zvdz.helpers.validation.isNullOrUndefined;
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
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=contains.js.map