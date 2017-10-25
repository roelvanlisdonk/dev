import {IAppData, IAccount} from "./data"
import { IStoreField, IStoreItem, saveItem } from "./store";
import { boot } from "./renderer";
import { INode } from "./virtual.dom";
import { block } from "./components/styles";
import { execute } from "./test.framework";

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

async function runTests(){
    let mod = await import("./common/validation/is.function.test");
    mod = await import("./store.test");

    // Run tests
    execute();
}

export function start() {
    console.log("start application");

    const appData = saveItem(<IAppData>{
        account: {
            isAuthenticated: { value: false },
            name: { value: null },
            password: { value: null }
        }
    });

    const appElement = <HTMLElement>document.body.getElementsByTagName("my-app")[0];
    boot(appElement, app, appData);

    runTests();
}

start();