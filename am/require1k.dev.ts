'use strict';

/**
 * This loader is based on require1k with the following modifications:
 * - Catched exceptions will be rethrown in function R
 * - Added strict mode
 * 
 * Notes
 * - To load app modules, start path with a ".", e.g. "./my-module"
 * - To load "node_modules", do NOT prefix the path, e.g. "jquery/dist/jquery"
 * 
 */

// When the process of loading a module is started, a ModuleInfo object will be added to this index, to prevent "repetitive" loading of modules.
const MODULES: ModuleInfoIndex = {};

// By using a named "eval" most browsers will execute in the global scope.
// http://perfectionkills.com/global-eval-what-are-the-options/
const globalEval = eval;

// An "base" element is added to the header to correctly resolve relative paths.
const baseElement: HTMLBaseElement = document.createElement("base");
document.head.appendChild(baseElement);

// This "anchor" element is only used to resolve relative paths to absolute url paths.
// E.g. "./app" will resolve to "https://my-app.com/app.js".
const relativeElement: HTMLAnchorElement = document.createElement("a");


// Loads the given module and all of it dependencies, recursively
    // - module         The module object
    // - callback       Called when everything has been loaded
    // - parentLocation Location of the parent directory to look in. Only given
    // for non-relative dependencies
    // - id             The name of the dependency. Only used for non-relative
    // dependencies
    function deepLoad(module: any, callback: any, parentLocation?: any, id?: any) {
        // If this module is already loading then don't proceed.
        // This is a bug.
        // If a module is requested but not loaded then the module isn't ready,
        // but we callback as if it is. Oh well, 1k!
        if (module.g) {
            return callback(module.e, module);
        }

        var location = module.g = module.l;

        var request = new XMLHttpRequest();
        request.onload = function (): any {
            let deps: any;
            let count: any;
            if (request.status == 200 || module.t) {
                // Should really use an object and then Object.keys to avoid
                // duplicate dependencies. But that costs bytes.
                deps = [];
                (module.t = module.t || request.response).replace(/(?:^|[^\w\$_.])require\s*\(\s*["']([^"']*)["']\s*\)/g, function (_: string, id: string) {
                    deps.push(id);
                });
                count = deps.length;
                function loaded() {
                    // We call loaded straight away below in case there
                    // are no dependencies. Putting this check first
                    // and the decrement after saves us an `if` for that
                    // special case
                    if (!count--) {
                        callback(undefined, module);
                    }
                }
                deps.map(function (dep: string) {
                    deepLoad(
                        resolveModuleOrGetExports(module.l, dep),
                        loaded,
                        // If it doesn't begin with a ".", then we're searching
                        // node_modules, so pass in the info to make this
                        // possible
                        dep[0] != "." ? location + "/../" : undefined,
                        dep
                    );
                });
                loaded();
            } else {
                // parentLocation is only given if we're searching in node_modules
                if (parentLocation) {
                    // Recurse up the tree trying to find the dependency
                    // (generating 404s on the way)
                    deepLoad(
                        module.n = resolveModuleOrGetExports(parentLocation += "../", id),
                        callback,
                        parentLocation,
                        id
                    );
                } else {
                    module.e = request;
                    callback(request, module);
                }
            }
        };

        // If the module already has text because we're using a factory
        // function, then there's no need to load the file!
        if (module.t) {
            request.onload(null);
        } else {
            request.open("GET", location, true);
            request.send();
        }
    }

    // Save bytes by combining two functions
    // - resolveModule which resolves a given relative path against the given
    //   base, and returns an existing or new module object
    // - getExports which returns the existing exports or runs the factory to
    //   create the exports for a module
    function resolveModuleOrGetExports(baseOrModule: any, relative?: any, resolved?: any): any {
        // This should really be after the relative check, but because we are
        // `throw`ing, it messes up the optimizations. If we are being called
        // as resolveModule then the string `base` won't have the `e` property,
        // so we're fine.
        if (baseOrModule.e) {
            throw baseOrModule.e;
        }

        // If 2 arguments are given, then we are resolving modules...
        if (relative) {
            baseElement.href = baseOrModule;
            // If the relative url doesn't begin with a ".", then it's
            // in node_modules
            relativeElement.href = relative[0] != "." ? "./node_modules/" + relative : relative;
            resolved = relativeElement.href + ".js";
            baseElement.href = "";
            return (MODULES[resolved] = MODULES[resolved] || {l: resolved});
        }

        // ...otherwise we are getting the exports

        // Is this module a redirect to another one?
        if (baseOrModule.n) {
            return resolveModuleOrGetExports(baseOrModule.n);
        }

        if (!baseOrModule["exports"]) {
            (baseOrModule.f || globalEval("(function(require,"+ "exports" +",module){" + baseOrModule.t + "\n})//# sourceURL=" + baseOrModule.l))(
                function require (id: any) {
                    return resolveModuleOrGetExports(resolveModuleOrGetExports(baseOrModule.l, id));
                }, // require
                baseOrModule["exports"] = {}, // exports
                baseOrModule // module
            );
        }

        return baseOrModule["exports"];
    }

    function R(id: any, callback?: any) {
        // If id has a `call` property it is a function, so make a module with
        // a factory
        deepLoad(id.call ? {l: "", t: "" + id, f: id} : resolveModuleOrGetExports("", id), function (err: any, module: any): any {
            try {
                id = resolveModuleOrGetExports(module);
            } catch (_err) {
                err = _err;
                throw err;
            }
            if (callback) {
                callback(err, id);
            }
        });
    }

    const scriptElement = <HTMLScriptElement>document.querySelector("script[data-main]");
    if (scriptElement) {
        R(scriptElement.dataset.main);
    }


interface ModuleInfo {
    e?: any;         // booleany - Error, truthy if there was an error (probably a 404) loading the module
    exports?: any;   // object   - The exports of the module!
    f?: any;         // function - Factory, a function to use instead of eval'ing module.t
    g?: any;         // booleany - LoadinG, truthy if this module has been requested for loading before. Used to prevent the same module being loaded twice
    l?: any;         // string   - Location, the url location of this module
    n?: any;         // object   - Module object, Next, instead of using this module, use the object pointed to by this property. Used for dependencies in other packages
    t?: string;      // string   - Text, the text content of the module
}

// The "key" of each entry, will be the "absolute path" to the module e.g. https://my-app.com/app
// The "value" of each entry,  will be a "ModuleInfo" object.
type ModuleInfoIndex = {
    [key: string]: ModuleInfo 
};
