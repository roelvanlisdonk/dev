# Architecture
This document contains the highlevel overview of the app architecture.



## Rendering
* The ui is contructed by generating a VirtualDomNode tree.
* When a VirtualDomObject.onChange is called, a ChangeEvent is added to the **dom change event stream**.
* The app contains a **requestAnimationFrame loop**, that runs when the **dom change event stream** contains ChangeEvents.
* The **requestAnimationFrame loop**, will update the "real UI".
* The "real UI" can be server side html, client side html, native script etc.



### VirtualDomNode implements IVirtualDomEvents
* attrs: StoreArray<VirtualDomAttribute>
    * onChange - add ChangeEvent to the **dom change event stream**.
* childs: StoreArray<VirtualDomNode>
    * can contain VirtualDomTextNode
    * onChange - add ChangeEvent to the **dom change event stream**.
* name: string
* nativeNode: any;          // Can be server side html, client side html, native script etc.
* onAdded: () => void;      
* onChange: () => void;     // Update attrs or childs.
* onRemoved: () => void;    



### VirtualDomTextNode extends VirtualDomObject
* deps: Array<StoreObject>
* onAdded: () => void;      
* onChange: () => void;     // Set text 
* onRemoved: () => void;    
* text: string;



### VirtualDomAttribute extends VirtualDomObject
* deps: Array<StoreObject>;
* enabled: boolean;         // When true, it's added to the UI.
* onAdded: () => void;      
* onChange: () => void;     // Set value and or enabled property.
* onRemoved: () => void;    
* name: string;
* value: string;



### IVirtualDomEvents
* onAdded: () => void;      // Is called after the node is added to the real UI.
* onChange: () => void;     // Is called when one of the deps changes. After it is called an change event is added to the **dom change event stream**.
* onRemoved: () => void;    // Is called after the node removed from the real UI.



### VirtualDomObject implements IVirtualDomEvents
* deps: Array<StoreObject>
* onAdded: () => void;      // Is called after the node is added to the real UI.
* onChange: () => void;     // Is called when one of the deps changes.
* onRemoved: () => void;    // Is called after the node removed from the real UI.
