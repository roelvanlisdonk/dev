# Architecture
This document contains the highlevel overview of the app architecture.



## User data stream
* Changes are stored on the server per user as **append only** user data streams.
    * Writers don't block readers
    * Auditing
    * Simple backup
    * Simple per user sharding
    * Data localisation (all data needed by a single user is kept on a **single** node)
    * Simple and unlimited scaling
* Each field change is recorded seperately as a change on the user data streams.
* The user data stream is synced, between app and **cloud storage**.



## App data stream
* Changes to the app state are stored on the **append only** app data stream or on the **append only** user data stream, based on the meta data found in the **schema type classes**.
* Changes to the app data stream are **asyncronously** synced with **localstorage** only.
* Changes to the user data stream are **asyncronously** synced to **localstorage** and **cloud storage**.
* Only the data on the user data stream will be synced to the **cloud storage**.
* If a **StoreField** change should be added to the **user data stream**, is determined by the meta data stored on each schematype class.
* When the app launches the **store** containing **StoreObjects**, **StoreArrays** and **StoreFields** is constructed by processing the app data stream and the user data stream.
* During app runtime changes to the **store** are synced to the app or user data stream.
* During app runtime changes to the **user data stream** are synced to the **store**.



## Azure functions
* Azure functions will be used to:
    * share data between users, by adding change to the user data streams.
    * aggregate monitoring- and reporting data.



## Rendering
* See rendering.md



## Schema type classes
See schema.md



