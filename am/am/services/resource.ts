

export interface IResource {
    en?: string;
    nl?: string;
}


export function addResource(resource: IResource): string {

    return "localized string";
}

// Each property will be converted to accessors, so we can dynamically change language at runtime
export function convertToObservableResource() {

}