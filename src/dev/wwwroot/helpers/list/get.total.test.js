var getTotal = zvdz.helpers.list.getTotal;
"use strict";
function addOneToItem(item) {
    return item + 1;
}
describe("zvdz.helpers.list.getTotal", function () {
    it("should return to correct total form items in the list by using the given expression.", function () {
        var list = [1, 2, 3];
        expect(getTotal(list, addOneToItem)).toBe(9);
    });
});
//# sourceMappingURL=get.total.test.js.map