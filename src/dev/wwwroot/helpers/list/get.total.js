var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Calculates the total of a list by executing the given "getValueToAddFn" foreach item in the list.
             * @param list
             * @param fn This functions determines the value to add to the total per item.
             */
            function getTotal(list, getValueToAddfn) {
                if (isNullOrUndefined(list, getValueToAddfn)) {
                    return;
                }
                var result = 0;
                for (var i = 0, length = list.length; i < length; i++) {
                    var item = list[i];
                    result += getValueToAddfn(item);
                }
                return result;
            }
            list_1.getTotal = getTotal;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=get.total.js.map