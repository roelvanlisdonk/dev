# Rendering
* The UI will only change, when a StoreObject.onChange event is emitted.
* The ui is contructed by generating a VirtualDomNode tree.
* When a VirtualDomObject.onChange is called, a ChangeEvent is added to the **dom change event stream**.
* The app contains a **requestAnimationFrame loop**, that runs when the **dom change event stream** contains ChangeEvents.
* The **requestAnimationFrame loop**, will update the "real UI".
* The "real UI" can be server side html, client side html, native script etc.



## Rederer

```TypeScript
    class Renderer {
        toNativeAttribute(virtualDomAttribute: VirtualDomAttribute): any {}
        toNativeEvent(virtualDomEvent: VirtualDomEvent): any {}
        toNativeNode(virtualDomNode: VirtualDomNode): any {}
        toVirtualDomAttribute(nativeAttribute: any): VirtualDomAttribute {}
        toVirtualDomEvent(nativeEvent: any): VirtualDomEvent {}
        toVirtualDomNode(nativeNode: any): VirtualDomNode {}
    }
```


### VirtualDomObject

```TypeScript
    class VirtualDomObject {
        // Is called after the node is added to the real UI.
        onAdded: () => void {}

        // Is called when one of the deps changes. After it is called an change event is added to the **dom change event stream**.  
        onChange: () => void {}

        // Is called after the node removed from the real UI.
        onRemoved: () => void {}
    }
```  



### VirtualDomAttribute

```TypeScript
    class VirtualDomAttribute extends VirtualDomObject {
        deps: Array<StoreObject>;
        enabled: boolean;         // When true, it's added to the UI.
        name: string;
        value: string;
    }
```



### VirtualDomEvent

```TypeScript
    class VirtualDomEvent extends VirtualDomObject {
        deps: Array<StoreObject>;   
        name: string;
    }
```



### VirtualDomNode

```TypeScript

    class VirtualDomNode extends VirtualDomObject {
        attrs: StoreArray<VirtualDomAttribute>;
        nodes: StoreArray<VirtualDomNode>;
        events: StoreArray<VirtualDomEvent>
        name: string
        nativeNode: any;          // Can be server side html, client side html, native script etc.
    }
```



### VirtualDomTextNode

```TypeScript
    class VirtualDomTextNode extends VirtualDomNode {
        deps: Array<StoreObject>;
        text: string;
    }
```
