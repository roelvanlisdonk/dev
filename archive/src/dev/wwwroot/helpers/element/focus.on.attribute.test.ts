var setFocus = dev.helpers.element.focus;

"use strict";

describe("dev.helpers.element.focus", function () {
    it("should set the focus to the first element (in the given container) containing the given attribute.", function () {
        var container = document.createElement("div");
        container.innerHTML = '<input type="text" test />';
        var input = container.firstElementChild;
        expect(setFocus(container, "test")).toBe(true);
    });
});