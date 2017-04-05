# Resources
* Modules can use shared resoureces, by importing them.
* Modules can export there own resources, so they can be overwritten.
* When a module is a component the resources will be placed on the options
  , so they can be overwritten per instance of a component
  , when you want to overwrite it for all instances of a component, just declare a options with the correct settings en use that on all instance creations.

* Resources are assets, that means:
    * They are immutable, when the resoureces changes and it is deployed to the cdn it gets a unique name, for cachebusting).
    * They are deployed to a cdn
    * They are .
* Resources will be cachebusted as normal assets
* Resources will be updated like normal assets and will be placed on the cdn.
* There are shared resources that should be imported to use them.
* Modules can have there own resources, so not all resources have to be loaded, when not needed
* Modules should export resources as const resources: {}; where each property is an IResource.

## vNext
* Gulptask, that creates one resources file containing all the resources, so it can be translated by an other company.


```TypeScript

/////////////////////////// In ./am/resources.ts


/** 
 * When this modules loads, the defaultLocale will be set to the locale of the OS.
 * Can be set by the app to set app wide locale.
 * When this variabele is changed the app, should be rerendered to reflect changes.
 * The resources are NOT made observables, because changing the locale is not something that happens all the time, so the performance impact would be a burden.
 */
export let defaultLocale = getOSLocale();

function getOSLocale(): string {
    return "en";
}

export function getText(resource: IResource): string {
    return resource[defaultLocale];
}

export interface IResource {
    nl?: string;
    nl-NL?: string;
    en?: string;
    en-US?: string;
}




/////////////////////////////////////// In an app module:
const resources = {
    ok: getText({ nl: 'ok', en: 'ok' });
};

// During virutal dom creation:

const div = {
    attr: {
        title: resources.ok
    }
};


```


