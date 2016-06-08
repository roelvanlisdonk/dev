var isFunction = zvdz.helpers.validation.isFunction;

"use strict";

describe("zvdz.helpers.validation.isFunction", function () {
    it("should return true, if value starts with '[function'.", function () {
        expect(isFunction('   function   ')).toBe(true);
    });
});