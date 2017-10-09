import {IAppData} from '../data'
import { IStoreField, IStoreItem } from '../store';
import { input } from './input';
import { INode } from '../virtual.dom';

export async function feed(appData:IAppData): Promise<INode> {
    const node: INode = {
        name: "feed",
        nodes:[
            {text: "Het feed component"}
        ]
    };
    
    return node;
}