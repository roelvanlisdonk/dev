import { boot } from "./libraries/am/platform/dom";
import { VirtualDomNode } from "./libraries/am/ui/virtual.dom";
import { getRoot } from "./libraries/am/storage/store";
import { Root } from "./schema/root";

function createRootVirtualDomNode(): VirtualDomNode {
    const node = new VirtualDomNode();

    const root: Root = getRoot(Root);
    if(root.user.isAuthorized())
    {
        console.log("Show main page");
    } else {
        console.log("Show login page");
    }

    return node;
}

boot(document.body, createRootVirtualDomNode);

export const a = "";