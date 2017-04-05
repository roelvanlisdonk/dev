# Storage

## Index
* Each object will be stored on am.store.data.index by its id.
* Based on methadata found on StoreField, objects are stored in localstorage or synced to server.
* StoreObjects that should be stored on localstorage will be imediately stored in localstorage when changed.
* StoreObjects that should be synced to the server will be added to am.store.data.sync: Array<StoreObject>
* After sync the am.store.data.sync will be cleared

## Serialisation - Deserialisation
* Don't use StoreField.typeId, use StoreField.aliases: Array<string>, add an allias when field is renamed.


* We have to loop all properties so we can convert them to getters and setters.
* When looping we can get the correct 
* During deserialisation, return StoreObjects / StoreFields, when a pro
* Always use a Schema/Root class, this class will be saved in localstorage as 'root':
* Use getters and setters for StoreObject properties, so we can lazyload data from localstorage.





    



