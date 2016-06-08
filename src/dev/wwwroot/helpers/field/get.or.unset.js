var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var field;
        (function (field) {
            "use strict";
            /**
             * If oldValue and newValue are equal ("==="), null is returned.
             * If oldValue and newValue are NOT equal ("==="), newValue is returned.
             * @param oldValue
             * @param newValue
             */
            function getOrUnset(oldValue, newValue) {
                if (oldValue === newValue) {
                    return null;
                }
                else {
                    return newValue;
                }
            }
            field.getOrUnset = getOrUnset;
        })(field = helpers.field || (helpers.field = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=get.or.unset.js.map