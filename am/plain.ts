namespace plain {
    
    const seperator = "/";

    let documentLocation = getDocumentLocation(document.location.pathname);
    documentLocation = resolve(document.location.pathname.split(seperator).slice(0, -1).join(seperator));
    console.log(documentLocation);

    function getDocumentLocation(pathname: string): string {
        let result = pathname.split(seperator).slice(0, -1).join(seperator);
        if(!result || result === seperator) {
            result = "";
        } else if(result[0] === seperator) {
            result = result.substr(1);
        }
        return result;
    }

    const basePath = "am/test/cuid";
    const path = "./main";
    const resolved = resolve(path);
    console.log(resolved);

    // we asume the basePath is correct.
    function resolve(relativePath: string, basePath?: string): string {
        if(!relativePath) { return ""; }
        
        let resultParts: Array<string> = [];
        if(basePath && basePath.length > 0) {
            resultParts = basePath.split(seperator);
        }
        
        const parts = relativePath.split(seperator);
        
        for(let i = 0, length = parts.length; i < length; i++) {
            const part = parts[i];
            
            if(!part || part === ".") {
                continue;
            }

            if(part === "..") {
                resultParts = resultParts.slice(0, -1);
                continue;
            }

            resultParts.push(part)
        }
        return resultParts.join(seperator);
    }
}
