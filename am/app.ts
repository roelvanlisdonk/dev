import * as store from './store';
import * as render from './renderer';
import { input } from './components/input'

window.addEventListener('unhandledrejection', function handlUnhandledrejection (event) {
    if(console) {
        console.log(event);
    }
});

/**
 * Some comments
 * document.getElementsByName("Thing")[0].addEventListener('change', doThing);
 */
function test() {
    const element: HTMLElement = document.getElementsByName("Thing")[0];
}

export function start() {
    console.log("start application");

    var test = store.getItem("");
    // boot(nativeNode, componentFn: IComponentFn, options: IComponentOptions): void;
    // Components can do ajax calls be should only save data to store
    // (store module).getItem(id: string): IStoreItem
    // (store module).getField(id: string): IStoreField
    // Given data (options) execute a component function to create virtual dom.
    // When value changes on an input change the value of the binded value.

    const myStoreField: any {

    }

    const attributeRenderer: any = {

    }
    function hideWhen(options:any): any {

    }
    function myInput(options: any): any {

    }

    function onclick() {

    }
    const someJson: any = {
        tag: "my-app", 
        attributes: {
            hidden: false,
            hidden2: myStoreField,
            hidden3: hideWhen({})
        },
        attributes2: [
            
        ],
        nodes: [
            { tag: "input", attributesvalue: "safddsaf"}
            myInput({ value: myStoreField }),
            myInput({ value: myStoreField })
        ],
        events: {
            onclick: function(e: any, capture?: boolean) {

            }
        }
    };

    
    var element = document.getElementById("my-input");
    element.addEventListener('input', function (e) {
        debugger;
        console.log("keyup event detected! coming from this element:", e.target);
    }, false);
            
}

start();

export interface ILogin {
    name: store.IStoreField<string>;
    password: store.IStoreField<string>;
}

export interface ISportersOnlineData {
    login: ILogin;
}
