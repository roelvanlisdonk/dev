import {IAppData, IAccount} from './data'
import { IStoreField, IStoreItem } from './store';
import { boot } from './renderer';
import { INode } from './virtual.dom';

window.addEventListener('unhandledrejection', function handlUnhandledrejection (event) {
    if(console) {
        console.log(event);
    }
});

export async function app(appData:IAppData): Promise<INode> {
    let node = null;
    if(appData.account.isAuthenticated.value === true) {
        console.log("loaded feed.");
        const mod = await import('./components/feed');
        node = await mod.feed(appData);
    } else {
        const mod = await import('./components/login')
        node = await mod.login(appData.account);
    }
    return node;
}

export function start() {
    console.log("start application");

    const data: IAppData = {
        account: {
            isAuthenticated: { value: null },
            name: { value: null },
            password: { value: null }
        }
    };

    boot(document.body, app, data);          
}

start();