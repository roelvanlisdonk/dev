import { boot } from "./libraries/am/platform/dom";
import { VirtualDomNode } from "./libraries/am/ui/virtual.dom";
import { getRoot } from "./libraries/am/storage/store";
import { Root } from "./schema/root";
import { CssClass, CssStyle } from "./libraries/am/ui/styles";
import { login } from "./components/login";
import { feed } from "./components/feed";

/* Globale waarden */
function createRootVirtualDomNode(): VirtualDomNode {
    const node = new VirtualDomNode();
    const root: Root = getRoot(Root);
    
    if (root.user.isAuthorized()) {
        return feed();
    } else {
        return login();
    }
}

boot(document.body, createRootVirtualDomNode);

export const a = "";