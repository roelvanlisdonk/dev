import { cuid } from '../common/cuid';

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




// export function storeModule() {
    
// }

// const _index: any = {}; // Array<IStoreObject>
// const _types: any = {}; // Each type should be registerd in the store so we can handle schema changes.


// // To support renaming of types and fields, we expect objects in the store to be of type IStoreObject
// // Fields of a IStoreObject can only be of type IStoreField (except for the readonly fields "id" and "typeId".

// // Change the data stored localy to match the new type schema.
// export function fixDataBasedOnSchemaChanges(types: Array<IStoreType>) {
//     throw new Error("Not implemented exception.");
// }

// function cloneSimpleType(obj: any): any {
//     let copy: any;

//     // Handle boolean, number, string, null and undefined.
//     // TODO: NaN.
//     if (null == obj || "object" != typeof obj) { 
//         return copy;
//     };

//     // Handle Date
//     if (obj instanceof Date) {
//         copy = new Date();
//         copy.setTime(obj.getTime());
//         return copy;
//     }

//     throw new Error(`Unable to clone simple type. This is most likely cast by IStoreField.value containing In the curren version of the store, arrays can only have types (boolean, Date, number, string) and `);
// }

// export function get<T>(id: string): T {
//     const obj: any = _index[id];   

//     // Only handle "typed" objects.
//     if (obj instanceof Object && obj.id && obj.typeId) {
//         const copy: any = {
//             id: obj.id,
//             typeId: obj.typeId
//         };

//         for (let propName in obj) {
//             if (obj.hasOwnProperty(propName)) {
//                 const field: IStoreField = obj[propName];

//                 // Only handle IStoreField.
//                 if("object" === typeof field && field.fieldId) {
                    
//                     const fieldCopy: IStoreField = {
//                         fieldId: field.fieldId,
//                         value: null
//                     };

//                     // Handle arrays.
//                     if (field.value instanceof Array) {
//                         const sourceArray = field.value;
//                         let destArray: Array<string> = [];
//                         for (let i = 0, len = sourceArray.length; i < len; i++) {
//                             // Array items should be of simple types!.
//                             destArray[i] = cloneSimpleType(sourceArray[i]); 
//                         }
//                         fieldCopy.value = destArray;
//                     } else {
//                         fieldCopy.value = cloneSimpleType(field.value);
//                     }

//                     copy[propName] = fieldCopy;
//                 }
//             }
//         }
//         return copy;
//     }

//     throw new Error(`Unable to get store object ${id}! Its type isn't supported.`);
// }

// export function registerType<T extends IStoreType>(type: { new(): T ;} ): void {
//     const instanceOfGivenConstructorFn = new type();

//     // Register the type on TypeId.
//     const index = instanceOfGivenConstructorFn.typeId.toLowerCase();
//     _types[index] = instanceOfGivenConstructorFn;
// }

// export function save(storeObject: IStoreObject) {
//     if(storeObject && storeObject.id) {
        
//         //TODO: save change to changeLog.

//         const current = _index[storeObject.id];
//         if(!current) {
//             _index[storeObject.id] = storeObject;
//         }

//         for (let fieldName in storeObject) {
//             saveField(storeObject, current, fieldName)
//         }
        
//         return;
//     }

//     throw new Error("Given parameter is not an IStoreObject.");
// }

// function saveField(storeObject: IStoreObject, current: IStoreObject, fieldName: string) {
//     const storeObjectAsAny = storeObject as any;
//     const currentAsAny = current as any;
//     //TODO: save change to changeLog.
//     if (storeObject.hasOwnProperty(fieldName)) {
//         const field = storeObjectAsAny[fieldName];
//         const fieldIsAStoreField = ("undefined" !== field.id && "undefined" !== field.value);

//         // Only handle IStoreFields
//         if(fieldIsAStoreField) {
//             const valueIsAnStoreObject = (field.value.id);
//             if(valueIsAnStoreObject) {
//                 save(field.value);
//                 return;
//             }

//             const valueIsAnArray = field.value instanceof Array;
//             if(valueIsAnArray) {
//                 // TODO: notify dependencies
//                 // TODO: store array items.
//                 return;
//             }

//             // TODO: notify dependencies
//             currentAsAny[fieldName] = storeObjectAsAny[fieldName];
//         }
//     }
// }

// export interface IStoreType {
//     readonly typeId: string; // Application wide unique id.
// }

// export interface IStoreObject extends IStoreType {
//     readonly id: string; // Application wide unique id.
// }

// export interface IStoreField {
//     readonly fieldId: string; // Application wide unique id.
//     value: Array<boolean | Date | number | string> | boolean | Date| IStoreObject | number | string;
// }

// export interface IStoreBooleanField extends IStoreField {
//     value: boolean;
// }

// export interface IStoreDateField extends IStoreField {
//     value: Date;
// }

// export interface IStoreNumberField extends IStoreField {
//     value: number;
// }

// export interface IStoreStringField extends IStoreField {
//     value: string;
// }

// export interface IStoreBooleanArrayField extends IStoreField {
//     value: Array<boolean>;
// }

// export interface IStoreDateArrayField extends IStoreField {
//     value: Array<Date>;
// }

// export interface IStoreNumberArrayField extends IStoreField {
//     value: Array<number>;
// }

// export interface IStoreStringArrayField extends IStoreField {
//     value: Array<string>;
// }