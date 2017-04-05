System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function lexer(str, options) {
        var state = { str: str, options: options, cursor: 0, tokens: [] };
        lex(state);
        return state.tokens;
    }
    exports_1("lexer", lexer);
    function lex(state) {
        var str = state.str;
        var len = str.length;
        while (state.cursor < len) {
            var isText = str.charAt(state.cursor) !== '<';
            if (isText) {
                lexText(state);
                continue;
            }
            var isComment = str.startsWith('!--', state.cursor + 1);
            if (isComment) {
                lexComment(state);
                continue;
            }
            var tagName = lexTag(state);
            if (tagName) {
                var safeTag = tagName.toLowerCase();
                var childlessTags = state.options.childlessTags;
                if (childlessTags.includes(safeTag)) {
                    lexSkipTag(tagName, state);
                }
            }
        }
    }
    exports_1("lex", lex);
    function lexText(state) {
        var str = state.str, cursor = state.cursor;
        var textEnd = str.indexOf('<', cursor);
        var type = 'text';
        if (textEnd === -1) {
            var content_1 = str.slice(cursor);
            state.cursor = str.length;
            state.tokens.push({ type: type, content: content_1 });
            return;
        }
        if (textEnd === cursor) {
            return;
        }
        var content = str.slice(cursor, textEnd);
        state.cursor = textEnd;
        state.tokens.push({ type: type, content: content });
    }
    exports_1("lexText", lexText);
    function lexComment(state) {
        state.cursor += 4;
        var str = state.str, cursor = state.cursor;
        var commentEnd = str.indexOf('-->', cursor);
        var type = 'comment';
        if (commentEnd === -1) {
            var content_2 = str.slice(cursor);
            state.cursor = str.length;
            state.tokens.push({ type: type, content: content_2 });
            return;
        }
        var content = str.slice(cursor, commentEnd);
        state.cursor = commentEnd + 3;
        state.tokens.push({ type: type, content: content });
    }
    exports_1("lexComment", lexComment);
    function lexTag(state) {
        var str = state.str;
        {
            var secondChar = str.charAt(state.cursor + 1);
            var close_1 = secondChar === '/';
            state.tokens.push({ type: 'tag-start', close: close_1 });
            state.cursor += close_1 ? 2 : 1;
        }
        var tagName = lexTagName(state);
        lexTagAttributes(state);
        {
            var firstChar = str.charAt(state.cursor);
            var close_2 = firstChar === '/';
            state.tokens.push({ type: 'tag-end', close: close_2 });
            state.cursor += close_2 ? 2 : 1;
        }
        return tagName;
    }
    exports_1("lexTag", lexTag);
    function lexTagName(state) {
        var str = state.str, cursor = state.cursor;
        var len = str.length;
        var start = cursor;
        while (start < len) {
            var char = str.charAt(start);
            var isTagChar = !(char === ' ' || char === '/' || char === '>');
            if (isTagChar) {
                break;
            }
            start++;
        }
        var end = start + 1;
        while (end < len) {
            var char = str.charAt(end);
            var isTagChar = !(char === ' ' || char === '/' || char === '>');
            if (!isTagChar) {
                break;
            }
            end++;
        }
        state.cursor = end;
        var tagName = str.slice(start, end);
        state.tokens.push({ type: 'tag', content: tagName });
        return tagName;
    }
    exports_1("lexTagName", lexTagName);
    function lexTagAttributes(state) {
        var str = state.str, tokens = state.tokens;
        var cursor = state.cursor;
        var quote = null;
        var wordBegin = cursor;
        var words = [];
        var len = str.length;
        while (cursor < len) {
            var char = str.charAt(cursor);
            if (quote) {
                var isQuoteEnd = char === quote;
                if (isQuoteEnd) {
                    quote = null;
                }
                cursor++;
                continue;
            }
            var isTagEnd = char === '/' || char === '>';
            if (isTagEnd) {
                if (cursor !== wordBegin) {
                    words.push(str.slice(wordBegin, cursor));
                }
                break;
            }
            var isWordEnd = char === ' ';
            if (isWordEnd) {
                if (cursor !== wordBegin) {
                    words.push(str.slice(wordBegin, cursor));
                }
                wordBegin = cursor + 1;
                cursor++;
                continue;
            }
            var isQuoteStart = char === '\'' || char === '"';
            if (isQuoteStart) {
                quote = char;
                cursor++;
                continue;
            }
            cursor++;
        }
        state.cursor = cursor;
        var wLen = words.length;
        var type = 'attribute';
        for (var i = 0; i < wLen; i++) {
            var word = words[i];
            if (!(word && word.length)) {
                continue;
            }
            var isNotPair = word.indexOf('=') === -1;
            if (isNotPair) {
                var secondWord = words[i + 1];
                if (secondWord && secondWord.startsWith('=')) {
                    if (secondWord.length > 1) {
                        var newWord = word + secondWord;
                        tokens.push({ type: type, content: newWord });
                        i += 1;
                        continue;
                    }
                    var thirdWord = words[i + 2];
                    i += 1;
                    if (thirdWord) {
                        var newWord = word + '=' + thirdWord;
                        tokens.push({ type: type, content: newWord });
                        i += 1;
                        continue;
                    }
                }
            }
            if (word.endsWith('=')) {
                var secondWord = words[i + 1];
                if (secondWord && !secondWord.includes('=')) {
                    var newWord_1 = word + secondWord;
                    tokens.push({ type: type, content: newWord_1 });
                    i += 1;
                    continue;
                }
                var newWord = word.slice(0, -1);
                tokens.push({ type: type, content: newWord });
                continue;
            }
            tokens.push({ type: type, content: word });
        }
    }
    exports_1("lexTagAttributes", lexTagAttributes);
    function lexSkipTag(tagName, state) {
        var str = state.str, cursor = state.cursor, tokens = state.tokens;
        var len = str.length;
        var index = cursor;
        while (index < len) {
            var nextTag = str.indexOf('</', index);
            if (nextTag === -1) {
                lexText(state);
                break;
            }
            var tagState = { str: str, cursor: nextTag + 2, tokens: [] };
            var name_1 = lexTagName(tagState);
            if (!name_1) {
                index = nextTag + 2;
                continue;
            }
            var safeTagName = tagName.toLowerCase();
            if (safeTagName !== name_1.toLowerCase()) {
                index = tagState.cursor;
                continue;
            }
            var content = str.slice(cursor, nextTag);
            tokens.push({ type: 'text', content: content });
            var openTag = { type: 'tag-start', close: true };
            var closeTag = { type: 'tag-end', close: false };
            lexTagAttributes(tagState);
            tokens.push.apply(tokens, [openTag].concat(tagState.tokens, [closeTag]));
            state.cursor = tagState.cursor + 1;
            break;
        }
    }
    exports_1("lexSkipTag", lexSkipTag);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=lexer.js.map