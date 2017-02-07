import { cuid } from "../common/cuid";
import { isArray } from "../common/validation/is-array"
import { clientStorage } from "./local.storage";
import _data = am.store.data;

const rootId = "am.root";

function getObjectFromLocalStorage<T extends IStoreObject>(id: string, schemaType: { new (): T; }): T {
    const json = clientStorage.getItem(id);

    if (json) {
        const schemaObj: any = new schemaType();
        const storeObj = JSON.parse(json);

        const keys = Object.keys(storeObj);
        const keyCount = keys.length;
        for (let i = 0; i < keyCount; i++) {
            const key = keys[i];

            // Check if property exists on give type
            // TODO: check mappings
            let schemaTypeProp = schemaObj[key];
            if (schemaTypeProp === undefined) { continue; }

            // The following properties, will not be observable.
            if (key === "id" || key === "syncType") {
                schemaObj.id = storeObj[key];
                continue;
            }

            let storeProp: any = storeObj[key];
            const isStorePropField = (storeProp.value !== undefined);

            // When type does not contain a object create one.
            if (schemaTypeProp === null) {
                if(isStorePropField) {
                    schemaTypeProp = new StoreField();
                } else {
                    schemaTypeProp = new StoreObject();
                }
            }
            schemaObj[key] = schemaTypeProp;

            schemaTypeProp.id = storeProp.id;
            if (isStorePropField) {
                schemaTypeProp.value = storeProp.value;
            }
        }

        return schemaObj;
    }

    return null;
}

export function getRoot<T extends IStoreObject>(rootType: { new (): T; }): T {

    // Check if root exists in memory.
    let root: T = _data[rootId];
    if (root) { return root; }

    // Check if root exists in local storage
    root = getObjectFromLocalStorage<T>(rootId, rootType);
    if (root) { return root; }

    // This is the first time the app boots, so return a new instance of the root type.
    root = new rootType();
    return root;
}

/**
 * This function is used to sync store changes to cloud storage.
 * Each change to the store is saved to local or cloud storage (based on the app schema),
 * Changes are immediately saved to local storage and batches for sync with cloud storage.
 * When this function is called the cloud storage will directly sync to cloud storage.
 */
export function sync() {

}

export enum SyncType {
    memory = 1, // Store object only in memory.
    local,      // Store object in memory and local storage.
    cloud       // Store object in memory, local storage and cloud storage.
}

export interface IChangeEvent {
    propertyName: string;
    newValue: any;
    oldValue: any;
}

export interface IStoreObject {
    /**
     * Unique id in the store.
     */
    id: string;
    onChange: (evt: IChangeEvent) => void;
    syncType: SyncType;

    // TODO: add validation rules.
}

/**
 * To allow for lazy loading of data, each property (except 'id') in a StoreObject will be converted to getters and setters.
 * The getter will get the data from localstorage if it is not loaded yet.
 */
export class StoreObject implements IStoreObject {
    id: string;
    onChange: (evt: IChangeEvent) => void;
    syncType = SyncType.local;

    constructor() {
        const self: StoreObject = this;
        
        const onChangeHandlers: Array<(evt: IChangeEvent) => void> = [];
        function onChange(evt: IChangeEvent) {
            const handlersCount = onChangeHandlers.length;
            for (let i = 0, length = handlersCount; i < length; i++) {
                const handler = onChangeHandlers[i];
                handler(evt);
            }
        }

        Object.defineProperty(self, 'onChange', {
            get: function () {
                return onChange;
            },
            set: function (handler: (evt: IChangeEvent) => void) {
                onChangeHandlers.push(handler);
            },
            enumerable: true
        });
    }
}


export interface IStoreField<T extends boolean | number | Date | string | Array<IStoreObject>> extends IStoreObject {
    /**
     * Unique id in the store.
     */
    id: string;
    onChange: (evt: IChangeEvent) => void;
    value: T;

    // TODO: add validation rules.
}

export class StoreField<T extends boolean | number | Date | string | Array<IStoreObject>> extends StoreObject implements IStoreField<T> {
    public parentId: string;
    public value: T;

    // TODO: add validation rules.

    constructor() {
        super();

        const self: StoreField<T> = this;
        let value: T;

        Object.defineProperty(self, 'value', {
            get: function () {
                return value;
            },
            set: function (newValue: T) {
                if (value !== newValue) {
                    value = newValue;

                    // TODO: when field.value is an array, replace all altering functions by passthrough functions, so when the array is altered, subscribers can be notified.


                    // TODO: update localstorage

                    // TODO: add change event to sync.

                    // Notify watchers
                    self.onChange({
                        newValue: newValue,
                        oldValue: value,
                        propertyName: 'value'
                    });

                    // 
                }
            },
            enumerable: true
        });
    }
}