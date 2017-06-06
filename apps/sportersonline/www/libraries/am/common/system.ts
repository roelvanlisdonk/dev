
// Add global exception handling
window.addEventListener('error', globalErrorHandler);

function globalErrorHandler(e: any) {
    let message = e;
    let stack = null;
    if(e && e.error) {
        message = e.error.toString();
        stack = e.error.stack;
        if (stack) {
            message += '\n' + stack;
        }
    }
    
    // TODO: send error to server like:
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/log', true);
    // xhr.send(message);
}

// TODO: move to external file
namespace am.store {
    export const moduleMap: any = {}; 
    export const moduleList: Array<am.system.IModule> = [];
    export const registrationList: Array<am.system.IRegistration> = [];
}

/**
 * This System wrapper is inspired by the https://github.com/caridy/es6-micro-loader
 * 
 * Importing a module consists of 3 steps:
 * 
 * Downloading
 * In this step the browser will physically download the module bytes from disk or over the network.
 * 
 * Loading
 * In this step the browser will evaluate (convert the module bytes) to JavaScript code and execute the JavaScript code.
 * When loading non ES6 module scripts, the browser would be done at this point.
 * 
 * Executing
 * When typescript converts a ES6 module to ES5 "System" code, it will wrap all code found in the ES6 module, that's not contained in a function, in a "execute" function.
 * So when the browser has "executed" the ES5 "System" code, this code will not be executed.
 * This is great, because we can use these "excute" function to execute childe (dependend) modules before executing the parent module.
 * The "execute" functions allow for downloading and loading modules in parallel, but execute them in the correct dependency tree order.
 * 
 */
namespace am.system {
    "use strict";

    const _head = document.head || document.getElementsByTagName("head")[0];
    const _isIE = /MSIE/.test(navigator.userAgent);
    const _moduleMap: any = am.store.moduleMap; 
    const _moduleList: Array<am.system.IModule> = am.store.moduleList;
    const _registrationList: Array<am.system.IRegistration> = am.store.registrationList;
    const _seperator = "/";

    // All script tags will get an "absolute" path to the root of the web site.
    // eg http://localhost/my/app/location/index.html has a tag <script type="text/javascript" src="libraries/am/common/system.js" data-main="./main"></script>,
    //      then "main" will be loaded as <script type="text/javascript" src="/my/app/location/main.js"></script>.
    const _basePath = getBasePath(document.location.pathname);

    function alwaysStartWithSeperator(pathParts: Array<string>): string {
        let result = pathParts.join(_seperator);
        if(result[0] !== _seperator) {
            result = _seperator + result;
        }
        return result;
    }

    function createScriptNode(src: string) {
        const script: any = document.createElement("script");
        if (_isIE) {
            script["onreadystatechange"] = onreadystatechange;
        } else {
            script.onload = onload;
        }
        script.onerror = onerror;
        script.src = src;

        _head.appendChild(script);
    }

    function determineIfAllModuleAreLoaded() : boolean {
        const result = true;
        for (let i = 0, length = _moduleList.length; i < length; i++) {
            const mod = _moduleList[i];
            if(mod.registration === null) {
                return false;
            }
        }
        return result;
    }

    function executeModule(mod: IModule) {
        const registration = mod.registration;
        const hasDeps = registration && registration.deps;
        if(hasDeps) {
            // Execute dependencies
            const deps = registration.deps;
            const depCount = deps.length;
            for (let i = 0; i < depCount; i++) {
                const pathToModule = deps[i];
                const mod = _moduleMap[pathToModule];
                
                if(!mod.executed) {
                    executeModule(mod);
                }
            }
        }
        
        // First set the dependencies in the module
        // Door het uitvoeren van de registration.fn worden de volgende zaken geregeld:
        // - exports
        // - imports
        // - returns a object that contains a execute function that should be executed.
        // Execute the module.
        
        const hasExports = registration && registration.fn;
        if(hasExports) {
            // Store exports
            mod.registrationInfo = registration.fn((name: string, code: any) => {
                mod.exports[name] = code;
            }, {});
        }
        
        setImports(mod);

        // execute
        if(mod.registrationInfo) {
            mod.registrationInfo.execute();
        }
        
        mod.executed = true;
    }

    function executeModules() {
        for (let length = _moduleList.length, i = length - 1; i >= 0; i--) {
            const mod = _moduleList[i];
            
            if(!mod.executed) {
                executeModule(mod);
            }
        }
    }

    function getBasePath(pathname: string): string {
        let result = pathname.split(_seperator).slice(0, -1).join(_seperator);
        if(!result) {
            result = _seperator;
        }
        return result;
    }

    function getLocation(href: string) {
        var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
        return match && {
            protocol: match[1],
            host: match[2],
            hostname: match[3],
            port: match[4],
            pathname: match[5],
            search: match[6],
            hash: match[7]
        }
    }

    function getPathToMainModule(): string {
        const scripts = _head.getElementsByTagName("script");
        for (let i = 0, length = scripts.length; i < length; i++) {
            const script = scripts[i];
            const moduleName = script.getAttribute("data-main");
            if(moduleName) {
                return resolve(moduleName, _basePath);
            }
        }
        throw new Error("Could not find script tag in head with attribute data-main. Note the attribute data-main should have a non empty value.");
    }

    function getPathToModuleFolder(pathToModule: string): string {
        const parts = pathToModule.split(_seperator);
        const folderPath = parts.slice(0, parts.length - 1).join(_seperator);
        return folderPath;
    }

