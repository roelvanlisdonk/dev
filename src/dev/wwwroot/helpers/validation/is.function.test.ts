var isFunction = dev.helpers.validation.isFunction;

"use strict";

describe("dev.helpers.validation.isFunction", function () {
    it("should return true, if value starts with '[function'.", function () {
        expect(isFunction('   function   ')).toBe(true);
    });
});