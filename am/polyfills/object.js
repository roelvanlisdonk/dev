if (typeof Object.create != 'function') {
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('This polyfill for Object.create, only accepts one parameter.');
        }
        o = o || {};
        function F() { }
        F.prototype = o;
        var FasAny = F;
        return new FasAny();
    };
}
//# sourceMappingURL=object.js.map