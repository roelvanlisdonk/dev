var isEmail = zvdz.helpers.validation.isEmail;

"use strict";

describe("zvdz.helpers.validation.isEmail", function () {
    it("should validate if given parameter contains a vaild email address.", function () {
        expect(isEmail("roel.van.lisdonk@ada-ict.nl")).toBe(true);
    });
});