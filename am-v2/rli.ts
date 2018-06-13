namespace am {
    // Is used to check if an am-... attribute is an event.
    const eventMap: HTMLElementEventMap = {

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

    export class Component<T> {
        public static elementName: string;
        public template: string;
        constructor(public model: T, public element: HTMLElement) {
            if (!model) { throw new Error(`The tag [${Component.elementName} should contain a non empty am-model attribute.]`); }
        }
    }

    interface IAmAttributeInfo extends Attr {
        am?: {
            context?: any;
        }
    }

    interface IAmElementInfo extends HTMLElement {
        am?: {
            context?: any;
            isRootAmFor?: boolean;
        }
    }

    interface IComponentConstructor {
        new(model: any, element: HTMLElement): Component<any>;
    }   

    interface IStatementResult<T> {
        found: boolean;
        value: T;
    }

    const componentRegistrationList: { [index: string]: IComponentConstructor } = {};

    
       

    function endsWith(text: string, search: string, this_len?: number) {
        if (this_len === undefined || this_len > text.length) {
            this_len = text.length;
        }
        return text.substring(this_len - search.length, this_len) === search;
    }

    function getStatementResult<T>(statementAsString: string, context: {}): IStatementResult<T> {
        const result: IStatementResult<T> = {
            found: false,
            value: null
        };

        if (statementAsString) {
            statementAsString = statementAsString.trim();
            if (statementAsString) {
                const statementInLowerCase = statementAsString.toLowerCase();

                if (statementInLowerCase === "true") {
                    result.found = true;
                    result.value = true as any;
                    return result;
                }

                if (statementInLowerCase === "false") {
                    result.found = true;
                    result.value = false as any;
                    return result;
                }

                const parts = statementAsString.split(".");
                for (let i = 0, length = parts.length; i < length; i++) {
                    const part = parts[i];
                    const contextPart = context[part];
                    if (i === length - 1) {
                        result.found = contextPart !== undefined;
                        if (result.found) {
                            if (endsWith(part, "()")) {
                                if (!isFunction(contextPart)) {
                                    throw new Error(`The property [${statementAsString}] is not a function.`);
                                }
                                result.value = contextPart();
                            } else {
                                result.value = contextPart;
                            }
                        }
                    } else {
                        context = contextPart;
                    }
                }
            }
        }

        return result;
    }

    function hasKey<O>(obj: O, key: string): key is keyof O {
        return key in obj
    }

    function isFunction(obj: any): boolean {
        return "[object Function]" === Object.prototype.toString.call(obj);
    }

    // Zet de gegeven node om naar 1 of meerdere gerenderde nodes.
    function renderToDocumentFragment(node: Node, context: any): DocumentFragment {
        const frag = document.createDocumentFragment();

        const tagName = node["tagName"];
        const isElement = Boolean(tagName);
        if (isElement) {
            const oldElement = <HTMLElement>node;
            let childNodes = oldElement.childNodes;
            const Ctor: IComponentConstructor = componentRegistrationList[tagName.toLowerCase()];
            const isComponent = Boolean(Ctor);
            if (isComponent) {
                if (oldElement.hasAttribute("am-model")) {
                    const result = getStatementResult<{}>(oldElement.getAttribute("am-model"), context);
                    context = { ...context, ...result.value };
                }

                const component = new Ctor(context, <HTMLElement>node);
                const temp = document.createElement('template');
                temp.innerHTML = component.template;
                
                childNodes = temp.content.childNodes;
            }

            if (shouldRender(oldElement, context)) {
                const hasAmFor = oldElement.hasAttribute("am-for");
                if (hasAmFor) {
                    const info = <IAmElementInfo>oldElement;
                    const isRerender = Boolean(info.am);
                    const shouldRepeat =
                        (!isRerender && hasAmFor) ||
                        (isRerender && Boolean(info.am.isRootAmFor));

                    if (shouldRepeat) {
                        context = renderAmFor(oldElement, context, tagName, childNodes, frag);
                    }
                } else {
                    renderElementInternal(tagName, oldElement, context, childNodes, frag);
                }
            }
        } else {
            frag.appendChild(node.cloneNode(true));
        }

        return frag;
    }   

    function renderAmClass(attribute: Attr, context: any, element: HTMLElement) {
        const classes = attribute.value.split(" ");
        for (let i = 0, length = classes.length; i < length; i++) {
            const cls = classes[i];
            const result = getStatementResult<string>(cls, context);
            if (result.found && result.value) {
                element.classList.add(result.value);
            }
            if (!result.found) {
                element.classList.add(cls);
            }
        }
    }

    function renderAmFor(oldElement: HTMLElement, context: any, tagName: any, childNodes: NodeList, frag: DocumentFragment) {

        // TODO: hou rekening bij een re-render dat we de gerenderderde elementen niet opnieuw renderen.
        let forStatementAsString = oldElement.getAttribute("am-for");
        if (forStatementAsString) {
            forStatementAsString = forStatementAsString.trim();
            if (forStatementAsString) {
                const parts = forStatementAsString.split(" ");
                if (parts.length >= 3) {
                    const itemVariableName: string = parts[0];
                    const listStatement: string = parts[2];
                    const statementResult = getStatementResult<Array<any>>(listStatement, context);
                    if (statementResult.found) {
                        const contextExtension = {};
                        contextExtension[itemVariableName] = "";
                        context = { ...context, ...contextExtension };
                        const list = statementResult.value;

                        // TODO: When list is empty, the DOM should contain the org template am-for so we can rerender, when list is filled.

                        for (let i = 0, length = list.length; i < length; i++) {
                            const item = list[i];
                            context[itemVariableName] = item;
                            const renderedElement = renderElementInternal(tagName, oldElement, context, childNodes, frag);
                            if (i === 0) {
                                const info = <IAmElementInfo>renderedElement;
                                info.am.isRootAmFor = true;
                            }
                        }
                    }
                }
            }
        }
        return context;
    }

    function renderAmEvent(attribute: Attr, context: any, element: HTMLElement) {
        const eventName = attribute.name.substring(3);
        let eventHandlerAsText = attribute.value;
        if (eventHandlerAsText) {
            eventHandlerAsText = eventHandlerAsText.trim();
            eventHandlerAsText = eventHandlerAsText.replace("(", " ");
            eventHandlerAsText = eventHandlerAsText.split(" ")[0];
        }
        if (eventHandlerAsText) {
            // Dit zorgt ervoor dat we ook capture events kunnen gebruiken.
            const statementResult = getStatementResult<EventListenerOrEventListenerObject>(eventHandlerAsText, context);
            if (statementResult.found) {
                element.addEventListener(eventName, statementResult.value);
            }
        }
    }

    function renderChildNodes(element: HTMLElement, childNodes: NodeList, context: any): HTMLElement {
        for (let i = 0, length = childNodes.length; i < length; i++) {
            const childNode = childNodes[i];
            const childFrag = renderToDocumentFragment(childNode, context);
            element.appendChild(childFrag);
        }
        return element;
    }

    function renderElementInternal(tagName: string, oldElement: HTMLElement, context: any, childNodes: NodeList, frag: DocumentFragment): HTMLElement {
        // Maak een nieuwe element aan met dezelfde naam.
        let element = <HTMLElement>document.createElement(tagName);
        const info = <IAmElementInfo>element;
        info.am = {};

        // Attributen
        for (let i = 0, length = oldElement.attributes.length; i < length; i++) {
            const attribute = oldElement.attributes[i];
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
    
    function renderAttributeInternal(attribute: Attr, element: HTMLElement, context: any) {
        element.setAttribute(attribute.name, attribute.value);

        // Save context to attribute so we can re-render attribute later.
        const attr = element.getAttributeNode(attribute.name);
        const info = <IAmAttributeInfo>attr;
        info.am = {
            context: context
        };

        if (startsWith(attribute.name, "am-")) {
            if (startsWith(attribute.name, "am-text")) {
                const result = getStatementResult<string>(attribute.value, context);
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
            const customAttributeStatementResult = getStatementResult(attribute.value, context);
            if (customAttributeStatementResult.found) {
                const attributeName = attribute.name.substring(3);
                const attributeValue = customAttributeStatementResult.value;
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
                element.setAttribute(attributeName, <string>attributeValue);
                return;
            }
        }
        else {
            element.setAttribute(attribute.name, attribute.value);
            return;
        }
    }

    function shouldRender(element: HTMLElement, context: any): boolean {
        let shouldRender = true;
        if (element.hasAttribute("am-if")) {
            const result = getStatementResult<boolean>(element.getAttribute("am-if"), context);
            shouldRender = result.value;
        }
        return shouldRender;
    }

    function startsWith(text: string, search: string, pos?: number) {
        return text.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }

    function trimEnd(text: string, textToRemove: string): string {
        return text.replace(new RegExp(textToRemove + "*$"), '');
    }

    export function boot(element: HTMLElement, context: any) {
        // Get context from element.
        // Merge with given context
        // Re-Render element.
        const frag = renderToDocumentFragment(element, context);
        element.parentElement.replaceChild(frag, element);
    }

    export function register<T extends Component<any>>(component: IComponentConstructor) {
        const elementName: string = component["elementName"];
        if (!elementName) {
            throw new Error(`The class [${component["name"]}], should contain a non empty static elementName property.`);
        }

        componentRegistrationList[elementName.toLowerCase()] = component;
    }

    export function renderAttribute(attributeName: string, element: HTMLElement, context?: any) {
        const attr = element.getAttributeNode(attributeName);
        if (!attr) { throw new Error(`The attribute [${attributeName}], could not be found on given element.`); }

        const info = <IAmAttributeInfo>attr;
        let newContext = context || {};
        if (info.am && info.am.context) {
            const oldContext = info.am.context;
            newContext = { ...oldContext, ...newContext };
        }

        renderAttributeInternal(attr, element, newContext);
    }

    export function renderElement(element: HTMLElement, context?: any) {
        let newContext = context || {};
        const info = <IAmElementInfo>element;
        if (info.am && info.am.context) {
            const oldContext = info.am.context;
            newContext = { ...oldContext, ...newContext };
        }

        const frag = renderToDocumentFragment(element, newContext);
        element.parentElement.replaceChild(frag, element);
    }
    export function renderElementById(id: string, context?: any) {
        const element = <HTMLElement>document.getElementById(id);
        if (!element) { throw new Error(`The element with id [${id}], could not be found.`); }

        renderElement(element, context);
    }
}

namespace research.rli {
    "use strict";

    import boot = am.boot;
    import Component = am.Component;
    import renderElementById = am.renderElementById;
    import register = am.register;

    console.log("research started");

    class Person {
        myClass1 = "my-class-1";
        phoneNumberList = ["100", "101", "102"];
        showInput: boolean = false;
        
        constructor(public name: string) {
            this.onExecuteButtonClick = this.onExecuteButtonClick.bind(this);
        }

        onExecuteButtonClick() {
            console.log("button clicked!");
            this.phoneNumberList.push("103");
            renderElementById("phone-number-list");
        }
    }

    class PersonComponent extends Component<Person> {
        public static elementName = "person";
        public template = 
            `<div><button type="button" am-click="onExecuteButtonClick">Execute</button></div>
            <div am-class="myclass myClass1">Dit is een tekst node.
                <input am-if="showInput" type="text">
                <input type="text">
                <span>Persoon 1 naam:</span><span am-text="name"></span>
                <div am-test="name"></div>
                <div id="phone-number-list">
                    <div am-for="phoneNumber in phoneNumberList" am-text="phoneNumber"></div>
                </div>
            </div>`;

        constructor(public model: Person, public element: HTMLElement) {
            super(model, element);
        }
    }

    register(PersonComponent);
    
    boot(document.querySelector("person"), new Person("Roel"));
}
    