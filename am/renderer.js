"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// This value will be used to store the root virtual dom node in the store.
exports.RootVirtualDomNodeStoreKey = "RootVirtualDomNode";
function getRenderer() {
    return renderer;
}
exports.getRenderer = getRenderer;
// For now use html renderer as default.
function boot(nativeNode, fn, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        renderer = {
            addEventListener: addEventListener,
            renderAttribue: renderAttribue,
            renderClass: renderClass,
            renderEvent: renderEvent,
            renderNode: renderNode
        };
        // Generate the virtual dom
        const node = yield fn(deps);
        // Travese the virtual dom and sync it with the given native dom.
        return node;
    });
}
exports.boot = boot;
function renderAttribue(attribute) {
}
function renderClass(cssClass) {
}
function renderEvent(event) {
}
function renderNode(node) {
    // Trek de gegeven node gelijk met de node.nativenode.
}
let renderer;
//# sourceMappingURL=renderer.js.map