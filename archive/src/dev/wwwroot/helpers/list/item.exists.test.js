var itemExists = dev.helpers.list.itemExists;
"use strict";
describe("dev.helpers.list.itemExists", function () {
    it("should return true when item exists in the list.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(itemExists(list, c)).toBe(true);
    });
});
//# sourceMappingURL=item.exists.test.js.map