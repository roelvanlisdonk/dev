import { IPart, IPartFactory, IPartRenderer } from "./part";

export type EventName =
    // Custom events
    "onadded" |
    "onremoved" |

    // Native events
    "onabort" |
    "onafterprint" |
    "onbeforeprint" |
    "onbeforeunload" |
    "onblur" |
    "oncanplay" |
    "oncanplaythrough" |
    "onchange" |
    "onclick" |
    "oncompassneedscalibration" |
    "oncontextmenu" |
    "ondblclick" |
    "ondevicelight" |
    "ondevicemotion" |
    "ondeviceorientation" |
    "ondrag" |
    "ondragend" |
    "ondragenter" |
    "ondragleave" |
    "ondragover" |
    "ondragstart" |
    "ondrop" |
    "ondurationchange" |
    "onemptied" |
    "onended" |
    "onerror" |
    "onfocus" |
    "onhashchange" |
    "oninput" |
    "oninvalid" |
    "onkeydown" |
    "onkeypress" |
    "onkeyup" |
    "onload" |
    "onloadeddata" |
    "onloadedmetadata" |
    "onloadstart" |
    "onmessage" |
    "onmousedown" |
    "onmouseenter" |
    "onmouseleave" |
    "onmousemove" |
    "onmouseout" |
    "onmouseover" |
    "onmouseup" |
    "onmousewheel" |
    "onmsgesturechange" |
    "onmsgesturedoubletap" |
    "onmsgestureend" |
    "onmsgesturehold" |
    "onmsgesturestart" |
    "onmsgesturetap" |
    "onmsinertiastart" |
    "onmspointercancel" |
    "onmspointerdown" |
    "onmspointerenter" |
    "onmspointerleave" |
    "onmspointermove" |
    "onmspointerout" |
    "onmspointerover" |
    "onmspointerup" |
    "onoffline" |
    "ononline" |
    "onorientationchange" |
    "onpagehide" |
    "onpageshow" |
    "onpause" |
    "onplay" |
    "onplaying" |
    "onpopstate" |
    "onprogress" |
    "onratechange" |
    "onreadystatechange" |
    "onreset" |
    "onresize" |
    "onscroll" |
    "onseeked" |
    "onseeking" |
    "onselect" |
    "onstalled" |
    "onstorage" |
    "onsubmit" |
    "onsuspend" |
    "ontimeupdate" |
    "ontouchcancel" |
    "ontouchend" |
    "ontouchmove" |
    "ontouchstart" |
    "onunload" |
    "onvolumechange" |
    "onwaiting";

export interface IEvent extends IPart {
    name: EventName;
    handler: (evt: any) => void;
}

export interface IEventFactory extends IPartFactory {
    (input: any): IEvent | Array<IEvent>;
}

export interface IEventRenderer extends IPartRenderer
{
    render: IEvent | IEventFactory;
    when: any;
}