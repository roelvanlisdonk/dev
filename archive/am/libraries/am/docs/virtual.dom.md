# Virtual DOM


## VirtualDomObject

```TypeScript
    interface IVirtualDomObject {
        // Is called after the node is added to the real UI.
        onAdded: () => void;

        // Is called when one of the deps changes. After it is called an change event is added to the **dom change event stream**.  
        onChange: () => void;

        // Is called after the node removed from the real UI.
        onRemoved: () => void;
    }
```  



## VirtualDomAttribute

```TypeScript
    class VirtualDomAttribute implements IVirtualDomObject {
        deps: Array<StoreObject>;
        enabled: boolean;         // When true, it's added to the UI.
        name: string;
        value: string;
    }
```



## VirtualDomEvent

```TypeScript
    class VirtualDomEvent implements IVirtualDomObject {
        deps: Array<StoreObject>;   
        name: string;
    }
```



## VirtualDomNode

```TypeScript

    class VirtualDomNode implements IVirtualDomObject {
        attrs: StoreArray<VirtualDomAttribute>;
        nodes: StoreArray<VirtualDomNode>;
        events: StoreArray<VirtualDomEvent>
        name: string
        nativeNode: any;          // Can be server side html, client side html, native script etc.
    }
```



## VirtualDomTextNode

```TypeScript
    class VirtualDomTextNode extends VirtualDomNode {
        deps: Array<StoreObject>;
        text: string;
    }
```
