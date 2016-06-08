var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var isNullOrUndefined = zvdz.helpers.validation.isNullOrUndefined;
            var findIndexByItem = zvdz.helpers.list.findIndexByItem;
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
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=get.number.from.index.js.map