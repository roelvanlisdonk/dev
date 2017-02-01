# To do


## CSS



## Resources


## Sync


## Virtual Dom

## Authentication


## Deployment



## Hotreload
Note: In dev hotreloading is not that important, because all state is stored localy so when we use livereload and the 
      the page is refreshed the app will be in the same state as before.
      So for version 1 we don't spend time on hotreload.


## Push notification
* Pushnotification in dev without setting up Google Cloud Messaging (GCM) or Apple Push Notification Service (APN):
  http://docs.phonegap.com/develop/push-notifications/
 





* Create StoreRoot class with property user (property should have saveToLocalStorage = true).
* Add StoreRoot class to store with sync to localstorage
* Get StoreRoot  from store (lazy loading user, only when it is rendered)
* convert dom to virtual dom
* set user as dep for div
* render div with current username



fix - Object reference not set to an instance of an object. in C:\Projects\ZvdZ\mijnzvdz\Service\Providers\DeelherstelProvider.cs:line 110
fix - deelherstel - historie spinner niet op juiste plek



CSS
* each component should have all used classnames inside its options
* each component should have all cssRules inside its options
* A css rule should have a selector string.


## Data flow
* The app schema defines the dataflow.
* on each StoreObject / StoreField you set a storeType (0 === memory only, 1 === memory and localstorage, 2 === memory and localstorage and cloudstorage).
* client and server should have a append only array of cuids containing all the field
* move data in system to am.store.data.ts
* load am.store.data before any other thing inside system and use it.


### Frontend
* Has an append only array per user of all change events from the last sync on.
    * When a sync takes place:
        * All local changes will be sent to the server
        * The server send changes back that will be applied to the store.
        * After a sync the frontend array will be empty the backend array will be updated.
* A change event can contain multiple object and field changes.
    * Creating an object will be one change event.
* Has an key value store containing an entry per StoreObject / StoreField.
* When a change takes place, that involves multiple users, a backend funtion will add these changes to the involved users change event arrays.




### Backend
* Has an append only array per user of all change events.
* A change event can contain multiple object and field changes.
    * Creating an object will be one change event.
* Has an key value store containing an entry per StoreObject / StoreField.










