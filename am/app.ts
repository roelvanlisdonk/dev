import * as store from './store';
import * as render from './renderer';
import { input } from './components/input';
import { IAttributeRenderer } from './virtual.dom';

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
    // boot(nativeNode, component: IComponent, options: IComponentOptions): void;
    // Components can do ajax calls be should only save data to store
    // (store module).getItem(id: string): IStoreItem
    // (store module).getField(id: string): IStoreField
    // Given data (options) execute a component function to create virtual dom.
    // When value changes on an input change the value of the binded value.

    // Bij initiele rendering wordt per attribute en per nodes en per node aangegeven welke data het nodig heeft voor (re)rendering .
    // Bij verandering van data in de store wordt de hele boom afgelopen, indien data veranderd is, dan wordt dat stuk aangepast, zo voorkom je veel onnodig werk onderin de boom.
    // Alleen top level options.properties van het type storeField zorgen ervoor dat er een rerender plaats vindt.
    // Zo hoef je dus ook geen evenlisteners op te zetten.
    // Als component function bouwer kun je dus op basis van je meegeven options, zelf bepalen wat in options komt en zo dus bepalen wanneer de functie opnieuw wordt uitgevoerd.
    // let op dat je ajax calls niet in de componet functions doet, maar alleen helemaal aan het begin en in event handlers.

    const attributeRenderer: any = {

    }

    function hideWhen(options:any): any {
        return {
            options: options,
            render: function () {

            }
        };
    }

    function myInput(options: any): any {

    }

    function onclick() {

    }

    interface IHideOptions {
        level: number;
        color: number;
        width: number;
    }

    const hiddenOptions = {
        color: 1,
        level: 2,
        width: 3
    }

    function isHidden(options: IHideOptions): IAttributeRenderer {
        return {
            options: options,
            render: function(options: IHideOptions) {
                return (options.level > 1 && options.color > 1 && options.width > 1).toString();
            }
        }
    }

    const myApp: any = {
        tag: "my-app", 
        attributes: {
            hidden: false,
            hidden3: isHidden(hiddenOptions)
        },
        attributes2: [
            
        ],
        events: {
            onclick: function(e: any, capture?: boolean) {
                // "this" will be the "myApp" object.
            }
        },
        nodes: [
            { tag: "input", attributesvalue: "safddsaf"}
        ]
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
