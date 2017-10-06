import {IAppData, IAccount} from './data'
import { IStoreField, IStoreItem } from './store';
import { boot } from './renderer';
import { INode } from './virtual.dom';

window.addEventListener('unhandledrejection', function handlUnhandledrejection (event) {
    if(console) {
        console.log(event);
    }
});

export async function body(appData:IAppData): Promise<INode> {
    const nodes: Array<INode> = [];
    const node: INode = {
        deps: appData.account.isAuthenticated,
        name: "body",
        nodes: nodes,
        refresh: body
    };

    if(appData.account.isAuthenticated.value === true) {
        const mod = await import('./components/feed');
        const feedNode = await mod.feed(appData);
        nodes.push(feedNode);
    } else {
        const mod = await import('./components/login')
        const loginNode = await mod.login(appData.account);
        nodes.push(loginNode);
    }
    
    return node;
}

export function start() {
    console.log("start application");

    const appData: IAppData = {
        account: {
            isAuthenticated: { value: null },
            name: { value: null },
            password: { value: null }
        }
    };

    boot(document.body, body, appData);      
}

start();