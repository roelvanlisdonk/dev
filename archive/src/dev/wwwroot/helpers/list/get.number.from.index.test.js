var getNumberFromIndex = dev.helpers.list.getNumberFromIndex;
"use strict";
describe("dev.helpers.list.getNumberFromIndex", function () {
    it("should return the index of the given item + 1.", function () {
        var c = { id: 6 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(getNumberFromIndex(list, c)).toBe(3);
    });
});
//# sourceMappingURL=get.number.from.index.test.js.map