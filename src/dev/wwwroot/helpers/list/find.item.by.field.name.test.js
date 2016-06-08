var findItemByFieldName = dev.helpers.list.findItemByFieldName;
"use strict";
describe("dev.helpers.list.findItemByFieldName", function () {
    it("should return the item in a list with the given field name, having the given value.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(findItemByFieldName(list, "id", 3)).toBe(c);
    });
});
//# sourceMappingURL=find.item.by.field.name.test.js.map