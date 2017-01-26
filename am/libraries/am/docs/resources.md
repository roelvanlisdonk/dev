# Resources

* Resources are considered assets, like code en styling, and are not considered data.
* Resources will be updated like normal assets.
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