    function getModuleNameFromSrc(src: string): string {
        const location = getLocation(src);
        const name = location.pathname.substring(0, location.pathname.length - 3);
        return name;
    }
    /**
     * This function is the custom System.import implementation.
     * This function should be called import, but that's not allowed in TypeScript.
     * 
     * @param {string} name - should be the path to the module without the ".js" extension
     *      the path should be relative to the location of the document that loaded the "am/system.js" file.
     *      Note: all relative path parts will be stripped, eg: ../my/path/../../test will resolve to /my/path/test  
     *      Note: When using import statements, like import { MyModule } from "./path/to/mymodule",
     *            the path is first resolved to the location of the script containing the import statement, before System.import is called. 
     */
    function imports(pathToModule: string): IModule {
        const exists = _moduleMap[pathToModule];
        if (exists) {
            return exists;
        } else {
            const mod: IModule = {
                executed: false,
                exports: {},                // Properties will be added after the module is exectued.
                pathToModule: pathToModule,
                registration: null,         // Will be set in the onload or onreadestatechange-loaded event.
                registrationInfo: null      // Will be set after this module is exectued.
            };
            _moduleMap[pathToModule] = mod;
            _moduleList.push(mod);
            
            const src = `${pathToModule}.js`;
            createScriptNode(src);
            return null;
        }
    }

    function loadMain() {
        const moduleName = getPathToMainModule();
        System["import"](moduleName);
    }

    function onerror(e: any) {
        console.log(`onerror - ${e}`);
    }

    function onload() {
        const script: HTMLScriptElement = this;
        const src = script.src;
        setRegistration(src);
    }

    function onreadystatechange() {
        const script: HTMLScriptElement = this;
        const src = script.src;
        const readystate = (script as any)["readyState"];
        if (readystate === "loaded") {
            setRegistration(src);
        }
    }

    /**
     * Given a relativePath (that might include "./" or "../") and a basePath, resolve the location of a module.
     * For performance reasons we asume the basePath does not start with "/", "./" or "../" or contain "./" or "../".
     */
    function resolve(relativePath: string, basePath: string): string {
        if(!relativePath) { return ""; }
        
        let resultParts: Array<string> = [];
        if(basePath && basePath.length > 0 && basePath !== _seperator) {
            resultParts = basePath.split(_seperator);
        }
        
        const parts = relativePath.split(_seperator);
        
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
        

        const result = alwaysStartWithSeperator(resultParts);

        return result;
    }

    function register(deps: Array<string>, fn: (exports: any, context: any) => IRegistrationInfo) {
        // Add registration to a list so the load or onreadestatechange-loaded event can use it. 
        const registration: IRegistration = { 
            deps: deps, 
            fn: fn
        };

        _registrationList.push(registration);        
    }

    function setImports(mod: IModule) {
        const hasSetters = mod.registrationInfo && mod.registrationInfo.setters;
        if(hasSetters) {
            const setters =  mod.registrationInfo.setters;
            const deps = mod.registration.deps;
            const folderPath = getPathToModuleFolder(mod.pathToModule);
            for (let i = 0, length = deps.length; i < length; i++) {
                const pathToDep = deps[i];
                const depAsMod = _moduleMap[pathToDep];
                const depCode = depAsMod.exports;
                const setter = setters[i];
                setter(depCode);
            }
        }
    }

    /**
     * @param - src - is a complete url, like https://my.host.header/am/system.js
     */
    function setRegistration(src: string) {
        const name = getModuleNameFromSrc(src);
        const pathToModule = name;
        const mod: IModule = _moduleMap[pathToModule];
        const registration: IRegistration = _registrationList.shift();
        mod.registration = registration;

        // Now the file is downloaded and evaled, we must first download, eval and execute the dependencies,
        // Before we can execute this module.
        const hasDeps = mod.registration && mod.registration.deps;
        if(hasDeps) {
            const deps = mod.registration.deps;
            const folderPath = getPathToModuleFolder(pathToModule);
            for (let i = 0, length = deps.length; i < length; i++) {
                const relativePath = deps[i];
                const pathToDep = resolve(relativePath, folderPath);

                // Update relative path to absolute path.
                deps[i] = pathToDep;

                System['import'](pathToDep);
            }
        }
        
        const allModulesLoaded = determineIfAllModuleAreLoaded();
        if(allModulesLoaded) {
            executeModules();
        }
    }

    // Is used to collect state during a System.Import call.
    interface IImportInfo {
        modules: Array<IModule>;    // Contains the state information about the modules loaded by the a System.Import call.
    }

    export interface IModule {
        executed: boolean;                      // When true, the module is downloaded, evaled and executed.
        exports: any;                           // Contains all exported functions / objects etc. and will be set after the module is executed.
        pathToModule: string;                   // Used to identify the module.
        registration: IRegistration;            // This object is set when the registration call is executed from the module code.
        registrationInfo: IRegistrationInfo;    // Contains informatio for setting the dependencies of the module (hot reloading, stubing, mocking, dependency injection etc.)
                                                // Will be set after this module is exectued.
    }

    export interface IRegistration {
        deps: Array<string>;
        fn: (exports: any, context: any) => IRegistrationInfo;
    }

    export interface IRegistrationInfo {
        execute: () => void;
        setters: Array<(dep: any) => void>; // Can be used to hotload / reload modules and can be used for mocking / stubing / dynamic dependency injection.
    }

    interface ISystem {
        import: (name: string) => void;
        register: (deps: Array<string>, fn: (exports: any, context: any) => IRegistrationInfo) => void;
    }

    const System: ISystem = {
        'import': imports,
        register: register
    };
    (window as any).System = System;

    loadMain();
}