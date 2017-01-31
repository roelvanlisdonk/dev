
function getOSLocale(): string {
    return "en";
}

/** 
 * When this modules loads, the defaultLocale will be set to the locale of the OS.
 * Can be set by the app to set app wide locale.
 * When this variabele is changed the app, should be rerendered to reflect changes.
 * The resources are NOT made observables, because changing the locale is not something that happens all the time, so the performance impact would be a burden.
 */
export let defaultLocale: string = getOSLocale();

export function getText(resource: IResource): string {
    return (resource as any)[defaultLocale];
}

export interface IResource {
    nl?: string;
    nlNL?: string;
    en?: string;
    enUS?: string;
}