var removeWhiteSpace = dev.helpers.text.removeWhiteSpace;

"use strict";

describe("dev.helpers.text.removeWhiteSpace", function () {
    it("should remove all  white space from a string, containing leading, trailing and spaces inside the string.", function () {
        expect(removeWhiteSpace(" te s t ")).toBe("test");
    });
});