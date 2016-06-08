var findIndexByItem = zvdz.helpers.list.findIndexByItem;
"use strict";
describe("zvdz.helpers.list.findIndexByItem", function () {
    it("should return the index of the given item by '===' comparison.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(findIndexByItem(list, c)).toBe(2);
    });
});
//# sourceMappingURL=find.index.by.item.test.js.map