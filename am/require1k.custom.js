/**
 * This is require1k with some minor modifications:
 * - Catched exceptions will be rethrown in function R.
 */

/*jshint node:false, -W082, -W017 */
R = (function (document, undefined) {
    


// When the process of loading a module is started, a ModuleInfo object will be added to this index, to prevent "repetitive" loading of modules.
const MODULES = {};
// By using a named "eval" most browsers will execute in the global scope.
// http://perfectionkills.com/global-eval-what-are-the-options/
const globalEval = eval;
// An "base" element is added to the header to correctly resolve relative paths.
const baseElement = document.createElement("base");
document.head.appendChild(baseElement);
// This "anchor" element is only used to resolve relative paths to absolute url paths.
// E.g. "./app" will resolve to "https://my-app.com/app.js".
const relativeElement = document.createElement("a");
// Loads the given module and all of it dependencies, recursively
// - module         The module object
// - callback       Called when everything has been loaded
// - parentLocation Location of the parent directory to look in. Only given
// for non-relative dependencies
// - id             The name of the dependency. Only used for non-relative
// dependencies
function deepLoad(module, callback, parentLocation, id) {
    // If this module is already loading then don't proceed.
    // This is a bug.
    // If a module is requested but not loaded then the module isn't ready,
    // but we callback as if it is. Oh well, 1k!
    if (module.g) {
        return callback(module.e, module);
    }
    var location = module.g = module.l;
    var request = new XMLHttpRequest();
    request.onload = function () {
        let deps;
        let count;
        if (request.status == 200 || module.t) {
            // Should really use an object and then Object.keys to avoid
            // duplicate dependencies. But that costs bytes.
            deps = [];
            (module.t = module.t || request.response).replace(/(?:^|[^\w\$_.])require\s*\(\s*["']([^"']*)["']\s*\)/g, function (_, id) {
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
            deps.map(function (dep) {
                deepLoad(resolveModuleOrGetExports(module.l, dep), loaded, 
                // If it doesn't begin with a ".", then we're searching
                // node_modules, so pass in the info to make this
                // possible
                dep[0] != "." ? location + "/../" : undefined, dep);
            });
            loaded();
        }
        else {
            // parentLocation is only given if we're searching in node_modules
            if (parentLocation) {
                // Recurse up the tree trying to find the dependency
                // (generating 404s on the way)
                deepLoad(module.n = resolveModuleOrGetExports(parentLocation += "../", id), callback, parentLocation, id);
            }
            else {
                module.e = request;
                callback(request, module);
            }
        }
    };
    // If the module already has text because we're using a factory
    // function, then there's no need to load the file!
    if (module.t) {
        request.onload(null);
    }
    else {
        request.open("GET", location, true);
        request.send();
    }
}
// Save bytes by combining two functions
// - resolveModule which resolves a given relative path against the given
//   base, and returns an existing or new module object
// - getExports which returns the existing exports or runs the factory to
//   create the exports for a module
function resolveModuleOrGetExports(baseOrModule, relative, resolved) {
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
        return (MODULES[resolved] = MODULES[resolved] || { l: resolved });
    }
    // ...otherwise we are getting the exports
    // Is this module a redirect to another one?
    if (baseOrModule.n) {
        return resolveModuleOrGetExports(baseOrModule.n);
    }
    if (!baseOrModule["exports"]) {
        (baseOrModule.f || globalEval("(function(require," + "exports" + ",module){" + baseOrModule.t + "\n})//# sourceURL=" + baseOrModule.l))(function require(id) {
            return resolveModuleOrGetExports(resolveModuleOrGetExports(baseOrModule.l, id));
        }, // require
        baseOrModule["exports"] = {}, // exports
        baseOrModule // module
        );
    }
    return baseOrModule["exports"];
}
function R(id, callback) {
    // If id has a `call` property it is a function, so make a module with
    // a factory
    deepLoad(id.call ? { l: "", t: "" + id, f: id } : resolveModuleOrGetExports("", id), function (err, module) {
        try {
            id = resolveModuleOrGetExports(module);
        }
        catch (_err) {
            err = _err;
            throw err;
        }
        if (callback) {
            callback(err, id);
        }
    });
}
const scriptElement = document.querySelector("script[data-main]");
if (scriptElement) {
    R(scriptElement.dataset.main);
}







    return R;
}(document));
