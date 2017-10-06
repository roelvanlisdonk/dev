import {IAppData, IAccount} from "./data"
import { IStoreField, IStoreItem } from "./store";
import { boot } from "./renderer";
import { INode } from "./virtual.dom";
import { block } from "./components/styles";

window.addEventListener("unhandledrejection", function handlUnhandledrejection (event) {
    if(console) {
        console.log(event);
    }
});

export async function app(appData:IAppData): Promise<INode> {
    const nodes: Array<INode> = [];
    const node: INode = {
        attributes:[{name:"title", value: "This is an AM app."}],
        classes:[block],
        deps: appData.account.isAuthenticated,
        name: "my-app",
        nodes: nodes,
        refresh: app
    };

    if(appData.account.isAuthenticated.value === true) {
        const mod = await import("./components/feed");
        const feedNode = await mod.feed(appData);
        nodes.push(feedNode);
    } else {
        const mod = await import("./components/login")
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

    const appElement = <HTMLElement>document.body.getElementsByTagName("my-app")[0];
    boot(appElement, app, appData);      
}

start();