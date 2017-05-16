

# Note - by default, when the property "when" is set, watch will be set to "shallow" which means, when one of the properties in "when" changes it will be rerendered.
# Note - watch can be also be set to "no" or "deep".
# Note - a component function can return a IVirtualDomNode or a Array<IVirtualDomNode> and set it's property "watch" to "no | shallow | deep", which van be overridden by the end user.

# Note - The specific render function of an IPart (eg. attribute.render) should only handle adding / updating the IPart.
# Note - The specific remove function of an IPart (eg. attribute.remove) should only handle removing the IPart.
# Note - The general IPart.render should destruct the given IPart | IPartsRenderer into calls to the specific render functions.

interface IObservalbeFn<TInput, TResult> {
    fn: (input: TInput) => TResult;
    input: TInput
}

interface IAttribute {
    name: string;
    // When null attribute will not be rendered, when empty string only attribute name will be redered.
    value: string | IObservableField<string> | IObservableFn<any, string>;
}

interface IClass {
    name: string;
    style: IStyle;
}

interface IEvent {
    name:  string | IObservableField<string> | IObservableFn<any, string>
    handler: fn(e: Event): void | IObservableField<IStyle> | IObservableFn<any, IStyle>
}

interface INode {
    attributes: Array<IAttribute | IPartRenderer<IAttribute> | IPartsRenderer<IAttribute>>;
    classes: Array<IClass | IPartRenderer<IClass> | IPartsRenderer<IClass>>;
    events: Array<IEvent | IPartRenderer<IEvent> | IPartsRenderer<IEvent>>;
    media: Array<IMedia | IPartRenderer<IMedia> | IPartsRenderer<IMedia>>;
    name: string;
    nativeNode?: any;
    nodes: Array<INode | INodeRenderer | IPartsRenderer<INode>>;
    rules: Array<IRule | IPartRenderer<IRule> | IPartsRenderer<IRule>>;
    styles: Array<IStyle | IPartRenderer<IStyle> | IPartsRenderer<IStyle>>;
}

interface INodeRenderer extends IPartRenderer<INode> {
    attributes: Array<IAttribute | IPartRenderer<IAttribute> | IPartsRenderer<IAttribute>>;     // Will be merged with the rendered node.
    classes: Array<IClass | IPartRenderer<IClass> | IPartsRenderer<IClass>>;                    // Will be merged with the rendered node.
    events: Array<IEvent | IPartRenderer<IEvent> | IPartsRenderer<IEvent>>;                     // Will be merged with the rendered node.
    media: Array<IMedia | IPartRenderer<IMedia> | IPartsRenderer<IMedia>>;                      // Will be merged with the rendered node.
    rules: Array<IRule | IPartRenderer<IRule> | IPartsRenderer<IRule>>;                      // Will be merged with the rendered node.
    styles: Array<IStyle | IPartRenderer<IStyle> | IPartsRenderer<IStyle>>;                     // Will be merged with the rendered node.
}

type IWhen = IObservableField<boolean> | IObservableNotField<boolean> | IObservableFn<any, boolean> | IObservable;

interface IPartRenderer<T> {
    render: T | fn(input:IWhen): T;
    rendered?: T;
    when: IWhen;
}

interface IPartsRenderer<T> {
    render: Array<T | IPartRenderer<T> | IPartsRenderer<T>> | fn(input:IWhen): Array<T | IPartRenderer<T> | IPartsRenderer<T>>;
    rendered?: Array<T>; // When the parts are rendered, they are stored in this property, so when the parts are re-rendered, the previous parts can be removed.
    when: IWhen;
}

const node: INode = {
    attributes: [
        // No rerendering
        {name: "attr1", value: "This is the description"}

        // When "myObservableFieldValue" changes, the attribute value will be rerendered.
        {name: "attr1", value: myObservableFieldValue}
         // When one of the "user" properties changes, the attribute value will be rerendered.
        {name: "attr1", value: { fn: getAttr1Value, input: user}}

        // When "user.isAuthenticated" changes, the attribute will be rerendered.
        {render:{name: "attr1", value: "This is the description"}, when:user.isAuthenticated},
        // When "myObservableFieldValue" changes, the attribute value will be rerendered.
        // When "user.isAuthenticated" changes, the attribute will be rerendered.
        {render:{name: "attr2", value: myObservableFieldValue}, when:{not: user.isAuthenticated}},
        // When one of the "user" properties changes, the attributes will be rerendered.
        {render: getAttributes, when: user}         
    ],
    classes: [
        // The same as "attributes", only use IClass:
        {name: "my-class-1", style={}}
    ],
    events: [
        // The same as "attributes", only use IEvent:
        {name: "click", handler: fn},
    ],
    media: [
        // The same as "attributes", only use IMedia:
        {query: "media-600", rules:[]}
    ],
    nativeNode?: any,
    nodes: [
        // The same as "attributes", only use INode:
        {render:{name: "div", attributes:[], classes:[row]}, when:user.isAuthenticated},
        // When one of the "user" properties changes, the getNode will be rerendered, attributes, classes etc. will be merged with the rendered node.
        {render: getNode, when: user, attributes:[], classes:[row]}
        // When one of the "user" properties changes, the getListItems will be rerendered.
        {render: getListItems, when: user, attributes:[], classes:[row]} 
    ],
    rules: [
        // The same as "attributes", only use IRule:
        {selector: "", style: {}}
    ],
    styles: [
        // The same as "attributes", only use IStyle:
        // Note that value of each attribute on an IStyle can be string |IObservableField<string> | IObservableFn<any, string>
        {paddingLeft: "10px"}  
    ]
    name: tagName
};

