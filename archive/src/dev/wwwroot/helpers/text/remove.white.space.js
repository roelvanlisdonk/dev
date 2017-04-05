var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text) {
            "use strict";
            /**
             * Remove all the white space inside the string.
             */
            function removeWhiteSpace(value) {
                return value.replace(/\s+/g, '');
            }
            text.removeWhiteSpace = removeWhiteSpace;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=remove.white.space.js.map