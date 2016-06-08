var zvdz;
(function (zvdz) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text) {
            function encode(tekst) {
                if (!tekst) {
                    return '';
                }
                var encoded = tekst.toString();
                var findReplace = [
                    [/&/g, "&amp;"],
                    [/</g, "&lt;"],
                    [/>/g, "&gt;"],
                    [/"/g, "&quot;"],
                    [/'/g, '&#39;']
                ];
                for (var item in findReplace) {
                    encoded = encoded.replace(findReplace[item][0], findReplace[item][1]);
                }
                return encoded;
            }
            text.encode = encode;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = zvdz.helpers || (zvdz.helpers = {}));
})(zvdz || (zvdz = {}));
//# sourceMappingURL=encode.js.map