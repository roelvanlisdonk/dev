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
            function format(text) {
                var args = arguments;
                return text.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
            }
            text_1.format = format;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=format.js.map