import { cuid } from "../common/cuid";
import { isArray } from "../common/validation/is-array"
import { clientStorage } from "./local.storage";
import _data = am.store.data;

const rootId = "am.root";

function getObjectFromLocalStorage(id: string, schemaType: { new (generateCuid?: boolean): IStoreObject; }): IStoreObject {
    const json = clientStorage.getItem(id);

    if (json) {
        const schemaObj: any = new schemaType(false);
        const storeObj = JSON.parse(json);

        const keys = Object.keys(storeObj);
        const keyCount = keys.length;
        for (let i = 0; i < keyCount; i++) {
            const key = keys[i];

            // Check if property exists on give type
            // TODO: check mappings
            let schemaTypeProp = schemaObj[key];
            if (schemaTypeProp === undefined) { continue; }

            // Id will not be observable.
            if (key === "id") {
                schemaObj.id = storeObj[key];
                continue;
            }

            let storeProp: any = storeObj[key];
            const isStorePropField = (storeProp.value !== undefined);

            // When type does not contain a object create one.
            if (schemaTypeProp === null) {
                if(isStorePropField) {
                    schemaTypeProp = new StoreField(false);
                } else {
                    schemaTypeProp = new StoreObject(false);
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

export function getRoot(rootType: { new (generateCuid?: boolean): IStoreObject; }): IStoreObject {

    // Check if root exists in memory.
    let root: IStoreObject = _data[rootId];
    if (root) { return root; }

    // Check if root exists in local storage
    root = getObjectFromLocalStorage(rootId, rootType);
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

    // TODO: add validation rules.
}

/**
 * To allow for lazy loading of data, each property (except 'id') in a StoreObject will be converted to getters and setters.
 * The getter will get the data from localstorage if it is not loaded yet.
 */
export class StoreObject implements IStoreObject {
    public id: string;
    public onChange: (evt: IChangeEvent) => void;

    constructor(generateCuid = true) {
        const self: StoreObject = this;

        // TODO:  make id read only.
        if (generateCuid) {
            self.id = cuid();
        }

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

    constructor(generateCuid = true) {
        super(generateCuid);

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