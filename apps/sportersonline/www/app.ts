import { boot } from "./libraries/am/platform/dom/boot";
import { not } from "./libraries/am/common/observable";
import { INode } from "./libraries/am/virtual.dom/node";
import { getRoot } from "./libraries/am/storage/store";
import { IRoot } from "./schema/root";
import { container } from "./libraries/am/components/styles";
import { login, ILoginInput } from "./components/login";
import { feed } from "./components/feed";
import { settingsIcon } from "./libraries/am/components/icons/settings"

export const tagName: string = "app";

export function app(): INode {
    const root: IRoot = getRoot<IRoot>() || createRoot();

    const node: INode = {
        classes: [container],
        nodes: [
            { render: login, when: not(root.user.isAuthorized) },
            { render: feed, when: root.user.isAuthorized }
        ],
        name: tagName
    };
    
    return node;
}

function createRoot(): IRoot {
    const root: IRoot = {
        user: {
            authorizationToken: { value: null },
            email: { value: null },
            isAuthorized: { value: false },
        }
    };

    return root;
}

boot(document.body, app);