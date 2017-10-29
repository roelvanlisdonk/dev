"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function button(options) {
    const node = {
        attributes: [],
        events: [],
        name: "button",
        nodes: []
    };
    // Attributes
    options.type = options.type || "button";
    node.attributes.push({ name: "type", value: options.type });
    // Events
    if (options.onClick) {
        node.events.push({ name: "click", listener: options.onClick });
    }
    // Nodes
    if (options.text) {
        node.nodes.push({ text: options.text });
    }
    return node;
}
exports.button = button;
//# sourceMappingURL=button.js.map