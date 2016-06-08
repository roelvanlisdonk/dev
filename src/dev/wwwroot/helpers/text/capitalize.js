var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_1) {
            "use strict";
            /**
             * Make only the first letter of the give text, lowercase.
             */
            function capitalize(text) {
                if (!text || typeof text !== "string") {
                    return '';
                }
                return text.charAt(0).toUpperCase() + text.substr(1);
            }
            text_1.capitalize = capitalize;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=capitalize.js.map