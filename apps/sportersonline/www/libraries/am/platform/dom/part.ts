import { isArray } from "../../common/validation/is.array";
import { isFunction } from "../../common/validation/is.function";
import { isObject } from "../../common/validation/is.object";
import { addListener, IChangeEvent, IListener, IObservableField, IObservableFn } from "../../common/observable";
import { IPart, IPartFactory, IPartRenderer } from "../../virtual.dom/part";
import { INode, INodeRenderer } from "../../virtual.dom/node";

function getListener(part:IPart, node: INode, render: (node:INode, part:IPart) => void, remove: (node:INode, part:IPart) => void): IListener {
    const state: IRerenderState = { 
        part,
        node,
        remove, 
        render
    };

    const listener: IListener = { 
        fn: rerenderPart, 
        state: state
    };

    return listener;
}

        // let nodeToMerge: INode = render;

        // const renderIsAFunction: boolean = isFunction(render)
        // if(renderIsAFunction) {
        //     const factory: INodeFactory = render as INodeFactory;
        //     const factoryResult: INode | Array<INode> = factory(renderer.when);
        //     if(isArray(factoryResult)) {
        //         renderParts(parentNode, factoryResult as Array<IPart>, renderNode, removeNode);
        //     } else {
        //         nodeToMerge = factoryResult as INode;
        //     }
        // }

        // TODO when property on node does not exist or empty or NOT an array take property from nodeToMerge.
        // TODO when property on node is a NON empty array, take all array items from nodeToMerge and overwrite when necessary.
        //nodeToRender = Object.assign({}, node, nodeToMerge);



function renderPart(node:INode, part:IPart | IPartRenderer, render: (node:INode, part:IPart) => void, remove: (node:INode, part:IPart) => void) {
    let partToRender = part;
    const renderer: IPartRenderer = part as IPartRenderer;
    const hasRenderProperty: boolean = isObject(renderer.render);
    if(hasRenderProperty) {
        if(isFunction(renderer.render)) {
            const factory: IPartFactory = renderer.render as IPartFactory;
            const factoryResult: IPart | Array<IPart> = factory(renderer.when);
            if(isArray(factoryResult)) {
                // TODO: loop items, when item is an INode, 
            } else {
                // TODO: if partToRender isAnINode merge factoryResult and node into partToRender.
                partToRender = factoryResult as IPart;

            }
        } else {
            // TODO: if partToRender is and INode merge factoryResult and node into partToRender.
            partToRender = renderer.render as IPart;
        }
    }

    if(partToRender) {
        
        render(node, part);
    }
}

export function renderParts(node: INode, parts: Array<IPart>, render: (node:INode, part:IPart) => void, remove: (node:INode, part:IPart) => void) {
    if(!node) { throw new Error("Please provide node."); }

    // Attributes, Classes, Events, Media, Nodes, Rules etc. can be null to preserve memory.
    if(parts) {
        const total = parts.length;
        for (let i = 0; i < total; i++) {
            const part = parts[i];
            renderPart(node, part, render, remove);
        }
    }
}

function rerenderPart(evt: IChangeEvent) {
    const state: IRerenderState = evt.listener.state;
    const node = state.node;

    const part: IPart = (state.part as any);
    if ((evt.source as IObservableField<any>).value) {
        state.render(node, part);
    } else {
        state.remove(node, part);
    }
}

/** 
 * Setup's rerendering if needed, returns true when part should be rendered, else false.
 */
function setupRerendering(part: IPart, node: INode, render: (node:INode, part:IPart) => void, remove: (node:INode, part:IPart) => void): boolean {
    
    // Render when display is not supplied.
    if(part.display === undefined || part.display === null) { 
        return true;
    }
    
    // Handle boolean values.
    if(part.display === false || part.display === true) { 
        return part.display;
    }

    // Handle IObservableFn
    const displayAsObservableFn: IObservableFn<boolean, any> = (part.display as any);
    if(isFunction(displayAsObservableFn.fn)) {
        if(isObject(displayAsObservableFn.input)) {
            const listener = getListener(part, node, render, remove);
            addListener(displayAsObservableFn.input, listener, displayAsObservableFn.traverse);
        }

        let value = displayAsObservableFn.fn(displayAsObservableFn.input);
        
        // Handle "negation"
        // if(displayAsObservableFn.not) {
        //     value = !value;
        // }

        return value;
    }

    // Handle IObservableFields.
    const displayAsObservableField: IObservableField<boolean> = (part.display as any);
    if(isObject(displayAsObservableField)) {
        let value = Boolean(displayAsObservableField.value);

        // Handle "negation"
        // if(displayAsObservableField.not) {
        //     value = !value;
        // }

        const listener = getListener(part, node, render, remove);
        addListener(displayAsObservableField, listener);
        return value;
    }
    
    // When part is not a boolean, IObservableFn or IObservableField (eg null, undefined etc., just show it).
    return true;
}

interface IRerenderState {
    part: IPart;
    node: INode;
    remove: (node:INode, part:IPart) => void;
    render: (node:INode, part:IPart) => void;
}