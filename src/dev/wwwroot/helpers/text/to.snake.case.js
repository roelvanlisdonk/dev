var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_1) {
            "use strict";
            function toSnakeCase(text) {
                return text.split(/(?=[A-Z])/).join("-").toLowerCase();
            }
            text_1.toSnakeCase = toSnakeCase;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
//# sourceMappingURL=to.snake.case.js.map