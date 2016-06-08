var isNumeric = dev.helpers.validation.isNumeric;
"use strict";
describe("dev.helpers.validation.isNumeric", function () {
    it("should validate if given parameter is a number.", function () {
        expect(isNumeric(100)).toBe(true);
    });
});
//# sourceMappingURL=is.numeric.test.js.map