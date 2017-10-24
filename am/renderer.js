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
        _renderer.renderNode(node, true);
        return node;
    });
}
exports.boot = boot;
function renderAttribute(attr, isNew) {
    let refreshedAttr = attr;
    // If attr.value is a IStoreField, set refresh method.
    // Check if deps changed
    // Check if refresh exists
    if (!isNew) {
        attr = attr.refresh(attr.deps);
    }
    const attrName = refreshedAttr.name;
    const nativeNode = refreshedAttr.parent.nativeNode;
    const value = refreshedAttr.value;
    const nativeValue = nativeNode[attrName];
    if (nativeValue != value) {
        nativeNode[attrName] = value;
    }
}
function renderClass(cssClass, isNew) {
    let refreshedClass = cssClass;
    // Check if deps changed
    // Check if refresh exists
    if (!isNew) {
        cssClass = cssClass.refresh(cssClass.deps);
    }
    if (refreshedClass.shouldNotRender === false) {
        removeClass(refreshedClass.parent.nativeNode, refreshedClass.name);
    }
    else {
        addClass(refreshedClass.parent.nativeNode, refreshedClass.name);
    }
    if (refreshedClass.rendered !== true) {
        stylesheet_1.addClassToStyleSheet(refreshedClass);
    }
}
function renderEvent(evt, isNew) {
    let refreshedEvent = evt;
    // Check if deps changed
    // Check if refresh exists
    if (!isNew) {
        evt = evt.refresh(evt.deps);
    }
    const evtName = refreshedEvent.name;
    const nativeNode = refreshedEvent.parent.nativeNode;
    if (refreshedEvent.shouldNotRender === true) {
        nativeNode.removeEventListener(evtName, refreshedEvent.listener, refreshedEvent.options);
    }
    else {
        nativeNode.addEventListener(evtName, refreshedEvent.listener, refreshedEvent.options);
    }
}
function renderNode(node, isNew) {
    return __awaiter(this, void 0, void 0, function* () {
        let refreshedNode = node;
        if (!isNew) {
            refreshedNode = yield node.refresh(node.deps);
        }
        const nativeNode = refreshedNode.nativeNode;
        // Attributes
        const attrs = refreshedNode.attributes;
        if (attrs && attrs.length && attrs.length > 0) {
            for (let i = 0, length = attrs.length; i < length; i++) {
                const attr = attrs[i];
                attr.parent = refreshedNode;
                _renderer.renderAttribue(attr, isNew);
            }
        }
        // Classes
        const classes = refreshedNode.classes;
        if (classes && classes.length && classes.length > 0) {
            for (let i = 0, length = classes.length; i < length; i++) {
                const cssClass = classes[i];
                cssClass.parent = refreshedNode;
                _renderer.renderClass(cssClass, isNew);
            }
        }
        // Events
        const evts = refreshedNode.events;
        if (evts && evts.length && evts.length > 0) {
            for (let i = 0, length = evts.length; i < length; i++) {
                const evt = evts[i];
                evt.parent = refreshedNode;
                _renderer.renderEvent(evt, isNew);
            }
        }
        // Nodes
        if (isNew) {
            const frag = document.createDocumentFragment();
            const nodes = refreshedNode.nodes;
            if (nodes && nodes.length && nodes.length > 0) {
                for (let i = 0, length = nodes.length; i < length; i++) {
                    const childNode = nodes[i];
                    childNode.parent = node;
                    if (childNode.text) {
                        childNode.nativeNode = document.createTextNode(childNode.text);
                        frag.appendChild(childNode.nativeNode);
                    }
                    if (childNode.name) {
                        childNode.nativeNode = document.createElement(childNode.name);
                        frag.appendChild(childNode.nativeNode);
                        _renderer.renderNode(childNode, isNew);
                    }
                }
                node.nativeNode.appendChild(frag);
            }
        }
        return node;
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