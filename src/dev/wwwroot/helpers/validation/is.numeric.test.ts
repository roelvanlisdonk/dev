var isNumeric = zvdz.helpers.validation.isNumeric;

"use strict";

describe("zvdz.helpers.validation.isNumeric", function () {
    it("should validate if given parameter is a number.", function () {
        expect(isNumeric(100)).toBe(true);
    });
});