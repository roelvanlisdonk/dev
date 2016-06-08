var getNumberFromIndex = zvdz.helpers.list.getNumberFromIndex;

"use strict";

describe("zvdz.helpers.list.getNumberFromIndex", function () {
    it("should return the index of the given item + 1.", function () {
        var c = { id: 6 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(getNumberFromIndex(list, c)).toBe(3);
    });
});