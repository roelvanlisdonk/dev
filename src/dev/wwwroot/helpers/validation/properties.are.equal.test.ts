var propertiesAreEqual = zvdz.helpers.validation.propertiesAreEqual;

"use strict";

describe("zvdz.helpers.validation.propertiesAreEqual", function () {
    it("should return true if the value of the given property name is exact ('===') the same on both objects.", function () {

        var c = { id: 3 };
        var a = { propToCheck: c };
        var b = { propToCheck: c };

        expect(propertiesAreEqual(a, b, 'propToCheck')).toBe(true);
    });
});