# Schema


* The schema folder contains types files.
* Each file contains a class extending StoreObject
* A StoreObject contains a property typeId, this is the unique es6 module name like './schema/user'
* The store can convert a poco JavaScript object to a StoreObject, by using System.import and the typeId.

