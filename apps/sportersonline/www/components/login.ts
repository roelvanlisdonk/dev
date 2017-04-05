import { IObservableField } from "../libraries/am/common/observable";
import { INode } from "../libraries/am/virtual.dom/node";
import { IResource } from "../libraries/am/common/resource";
import { container } from "../libraries/am/components/styles";
import { text } from "../libraries/am/components/text";
import { button, IButtonInput} from "../libraries/am/components/button";
import { settingsIcon } from "../libraries/am/components/icons/settings";
import { IUser } from "../schema/user";
import { save } from "../libraries/am/storage/store";

export const tagName: string = "login";

export const resources = {
    execute: ({ en: "Execute", nl: "Uitvoeren" } as IResource),
    signIn: ({ en: "Sign in", nl: "Inloggen" } as IResource)
};

export function login(isAuthorized: IObservableField<boolean>): INode {
    if (!isAuthorized) { throw new Error("Please provide isAuthorized."); }

    function onExectueClick() {
        console.log("onExectueClick");
    }

    function onSignInClick() {
        // TODO: check authorization
        isAuthorized.value = true;
        save(isAuthorized);
    }

    const node: INode = {
        classes: [container],
        nodes: [
            { render: text, when: resources.signIn },
            { render: button, when: ({ icon: settingsIcon,  onclick: onSignInClick, text: resources.signIn} as IButtonInput) },
            { render: button, when: ({ onclick: onExectueClick, text: resources.execute} as IButtonInput) }
        ],
        name: tagName
    };

    return node;
}

export interface ILoginInput {
    user: IUser;
}