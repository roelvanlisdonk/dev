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

