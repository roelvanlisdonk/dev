// When one of the deps change a change event will be emitted then it will rerender this element.

interface IStoreObject {
    id: string;
    onChange?: () => any;
}

interface IStoreField extends IStoreObject {
    id: string;
    onChange: () => void;
    value: boolean | number | Date | string;
}

interface IVirtualDomNode {
    attrs?: Array<any>;
    classes?: Array<CSSStyleDeclaration>;
    events?: Array<any>;
    name: string;
    nativeNode?: any;
    nodes?: Array<any>;
    onAdded?: () => void;
    onChange?: () => void;
    onRemoved?: () => void;
}

interface IVirtualDomTextNode {
    deps: any;
    name: string;
    nativeNode?: any;
    onAdded?: () => void;
    onChange?: () => void;
    onRemoved?: () => void;
    text?: string;
}

const helloWorld: IStoreField = {
    id: "324234-d-32-4-dsfgsdf-432rsdgsdgf",
    onChange: function() {
        // helloWorld text changed.
    },
    value: "Hello world!"
};


const div: IVirtualDomTextNode = {
    deps: {
        helloWorld: helloWorld
    },
    name: "div",
    onChange: function() {
        this.text = this.deps.helloWorld.value;
    }
};




// There are only two things that are observable at this point:  IStoreField.onChange and the IStoreField.value.



// const div: any = {
//     deps: {
//         car: {}
//     },
//     onChange: function() {
        
//         this.text = this.deps.car.toString();
//     },
//     text: "This is some text"
// };

// <div>Hello world!</div>




