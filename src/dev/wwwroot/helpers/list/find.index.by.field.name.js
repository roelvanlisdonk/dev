var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            /**
             * Find the index of an item in a list with the given field name having the given value.
             * @param list
             * @param name
             * @param value
             */
            function findIndexByFieldName(list, name, value) {
                for (var i = 0, length = list.length; i < length; i++) {
                    var item = list[i];
                    if (item[name] === value) {
                        return i;
                    }
                }
                return null;
            }
            list_1.findIndexByFieldName = findIndexByFieldName;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=find.index.by.field.name.js.map