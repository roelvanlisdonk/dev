var isNumeric = dev.helpers.validation.isNumeric;

"use strict";

describe("dev.helpers.validation.isNumeric", function () {
    it("should return true, when passed a number.", function () {
        expect(isNumeric(12345)).toBe(true);
    });

    it("should return true, when passed a string containing only numbers.", function () {
        expect(isNumeric("111")).toBe(true);
    });

    it("should return true, when passed a string, starting with zero's and containing only numbers.", function () {
        expect(isNumeric("000111")).toBe(true);
    });

    it("should return false, when passed a string containing characters.", function () {
        expect(isNumeric("1A00")).toBe(false);
    });
});