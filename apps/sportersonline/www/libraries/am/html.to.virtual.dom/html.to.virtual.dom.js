System.register(["./lexer", "./parser"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function convertHtmlToVirtualDom(str, options) {
        if (options === void 0) { options = parseDefaults; }
        var tokens = lexer_1.lexer(str, options);
        var nodes = parser_1.parser(tokens, options);
        return nodes;
    }
    exports_1("convertHtmlToVirtualDom", convertHtmlToVirtualDom);
    var lexer_1, parser_1, childlessTags, closingTags, voidTags, parseDefaults;
    return {
        setters: [
            function (lexer_1_1) {
                lexer_1 = lexer_1_1;
            },
            function (parser_1_1) {
                parser_1 = parser_1_1;
            }
        ],
        execute: function () {
            childlessTags = ['style', 'script', 'template'];
            closingTags = [
                'html', 'head', 'body', 'p', 'dt', 'dd', 'li', 'option',
                'thead', 'th', 'tbody', 'tr', 'td', 'tfoot', 'colgroup'
            ];
            voidTags = [
                '!doctype', 'area', 'base', 'br', 'col', 'command',
                'embed', 'hr', 'img', 'input', 'keygen', 'link',
                'meta', 'param', 'source', 'track', 'wbr'
            ];
            parseDefaults = {
                voidTags: voidTags,
                closingTags: closingTags,
                childlessTags: childlessTags
            };
        }
    };
});
//# sourceMappingURL=html.to.virtual.dom.js.map