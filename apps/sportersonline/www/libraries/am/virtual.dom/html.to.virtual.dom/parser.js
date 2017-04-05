System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function parser(tokens, options) {
        var root = { tagName: null, children: [] };
        var state = { tokens: tokens, options: options, cursor: 0, stack: [root] };
        parse(state);
        return root.children;
    }
    exports_1("parser", parser);
    function parse(state) {
        var tokens = state.tokens, options = state.options;
        var stack = state.stack;
        var nodes = stack[stack.length - 1].children;
        var len = tokens.length;
        var cursor = state.cursor;
        while (cursor < len) {
            var token = tokens[cursor];
            if (token.type !== 'tag-start') {
                nodes.push(token);
                cursor++;
                continue;
            }
            cursor++;
            var tagToken = tokens[cursor];
            if (!tagToken || tagToken.type !== 'tag') {
                continue;
            }
            cursor++;
            var tagName = tagToken.content.toLowerCase();
            if (token.close) {
                var item = void 0;
                while ((item = stack.pop())) {
                    if (tagName === item.tagName) {
                        break;
                    }
                }
                while (cursor < len) {
                    var endToken = tokens[cursor];
                    if (endToken.type !== 'tag-end') {
                        break;
                    }
                    cursor++;
                }
                break;
            }
            if (options.closingTags.includes(tagName)) {
                var len_1 = stack.length;
                while (--len_1 > -1) {
                    if (tagName === stack[len_1].tagName) {
                        stack = stack.slice(0, len_1);
                        nodes = stack[len_1 - 1].children;
                        break;
                    }
                }
            }
            var attributes = [];
            var attrToken = void 0;
            while (cursor < len) {
                attrToken = tokens[cursor];
                if (attrToken.type === 'tag-end') {
                    break;
                }
                attributes.push(attrToken.content);
                cursor++;
            }
            cursor++;
            var children = [];
            nodes.push({
                type: 'element',
                tagName: tagToken.content,
                attributes: attributes,
                children: children
            });
            var hasChildren = !(attrToken.close || options.voidTags.includes(tagName));
            if (hasChildren) {
                stack.push({ tagName: tagName, children: children });
                var innerState = { tokens: tokens, options: options, cursor: cursor, stack: stack };
                parse(innerState);
                cursor = innerState.cursor;
            }
        }
        state.cursor = cursor;
    }
    exports_1("parse", parse);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=parser.js.map