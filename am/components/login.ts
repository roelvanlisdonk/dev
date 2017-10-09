import {IAccount} from '../data'
import { IStoreField, IStoreItem } from '../store';
import { input } from './input';
import { INode } from '../virtual.dom';

export async function login(account:IAccount): Promise<INode> {
    const node: INode = {
        nodes: [
            {text: "Gebruikersnaam"},
            input(account.name),
            {text: "Wachtwoord"},
            input(account.password)
        ],
        name: "login"
    };

    return node;
}