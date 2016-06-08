var isEmail = dev.helpers.validation.isEmail;

"use strict";

describe("dev.helpers.validation.isEmail", function () {
    it("should validate if given parameter contains a vaild email address.", function () {
        expect(isEmail("roel.van.lisdonk@ada-ict.nl")).toBe(true);
    });
});