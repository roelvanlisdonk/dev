import { INode } from "../libraries/am/virtual.dom/node";
import { container } from "../libraries/am/components/styles";
import { text } from "../libraries/am/components/text";
import { IResource } from "../libraries/am/common/resource";

const tagName: string = "feed";

export const resources = {
    feed: ({ en: "Feed", nl: "Feed" } as IResource)
};

export function feed(): INode {
    const node: INode = {
        classes: [container],
        nodes:[{render: text, when: resources.feed}],
        name: tagName
    };
    return node;
}