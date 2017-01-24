
# Boot
* An am application is started by calling the boot from a platform.

```TypeScript

// main.ts

import { boot } from './am/platforms/dom'

const rootNativeNode = document.querySelector("html");
const rootVirtualDomNode: VirtualDomNode = boot(rootNativeNode);

// Now we can start adding childs to the rootVirtualDomNode...

```