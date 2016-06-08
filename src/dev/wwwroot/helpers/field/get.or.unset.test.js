var getOrUnset = zvdz.helpers.field.getOrUnset;
"use strict";
describe("zvdz.helpers.field.getOrUnset", function () {
    it("should return null, if oldValue and newValue are equal (===).", function () {
        var c = { id: 3 };
        var a = {
            c: c
        };
        expect(getOrUnset(a.c, c)).toBe(null);
    });
});
//# sourceMappingURL=get.or.unset.test.js.map