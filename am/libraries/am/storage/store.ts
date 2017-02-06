import { cuid } from '../common/cuid';


export function getRoot() {
    
}


/**
 * This function is used to sync store changes to cloud storage.
 * Each change to the store is saved to local or cloud storage (based on the app schema),
 * Changes are immediately saved to local storage and batches for sync with cloud storage.
 * When this function is called the cloud storage will directly sync to cloud storage.
 */
export function sync() {

}

export interface IStoreObject {
    /**
     * Unique id in the store.
     */
    id: string;
    onChange: () => void;

    // TODO: add validation rules.
}

export interface IStoreField extends IStoreObject {
    /**
     * Unique id in the store.
     */
    id: string;
    onChange: () => void;
    value: boolean | number | Date | string;

    // TODO: add validation rules.
}

export interface IStoreArray<T> extends Array<T> {
    
}

/**
 * To allow for lazy loading of data, each property (except 'id') in a StoreObject will be converted to getters and setters.
 * The getter will get the data from localstorage if it is not loaded yet.
 */
export class StoreObject implements IStoreObject {
    public id: string;
    public onChange: () => void;

    constructor() {
        const self: StoreObject = this;
        self.id = cuid();

        const _onChangeHandlers: Array<() => void> = [];
        function _onChange() {
            
            const changeHandlers = _onChangeHandlers;
            for(let i = 0, length = changeHandlers.length; i < length; i++) {
                const handler = changeHandlers[i];
                handler();
            }
        }
        Object.defineProperty(self, 'onChange', {
            get: function () { 
                return _onChange;
            },
            set: function(handler: () => void) {
                _onChangeHandlers.push(handler);       
            },
            enumerable: true
        }); 
    }
}

export class StoreField extends StoreObject implements IStoreField {
    public parentId: string;
    public value: boolean | number | Date | string;
    
    // TODO: add validation rules.

    constructor() {
        super();
        const self: StoreField = this;
        let _value: boolean | number | Date | string;

        Object.defineProperty(self, 'value', {
            get: function () { 
                return _value;
            },
            set: function(newValue: boolean | number | Date | string) {
                _value = newValue;
                if(_value !== newValue) {
                    _value = newValue;

                    // TODO: update localstorage

                    // TODO: add change event to sync.

                    // Notify watchers
                    self.onChange();

                    // 
                }         
            },
            enumerable: true
        });
    }
}

