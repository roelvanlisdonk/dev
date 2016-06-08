var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given value is "empty".
             * @param value
             * @returns true, when value is undefined.
             * @returns true, when value is null.
             * @returns true, when value is "".
             * @returns true, when value is an array with no items.
             */
            function isEmpty(value) {
                return (value === undefined ||
                    value === null ||
                    value === "" ||
                    (Array.isArray(value) && value.length <= 0));
            }
            validation.isEmpty = isEmpty;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=is.empty.js.map