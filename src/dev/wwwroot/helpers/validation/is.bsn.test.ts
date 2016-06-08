var isBSN = dev.helpers.validation.isBSN;

"use strict";

describe("dev.helpers.validation.isBSN", function () {
    it("should return true, when passed a string containing a correct BSN.", function () {
        expect(isBSN("236132787")).toBe(true);
    });

    it("should return false, when passed a string containing a incorrect BSN.", function () {
        expect(isBSN("111")).toBe(false);
    });
});