var findIndexByItem = dev.helpers.list.findIndexByItem;

"use strict";

describe("dev.helpers.list.findIndexByItem", function () {
    it("should return the index of the given item by '===' comparison.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(findIndexByItem(list, c)).toBe(2);
    });
});