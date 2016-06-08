var getByAttribute = zvdz.helpers.element.getByAttribute;
"use strict";
describe("zvdz.helpers.element.getElementByAttribute", function () {
    it("should get the first element (in the given container) containing the given attribute.", function () {
        var container = document.createElement("div");
        container.innerHTML = '<input type="text" test />';
        var input = container.firstElementChild;
        var result = getByAttribute(container, "test");
        expect(input).toBe(result);
    });
});
//# sourceMappingURL=get.by.attribute.test.js.map