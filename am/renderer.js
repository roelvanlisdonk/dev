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
const stylesheet_1 = require("./stylesheet");
let _renderer;
// This value will be used to store the root virtual dom node in the store.
exports.RootVirtualDomNodeStoreKey = "RootVirtualDomNode";
function getRenderer() {
    return _renderer;
}
exports.getRenderer = getRenderer;
// For now use html renderer as default.
function boot(nativeNode, fn, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        _renderer = {
            renderAttribue: renderAttribute,
            renderClass: renderClass,
            renderEvent: renderEvent,
            renderNode: renderNode
        };
        // Generate the virtual dom
        const node = yield fn(deps);
        node.nativeNode = nativeNode;
        // Travese the virtual dom and sync it with the given native dom.
        _renderer.renderNode(node);
        return node;
    });
}
exports.boot = boot;
function renderAttribute(attr) {
    const attrName = attr.name;
    const nativeNode = attr.parent.nativeNode;
    const value = attr.value;
    const nativeValue = nativeNode[attrName];
    if (nativeValue != value) {
        nativeNode[attrName] = value;
    }
}
function renderClass(cssClass) {
    if (cssClass.shouldNotRender === false) {
        removeClass(cssClass.parent.nativeNode, cssClass.name);
    }
    else {
        addClass(cssClass.parent.nativeNode, cssClass.name);
    }
    if (cssClass.rendered !== true) {
        stylesheet_1.addClassToStyleSheet(cssClass);
    }
}
function renderEvent(evt) {
    const evtName = evt.name;
    const nativeNode = evt.parent.nativeNode;
    if (evt.shouldNotRender === true) {
        nativeNode.removeEventListener(evtName, evt.listener, evt.options);
    }
    else {
        nativeNode.addEventListener(evtName, evt.listener, evt.options);
    }
}
function renderNode(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const nativeNode = node.nativeNode;
        // Attributes
        const attrs = node.attributes;
        if (attrs && attrs.length && attrs.length > 0) {
            for (let i = 0, length = attrs.length; i < length; i++) {
                const attr = attrs[i];
                attr.parent = node;
                _renderer.renderAttribue(attr);
            }
        }
        // Classes
        const classes = node.classes;
        if (classes && classes.length && classes.length > 0) {
            for (let i = 0, length = classes.length; i < length; i++) {
                const cssClass = classes[i];
                cssClass.parent = node;
                _renderer.renderClass(cssClass);
            }
        }
        // Events
        const evts = node.events;
        if (evts && evts.length && evts.length > 0) {
            for (let i = 0, length = evts.length; i < length; i++) {
                const evt = evts[i];
                evt.parent = node;
                _renderer.renderEvent(evt);
            }
        }
        // Nodes
        const nodes = node.nodes;
        if (nodes && nodes.length && nodes.length > 0) {
            for (let i = 0, length = nodes.length; i < length; i++) {
                // const childNode = nodes[i];
                // childNode.parent = node;
                // _renderer.renderNode(childNode);
            }
        }
    });
}
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else if (!hasClass(element, className)) {
        var classes = element.className.split(" ");
        classes.push(className);
        element.className = classes.join(" ");
    }
}
function hasClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    else {
        return (-1 < element.className.indexOf(className));
    }
}
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        var classes = element.className.split(" ");
        classes.splice(classes.indexOf(className), 1);
        element.className = classes.join(" ");
    }
}
//# sourceMappingURL=renderer.js.map