function getListItems(input: any): Array<IVirtualDomNode> {

}





# To do
- Remove all listeners created when rendering a node (prevent memory leaks).
- Setup rerendering for IAttr.value

# Styling changes
- Change classes to type string | ICssClass
- ICssClass: name, selector, style


# Node changes
- Change attrs
- Change classes
- Change events
- Add media
- Change nodes
- Add rules
- Add styles
    







# TODO: in code
- Dom.renderNode - Setup node rerendering if text is an IObservableField.
- Dom.renderNode - Dynamically load component when INode.component = string.
- Dom.renderNode - Use createElementNs when IVirtualDomNode.ns is set.
- Dom.renderAttr - Setup attr rerendering if attr.value is an IObservableField or an IObservableFn
- Dom.renderClass - Setup attr rerendering if class.name is an IObservableFn
- IClass.name - Add IObservableFn as type
- IVirtualDomNode - vervang isSvg door ns en zet deze bij rendering.
- Styles.createRule(selector: string, style1, style2, ...) : ICssRule;
- Renderer - create IRenderer interface.
- Dom.boot set IRenderer in stylesheet.ts, so we can add style to stylesheet



#Store
- Only use interfaces for describing store data.
- store.get queries the store bases on interfaces (json data)
    - e.g. store.get({ user: { friends: {}}}) returns root.user.friends
    - The function call is synchronous and return the observables found in memory or local storage,
      in the background the backend is queried and data is changed in the store.



## IAsyncTask
- Create afterAll(tasks: Array<IAsyncTask>, fn: IAfterAllFn): IAsyncTask
- Create abort(task: IAsyncTask);
- Create abortAll(tasks: Array<IAsyncTask>);
- Create timout(): IAsyncTask
- Create interval(): IAsyncTask
- /common/http/fetch should return IAsyncTask

# Animation

Button click
standard:
    transition-duration: 167ms;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0s;
    transform: scale(1);

onClick:
    transform: scale(0.9);



# Other
- Fix System.import(name, succes, fail, abort, state);
    - Dynamically load polyfill (classList, Object.keys) with System.import when needed.
- Fix http.fetch(data, succes, fails, abort, state);
- Add images map (svg with png fallback) to components folder
- Create button-bar component 4 icons 25% width
- Use images in button-bar
- Rename stub folder to cloud folder
- Move components folder to client folder.
- Use own oauth for test users
- system.ts, when executing modules, use a "seen" list to support circular references.AsyncTask
- system.ts, the System.import function should get 2 extra parameters, succes and failAsyncTask
- list files on disk (see micrososft code push - https://github.com/Microsoft/cordova-plugin-code-push)AsyncTask
- login with facebook list friendsAsyncTask
- deploy to cdnAsyncTask
- update from cdnAsyncTask
- pat en mart id toevoegen aan publishing profile.AsyncTask
- ipa sturen naar pat en martAsyncTask
- Send clear text over https, because we don't want the salt on the client.
- SHA256 password hash on server.
- using https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens 














## Hotreload
Note: In dev hotreloading is not that important, because all state is stored localy so when we use livereload and the 
      the page is refreshed the app will be in the same state as before.
      So for version 1 we don't spend time on hotreload.


## Push notification
* Pushnotification in dev without setting up Google Cloud Messaging (GCM) or Apple Push Notification Service (APN):
  http://docs.phonegap.com/develop/push-notifications/


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


6W7S5Q



### Backend
* Has an append only array per user of all change events.
* A change event can contain multiple object and field changes.
    * Creating an object will be one change event.
* Has an key value store containing an entry per StoreObject / StoreField.





# Temp

                          
                            
<div action-button="vm.buttonToonAlleOptions" ng-click="toonAlle()"></div>  
332 item.Equals("TextForAgenda") || 


Deze moeten we donderdag bespreken, want ik krijg hem niet gereproduceerd, de bedragen in het voorbeeld lijken ook niet te kloppen, want in de ene screendump staat contractbedrag 931,30 en in het andere 1003,15.
In dev krijg ik hem iig niet gereproduceerd.

ContractOrInternalActivityOutsidePeriod

ActivitiesAreNotAvailable
txtEditUsername
txtUserName
Inloggen met CBergsma - test
Employersname - 's Heeren Loo
Text for bill - Olofsen Dhr. L.E.O. Kostenplaats 21577 Regio Zuidwest Nederland 1
Christine Bergsma, C.P.W.



http://shop.oreilly.com/product/0636920028253.do


TextForBill
TextForAgenda

if

const string sQuery = @"
                    SELECT TOP 1 Start FROM dbo.Appointments WHERE ContractID = :contractId AND IsDeleted = 0 ORDER BY Start ASC";

                var query = new ScalarQuery<DateTime?>(typeof(ContractsDAO), QueryLanguage.Sql, sQuery);
                query.SetParameterList("contractId", new[] { contractId }.ToList());
                return (DateTime?)(ActiveRecordMediator.ExecuteQuery(query));
            }


       
