# Schema
* The schema folder contains types files.
* The store can convert poco JavaScript objects to a StoreObjects, by using System.import and the typeId.



## User
* User extends IStoreObject
* typeId: string; // is the unique es6 module name containing the User class, like './schema/user' 