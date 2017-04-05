export function remove(arr: Array<any>, item: any) {
    const index = arr.indexOf(item);
    
    if (index !== -1) {
        arr.splice(index, 1);
    }
}