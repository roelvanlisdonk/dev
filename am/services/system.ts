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
namespace am.services {
    "use strict";

    const head = document.head || document.getElementsByTagName("head")[0];
    const isIE = /MSIE/.test(navigator.userAgent);
        
    // An in memory cache for modules (moduels are downloaded, loaded and executed).
    const moduleMap: any = {}; // TODO: move to store.data
    const moduleList: Array<IModule> = []; // TODO: move to store.data
    const registrationList: Array<IRegistration> = []; // TODO: move to store.data
    const seperator = "/";

    function createScriptNode(src: string) {
        const script: any = document.createElement("script");
        if (isIE) {
            script["onreadystatechange"] = onreadystatechange;
        } else {
            script.onload = onload;
        }
        script.onerror = onerror;
        script.src = src;

        head.appendChild(script);
    }

    function executeModules() {
        for (let length = moduleList.length, i = length - 1; i >= 0; i--) {
            const mod = moduleList[i];

            
            if(!mod.executed) {
                // First set the dependencies in the module
                // Door het uitvoeren van de mod.registration.fn worden de volgende zaken geregeld:
                // - exports
                // - imports
                // - returns a object that contains a execute function that should be executed.
                // Execute the module.
                
                // Store exports
                mod.registrationInfo = mod.registration.fn((name: string, code: any) => {
                    mod.exports[name] = code;
                }, {});

                // Set imports
                setImports(mod);

                // execute
                mod.registrationInfo.execute();
                mod.executed = true;
            }
        }
    }

    function setImports(mod: IModule) {
        const setters =  mod.registrationInfo.setters;
        const deps = mod.registration.deps;
        for (let i = 0, length = deps.length; i < length; i++) {
            const dep = deps[i];
            const depCode = imports(dep);
            const setter = setters[i];
            setter(depCode);
        }
    }

    function onerror() {
        console.log("onerror");
    }

    function onload() {
        const script: HTMLScriptElement = this;
        const src = script.src;
        console.log(`onload - ${src}`);
        updateModule(src);
    }

    function onreadystatechange() {
        const script: HTMLScriptElement = this;
        const src = script.src;
        const readystate = (script as any)["readyState"];
        console.log(`onreadystatechange - ${readystate} - ${src}`);

        if (readystate === "loaded") {
            updateModule(src);
        }
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

    function getMainModuleName(): string {
        const scripts = head.getElementsByTagName("script");
        for (let i = 0, length = scripts.length; i < length; i++) {
            const script = scripts[i];
            const moduleName = script.getAttribute("data-main");
            if (moduleName) {
                return moduleName;
            }
        }
        throw new Error("Could not find script tag in head with attribute data-main. Note the attribute data-main should have a non empty value.");
    }

    /**
     * This function is the custom System.import implementation.
     * This function should be called import, but that's not allowed in TypeScript.
     */
    function imports(name: string): IModule {
        
        const normalizedName = resolve(name);

        const mod: IModule = {
            executed: false,
            exports: {},
            importName: name,
            loaded: false,
            name: normalizedName,
            registration: null,
            registrationInfo: null
        };

        const exists = moduleMap[normalizedName];
        if (exists) {
            return exists;
        } else {
            moduleMap[normalizedName] = mod;

            const src = `${normalizedName}.js`;
            createScriptNode(src);
            return null;
        }
    }

    function loadMain() {
        const moduleName = getMainModuleName();

        // Load "main" module.
        console.log(`Module ${moduleName} loading started.`);

        System['import'](moduleName);
    }

    /**
     * Convert a relative path to an absolute path.
     * @param {string} relativePath - In this module the "registrationPath" (@see IModule) will be used as relative path.
     * @param {string} basePath - The base path string will be used to resolve the relative path to.
     * @return {string} Absolute path.
     */
    function resolve(relativePath: string, basePath?: string): string {
        basePath = basePath || document.location.pathname.split(seperator).slice(0, -1).join(seperator);
        if (basePath === seperator) {
            basePath = "";
        }
        if (relativePath.charAt(0) === seperator) {
            relativePath = relativePath.slice(1);
        }
        if (relativePath.charAt(0) === ".") {
            const parts = relativePath.split(seperator).slice(1);
            return [basePath].concat(parts).join(seperator);
        } else {
            return [basePath, relativePath].join(seperator);
        }
    }

    function register(deps: Array<string>, fn: (exports: any, context: any) => IRegistrationInfo) {
        console.log(`register - ${fn.toString().substring(120, 160)}`);

        registrationList.push({ deps: deps, fn: fn });

        // Now the file is downloaded and evaled, we must first download, eval and execute the dependencies,
        // Before we can execute this module.

        for (let i = 0, length = deps.length; i < length; i++) {
            const name = deps[i];
            System['import'](name);
        }
    }

    function updateModule(src: string) {
        const location = getLocation(src);
        const name = location.pathname.substring(0, location.pathname.length - 3);
        const mod: IModule = moduleMap[name];
        mod.loaded = true;
        mod.registration = registrationList.shift();
        moduleList.push(mod);

        const allModulesLoaded = (registrationList.length === 0);
        if(allModulesLoaded) {
            executeModules();
        }
    }

    // Is used to collect state during a System.Import call.
    interface IImportInfo {
        modules: Array<IModule>;    // Contains the state information about the modules loaded by the a System.Import call.
    }

    interface IModule {
        executed: boolean;
        exports: any; // Contains all exported functions / objects etc.
        importName: string; // This is litarally the text used to import the module in code.
        loaded: boolean;
        // This importName is resolved to an absolute path and stored in IModule.name
        // e.g. import User from "./components/user", then importName will be "./components/user".
        // e.g. <script src="services/system.js" data-main="am/main"></script>, then importName will be "am/main".
        // e.g. System.import("../../components/user"), then importName will be "../../components/user".
        name: string;   // This is the location where the module is found and also used as the unique module identifieran.
        // e.g. url structure:
        //    /app
        //        /services
        //            data.service.ts
        //        /components
        //            user.ts (import DataService from "../services/data.service" )
        // Then the name for the data.service module will be "/app/services/data.service".
        registration: IRegistration;
        registrationInfo: IRegistrationInfo;
    }

    interface IRegistration {
        deps: Array<string>;
        fn: (exports: any, context: any) => IRegistrationInfo;
    }

    interface IRegistrationInfo {
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