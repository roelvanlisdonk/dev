var isEmpty = zvdz.helpers.validation.isEmpty;

"use strict";

describe("zvdz.helpers.validation.isEmpty", function () {
    it("should validate if given parameter is undefined, null, empty string or empty array.", function () {
        expect(isEmpty()).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty("")).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1])).toBe(false);
    });
});

