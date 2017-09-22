import * as store from './store';
import * as render from './renderer';


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

    // boot(nativeNode, componentFn: IComponentFn, options: IComponentOptions): void;
    // Components can do ajax calls be should only save data to store
    // (store module).getItem(id: string): IStoreItem
    // (store module).getField(id: string): IStoreField
    // Given data (options) execute a component function to create virtual dom.
    // When value changes on an input change the value of the binded value

}


start();

export interface ILogin {
    name: store.IStoreField<string>;
    password: store.IStoreField<string>;
}


export interface ISportersOnlineData {
    login: ILogin;
}
