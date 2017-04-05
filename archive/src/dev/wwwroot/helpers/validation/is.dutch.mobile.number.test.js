var isDutchMobileNumber = dev.helpers.validation.isDutchMobileNumber;
"use strict";
describe("dev.helpers.validation.isDutchMobileNumber", function () {
    it("should return true, when passed a dutch mobile number.", function () {
        expect(isDutchMobileNumber("0612345678")).toBe(true);
    });
    it("should return true, when passed a dutch mobile number, containing spaces.", function () {
        expect(isDutchMobileNumber(" 06 12345678 ")).toBe(true);
    });
    it("should return false, when string contains other characters then spaces or numbers.", function () {
        expect(isDutchMobileNumber("06-12345678")).toBe(false);
    });
});
//# sourceMappingURL=is.dutch.mobile.number.test.js.map