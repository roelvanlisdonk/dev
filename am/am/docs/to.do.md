# To do

General
* remove services and helpers folders (create feature folders when needed)

System
* fix loader so it can use loads scripts based on the location of the script.
* move data in system to am.store.data.ts
* load am.store.data before any other thing inside system and use it.



Store / LocalStorage
* Don't use StoreField.typeId, use StoreField.aliases: Array<string>, add an allias when field is renamed.
* During deserialisation, return StoreObjects / StoreFields, when a pro
* Always use a Schema/Root class, this class will be saved in localstorage as 'root':
* If we use get and setters for properties then we can lazyload data from localstorage.



Events
* in v1 don't be smart just use addeventlistener, when an event should fired.
* let the browser deal with cleaning the events, when element is removed
* We only deal with cleaning store change event handlers.




