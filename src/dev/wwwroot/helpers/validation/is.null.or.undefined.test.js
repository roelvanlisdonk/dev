var isNullOrUndefined = zvdz.helpers.validation.isNullOrUndefined;
"use strict";
describe("zvdz.helpers.validation.isNullOrUndefined", function () {
    it("should validate if one of the supplied parameters is null or undefined.", function () {
        expect(isNullOrUndefined()).toBe(true);
        expect(isNullOrUndefined(null)).toBe(true);
        expect(isNullOrUndefined(undefined)).toBe(true);
        expect(isNullOrUndefined("")).toBe(false);
        expect(isNullOrUndefined(true)).toBe(false);
    });
});
//# sourceMappingURL=is.null.or.undefined.test.js.map