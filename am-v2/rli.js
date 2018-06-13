"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var am;
(function (am) {
    // Is used to check if an am-... attribute is an event.
    var eventMap = {
        // HTMLElementEventMap
        "abort": null,
        "activate": null,
        "beforeactivate": null,
        "beforecopy": null,
        "beforecut": null,
        "beforedeactivate": null,
        "beforepaste": null,
        "blur": null,
        "canplay": null,
        "canplaythrough": null,
        "change": null,
        "click": null,
        "contextmenu": null,
        "copy": null,
        "cuechange": null,
        "cut": null,
        "dblclick": null,
        "deactivate": null,
        "drag": null,
        "dragend": null,
        "dragenter": null,
        "dragleave": null,
        "dragover": null,
        "dragstart": null,
        "drop": null,
        "durationchange": null,
        "emptied": null,
        "ended": null,
        "error": null,
        "focus": null,
        "input": null,
        "invalid": null,
        "keydown": null,
        "keypress": null,
        "keyup": null,
        "load": null,
        "loadeddata": null,
        "loadedmetadata": null,
        "loadstart": null,
        "mousedown": null,
        "mouseenter": null,
        "mouseleave": null,
        "mousemove": null,
        "mouseout": null,
        "mouseover": null,
        "mouseup": null,
        "mousewheel": null,
        "MSContentZoom": null,
        "MSManipulationStateChanged": null,
        "paste": null,
        "pause": null,
        "play": null,
        "playing": null,
        "progress": null,
        "ratechange": null,
        "reset": null,
        "scroll": null,
        "seeked": null,
        "seeking": null,
        "select": null,
        "selectstart": null,
        "stalled": null,
        "submit": null,
        "suspend": null,
        "timeupdate": null,
        "volumechange": null,
        "waiting": null,
        // ElementEventMap
        "ariarequest": null,
        "command": null,
        "gotpointercapture": null,
        "lostpointercapture": null,
        "MSGestureChange": null,
        "MSGestureDoubleTap": null,
        "MSGestureEnd": null,
        "MSGestureHold": null,
        "MSGestureStart": null,
        "MSGestureTap": null,
        "MSGotPointerCapture": null,
        "MSInertiaStart": null,
        "MSLostPointerCapture": null,
        "MSPointerCancel": null,
        "MSPointerDown": null,
        "MSPointerEnter": null,
        "MSPointerLeave": null,
        "MSPointerMove": null,
        "MSPointerOut": null,
        "MSPointerOver": null,
        "MSPointerUp": null,
        "touchcancel": null,
        "touchend": null,
        "touchmove": null,
        "touchstart": null,
        "webkitfullscreenchange": null,
        "webkitfullscreenerror": null,
        // GlobalEventHandlersEventMap
        "pointercancel": null,
        "pointerdown": null,
        "pointerenter": null,
        "pointerleave": null,
        "pointermove": null,
        "pointerout": null,
        "pointerover": null,
        "pointerup": null,
        "wheel": null
    };
    var Component = /** @class */ (function () {
        function Component(model, element) {
            this.model = model;
            this.element = element;
            if (!model) {
                throw new Error("The tag [" + Component.elementName + " should contain a non empty am-model attribute.]");
            }
        }
        return Component;
    }());
    am.Component = Component;
    var componentRegistrationList = {};
    function endsWith(text, search, this_len) {
        if (this_len === undefined || this_len > text.length) {
            this_len = text.length;
        }
        return text.substring(this_len - search.length, this_len) === search;
    }
    function getStatementResult(statementAsString, context) {
        var result = {
            found: false,
            value: null
        };
        if (statementAsString) {
            statementAsString = statementAsString.trim();
            if (statementAsString) {
                var statementInLowerCase = statementAsString.toLowerCase();
                if (statementInLowerCase === "true") {
                    result.found = true;
                    result.value = true;
                    return result;
                }
                if (statementInLowerCase === "false") {
                    result.found = true;
                    result.value = false;
                    return result;
                }
                var parts = statementAsString.split(".");
                for (var i = 0, length_1 = parts.length; i < length_1; i++) {
                    var part = parts[i];
                    var contextPart = context[part];
                    if (i === length_1 - 1) {
                        result.found = contextPart !== undefined;
                        if (result.found) {
                            if (endsWith(part, "()")) {
                                if (!isFunction(contextPart)) {
                                    throw new Error("The property [" + statementAsString + "] is not a function.");
                                }
                                result.value = contextPart();
                            }
                            else {
                                result.value = contextPart;
                            }
                        }
                    }
                    else {
                        context = contextPart;
                    }
                }
            }
        }
        return result;
    }
    function hasKey(obj, key) {
        return key in obj;
    }
    function isFunction(obj) {
        return "[object Function]" === Object.prototype.toString.call(obj);
    }
    // Zet de gegeven node om naar 1 of meerdere gerenderde nodes.
    function renderToDocumentFragment(node, context) {
        var frag = document.createDocumentFragment();
        var tagName = node["tagName"];
        var isElement = Boolean(tagName);
        if (isElement) {
            var oldElement = node;
            var childNodes = oldElement.childNodes;
            var Ctor = componentRegistrationList[tagName.toLowerCase()];
            var isComponent = Boolean(Ctor);
            if (isComponent) {
                if (oldElement.hasAttribute("am-model")) {
                    var result = getStatementResult(oldElement.getAttribute("am-model"), context);
                    context = __assign({}, context, result.value);
                }
                var component = new Ctor(context, node);
                var temp = document.createElement('template');
                temp.innerHTML = component.template;
                childNodes = temp.content.childNodes;
            }
            if (shouldRender(oldElement, context)) {
                var hasAmFor = oldElement.hasAttribute("am-for");
                if (hasAmFor) {
                    var info = oldElement;
                    var isRerender = Boolean(info.am);
                    var shouldRepeat = (!isRerender && hasAmFor) ||
                        (isRerender && Boolean(info.am.isRootAmFor));
                    if (shouldRepeat) {
                        context = renderAmFor(oldElement, context, tagName, childNodes, frag);
                    }
                }
                else {
                    renderElementInternal(tagName, oldElement, context, childNodes, frag);
                }
            }
        }
        else {
            frag.appendChild(node.cloneNode(true));
        }
        return frag;
    }
    function renderAmClass(attribute, context, element) {
        var classes = attribute.value.split(" ");
        for (var i = 0, length_2 = classes.length; i < length_2; i++) {
            var cls = classes[i];
            var result = getStatementResult(cls, context);
            if (result.found && result.value) {
                element.classList.add(result.value);
            }
            if (!result.found) {
                element.classList.add(cls);
            }
        }
    }
    function renderAmFor(oldElement, context, tagName, childNodes, frag) {
        // TODO: hou rekening bij een re-render dat we de gerenderderde elementen niet opnieuw renderen.
        var forStatementAsString = oldElement.getAttribute("am-for");
        if (forStatementAsString) {
            forStatementAsString = forStatementAsString.trim();
            if (forStatementAsString) {
                var parts = forStatementAsString.split(" ");
                if (parts.length >= 3) {
                    var itemVariableName = parts[0];
                    var listStatement = parts[2];
                    var statementResult = getStatementResult(listStatement, context);
                    if (statementResult.found) {
                        var contextExtension = {};
                        contextExtension[itemVariableName] = "";
                        context = __assign({}, context, contextExtension);
                        var list = statementResult.value;
                        // TODO: When list is empty, the DOM should contain the org template am-for so we can rerender, when list is filled.
                        for (var i = 0, length_3 = list.length; i < length_3; i++) {
                            var item = list[i];
                            context[itemVariableName] = item;
                            var renderedElement = renderElementInternal(tagName, oldElement, context, childNodes, frag);
                            if (i === 0) {
                                var info = renderedElement;
                                info.am.isRootAmFor = true;
                            }
                        }
                    }
                }
            }
        }
        return context;
    }
    function renderAmEvent(attribute, context, element) {
        var eventName = attribute.name.substring(3);
        var eventHandlerAsText = attribute.value;
        if (eventHandlerAsText) {
            eventHandlerAsText = eventHandlerAsText.trim();
            eventHandlerAsText = eventHandlerAsText.replace("(", " ");
            eventHandlerAsText = eventHandlerAsText.split(" ")[0];
        }
        if (eventHandlerAsText) {
            // Dit zorgt ervoor dat we ook capture events kunnen gebruiken.
            var statementResult = getStatementResult(eventHandlerAsText, context);
            if (statementResult.found) {
                element.addEventListener(eventName, statementResult.value);
            }
        }
    }
    function renderChildNodes(element, childNodes, context) {
        for (var i = 0, length_4 = childNodes.length; i < length_4; i++) {
            var childNode = childNodes[i];
            var childFrag = renderToDocumentFragment(childNode, context);
            element.appendChild(childFrag);
        }
        return element;
    }
    function renderElementInternal(tagName, oldElement, context, childNodes, frag) {
        // Maak een nieuwe element aan met dezelfde naam.
        var element = document.createElement(tagName);
        var info = element;
        info.am = {};
        // Attributen
        for (var i = 0, length_5 = oldElement.attributes.length; i < length_5; i++) {
            var attribute = oldElement.attributes[i];
            renderAttributeInternal(attribute, element, context);
        }
        // Indien element het attribuut am-text bevat dan wordt de inhoud van het element de gerenderde am-text, dus bestaande childnodes moeten niet overgenomen worden.
        if (!oldElement.hasAttribute("am-text")) {
            element = renderChildNodes(element, childNodes, context);
        }
        // Add context to element, so we can re-render the element with the correct context.
        info.am.context = context;
        frag.appendChild(element);
        return element;
    }
    function renderAttributeInternal(attribute, element, context) {
        element.setAttribute(attribute.name, attribute.value);
        // Save context to attribute so we can re-render attribute later.
        var attr = element.getAttributeNode(attribute.name);
        var info = attr;
        info.am = {
            context: context
        };
        if (startsWith(attribute.name, "am-")) {
            if (startsWith(attribute.name, "am-text")) {
                var result = getStatementResult(attribute.value, context);
                element.appendChild(document.createTextNode(result.value));
                return;
            }
            if (startsWith(attribute.name, "am-class")) {
                renderAmClass(attribute, context, element);
                return;
            }
            if (startsWith(attribute.name, "am-for")) {
                // skip am-for processing, am-for is already handled at this point.
                return;
            }
            // Events.
            if (hasKey(eventMap, attribute.name.substring(3))) {
                renderAmEvent(attribute, context, element);
                return;
            }
            // Custom attributes
            var customAttributeStatementResult = getStatementResult(attribute.value, context);
            if (customAttributeStatementResult.found) {
                var attributeName = attribute.name.substring(3);
                var attributeValue = customAttributeStatementResult.value;
                if (attributeValue === true) {
                    // Render attribute only (no value).
                    element.setAttribute(attributeName, null);
                    return;
                }
                if (attributeValue === false) {
                    // Remove attribute.
                    element.removeAttribute(attributeName);
                    return;
                }
                // Render attribute with value.
                element.setAttribute(attributeName, attributeValue);
                return;
            }
        }
        else {
            element.setAttribute(attribute.name, attribute.value);
            return;
        }
    }
    function shouldRender(element, context) {
        var shouldRender = true;
        if (element.hasAttribute("am-if")) {
            var result = getStatementResult(element.getAttribute("am-if"), context);
            shouldRender = result.value;
        }
        return shouldRender;
    }
    function startsWith(text, search, pos) {
        return text.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function trimEnd(text, textToRemove) {
        return text.replace(new RegExp(textToRemove + "*$"), '');
    }
    function boot(element, context) {
        // Get context from element.
        // Merge with given context
        // Re-Render element.
        var frag = renderToDocumentFragment(element, context);
        element.parentElement.replaceChild(frag, element);
    }
    am.boot = boot;
    function register(component) {
        var elementName = component["elementName"];
        if (!elementName) {
            throw new Error("The class [" + component["name"] + "], should contain a non empty static elementName property.");
        }
        componentRegistrationList[elementName.toLowerCase()] = component;
    }
    am.register = register;
    function renderAttribute(attributeName, element, context) {
        var attr = element.getAttributeNode(attributeName);
        if (!attr) {
            throw new Error("The attribute [" + attributeName + "], could not be found on given element.");
        }
        var info = attr;
        var newContext = context || {};
        if (info.am && info.am.context) {
            var oldContext = info.am.context;
            newContext = __assign({}, oldContext, newContext);
        }
        renderAttributeInternal(attr, element, newContext);
    }
    am.renderAttribute = renderAttribute;
    function renderElement(element, context) {
        var newContext = context || {};
        var info = element;
        if (info.am && info.am.context) {
            var oldContext = info.am.context;
            newContext = __assign({}, oldContext, newContext);
        }
        var frag = renderToDocumentFragment(element, newContext);
        element.parentElement.replaceChild(frag, element);
    }
    am.renderElement = renderElement;
    function renderElementById(id, context) {
        var element = document.getElementById(id);
        if (!element) {
            throw new Error("The element with id [" + id + "], could not be found.");
        }
        renderElement(element, context);
    }
    am.renderElementById = renderElementById;
})(am || (am = {}));
var research;
(function (research) {
    var rli;
    (function (rli) {
        "use strict";
        var boot = am.boot;
        var Component = am.Component;
        var renderElementById = am.renderElementById;
        var register = am.register;
        console.log("research started");
        var Person = /** @class */ (function () {
            function Person(name) {
                this.name = name;
                this.myClass1 = "my-class-1";
                this.phoneNumberList = ["100", "101", "102"];
                this.showInput = false;
                this.onExecuteButtonClick = this.onExecuteButtonClick.bind(this);
            }
            Person.prototype.onExecuteButtonClick = function () {
                console.log("button clicked!");
                this.phoneNumberList.push("103");
                renderElementById("phone-number-list");
            };
            return Person;
        }());
        var PersonComponent = /** @class */ (function (_super) {
            __extends(PersonComponent, _super);
            function PersonComponent(model, element) {
                var _this = _super.call(this, model, element) || this;
                _this.model = model;
                _this.element = element;
                _this.template = "<div><button type=\"button\" am-click=\"onExecuteButtonClick\">Execute</button></div>\n            <div am-class=\"myclass myClass1\">Dit is een tekst node.\n                <input am-if=\"showInput\" type=\"text\">\n                <input type=\"text\">\n                <span>Persoon 1 naam:</span><span am-text=\"name\"></span>\n                <div am-test=\"name\"></div>\n                <div id=\"phone-number-list\">\n                    <div am-for=\"phoneNumber in phoneNumberList\" am-text=\"phoneNumber\"></div>\n                </div>\n            </div>";
                return _this;
            }
            PersonComponent.elementName = "person";
            return PersonComponent;
        }(Component));
        register(PersonComponent);
        boot(document.querySelector("person"), new Person("Roel"));
    })(rli = research.rli || (research.rli = {}));
})(research || (research = {}));
//# sourceMappingURL=rli.js.map