System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _c, _blockSize, _base, _discreteValues, _globalCountCache;
    function cuidModule() {
    }
    exports_1("cuidModule", cuidModule);
    function cuid() {
        var letter = 'c';
        var timestamp = (new Date().getTime()).toString(_base);
        var random = randomBlock() + randomBlock();
        var counter = pad(safeCounter().toString(_base), _blockSize);
        return letter + timestamp + counter + random;
    }
    exports_1("cuid", cuid);
    function fingerprint() {
        return pad((navigator.mimeTypes.length +
            navigator.userAgent.length).toString(36) +
            globalCount().toString(36), 4);
    }
    function globalCount() {
        if (_globalCountCache) {
            return _globalCountCache;
        }
        var i;
        var count = 0;
        for (i in window) {
            count++;
        }
        return count;
    }
    function pad(str, size) {
        return ('000000000' + str).slice(-size);
    }
    function randomBlock() {
        return pad((Math.random() * _discreteValues << 0).toString(_base), _blockSize);
    }
    function safeCounter() {
        _c = _c < _discreteValues ? _c : 0;
        return _c++;
    }
    return {
        setters:[],
        execute: function() {
            _c = 0;
            _blockSize = 4;
            _base = 36;
            _discreteValues = Math.pow(_base, _blockSize);
            _globalCountCache = null;
        }
    }
});
//# sourceMappingURL=cuid.js.map