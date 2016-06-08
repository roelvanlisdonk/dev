var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var findIndexByFieldName = zvdz.helpers.list.findIndexByFieldName;
            /**
             * Find an item in a list with the given field name having the given value.
             * @param list
             * @param name
             * @param value
             */
            function findItemByFieldName(list, name, value) {
                var index = findIndexByFieldName(list, name, value);
                if (index === null) {
                    return null;
                }
                else {
                    return list[index];
                }
            }
            list_1.findItemByFieldName = findItemByFieldName;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=find.item.by.field.name.js.map