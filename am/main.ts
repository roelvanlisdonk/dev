import { div, getVirtualDom, IVirtualDomNode, span } from './services/virtual.dom'
import { render } from './services/dom'
import { IStoreBooleanField, IStoreNumberField, IStoreObject, IStoreStringField } from './services/store'

// const body = document.querySelector('body');

// const bodyVirtualDom = getVirtualDom(body);

class Topic implements IStoreObject {
    id: string;
    readonly typeId: string = StoreTypes.Topic.toString();
    done: IStoreBooleanField = {
        fieldId: "1",
        value: false
    }; 
    group: IStoreNumberField = {
        fieldId: "2",
        value: null
    };
    partialDone: IStoreBooleanField = {
        fieldId: "3",
        value: false
    };
}

class User implements IStoreObject {
    id: string;
    readonly typeId: string = StoreTypes.User.toString();
    name: IStoreStringField = {
        fieldId: "1",
        value: null
    };
}

const enum StoreTypes {
    User = 1,
    Topic = 2
}

const enum TopicGroup {
    Read = 1,
    Watch = 2
}