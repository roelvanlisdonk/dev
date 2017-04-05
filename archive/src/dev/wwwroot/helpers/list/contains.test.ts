var contains = dev.helpers.list.contains;

"use strict";

describe("dev.helpers.list.contains", function () {
    it("should return true, when item is in the list.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(contains(list, c)).toBe(true);
    });
});