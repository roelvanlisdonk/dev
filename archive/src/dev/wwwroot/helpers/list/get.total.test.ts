var getTotal = dev.helpers.list.getTotal;

"use strict";

function addOneToItem(item: number): number {
    return item + 1;
}

describe("dev.helpers.list.getTotal", function () {
    it("should return to correct total form items in the list by using the given expression.", function () {
        var list = [1,2,3];
        expect(getTotal(list, addOneToItem)).toBe(9);
    });
});