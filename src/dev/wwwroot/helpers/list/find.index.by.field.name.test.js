var findIndexByFieldName = dev.helpers.list.findIndexByFieldName;
"use strict";
describe("dev.helpers.list.findIndexByFieldName", function () {
    it("should return the index of an item in a list with the given field name, having the given value.", function () {
        var list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
        expect(findIndexByFieldName(list, "id", 3)).toBe(2);
    });
});
//# sourceMappingURL=find.index.by.field.name.test.js.map