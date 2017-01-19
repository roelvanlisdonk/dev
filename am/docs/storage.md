# Storage

* StoreObject implements IStoreObject
    * storeId: number; // Unique id in the store
    * validationRules: Array<IValidationRule>;
* StoreArray extends StoreObject implements IStoreArray
    * storeId: string; // Unique id in the stored
    * validationRules: Array<IValidationRule>;
* StoreField extends StoreObject implements IStoreField
    * storeId: string; // Unique id in the stored
    * validationRules: Array<IValidationRule>;
    



