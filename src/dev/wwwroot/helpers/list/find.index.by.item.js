var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            /**
             * Find the index of an item in a list, by checking on same object pointer.
             * @param list
             * @param item
             */
            function findIndexByItem(list, item) {
                for (var i = 0, length = list.length; i < length; i++) {
                    if (list[i] === item) {
                        return i;
                    }
                }
                return null;
            }
            list_1.findIndexByItem = findIndexByItem;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=find.index.by.item.js.map