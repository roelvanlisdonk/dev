import {IAccount} from '../data'
import { IStoreField, IStoreItem } from '../store';
import { button } from './button';
import { input } from './input';
import { INode } from '../virtual.dom';

export async function login(account:IAccount): Promise<INode> {
    const node: INode = {
        nodes: [
            {text: "Gebruikersnaam"},
            input(account.name),
            {text: "Wachtwoord"},
            input(account.password),
            button({onclick: onInloggenClick, text: "Inloggen"})
        ],
        name: "login"
    };

    return node;
}

function onInloggenClick(evt: any): void {
    console.log("Inloggen!!!");
}