var removeOrInsert = dev.helpers.list.removeOrInsert;
"use strict";
describe("dev.helpers.list.removeOrInsert", function () {
    it("should remove item when found or add when NOT found.", function () {
        var c = { id: 4 };
        var list = [{ id: 1 }, { id: 2 }, { id: 3 }];
        removeOrInsert(list, c);
        expect(list.length).toBe(4);
        removeOrInsert(list, c);
        expect(list.length).toBe(3);
    });
});
//# sourceMappingURL=remove.or.insert.test.js.map