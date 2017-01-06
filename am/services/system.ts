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
 * 
 */
namespace am.services {
    "use strict";

    // TODO: move to store.data
    // An in memory cache for modules (moduels are downloaded, loaded and executed).
    const modules: any = {};

    function createScriptNode(src: string) {
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    }
    
    function getMainModuleName(): string {
        const scripts = document.head.getElementsByTagName("script");
        for(let i = 0, length = scripts.length; i < length; i++) {
            const script = scripts[i];
            const moduleName = script.getAttribute("data-main");
            if(moduleName) {
                return moduleName;
            }
        }
        throw new Error("Could not find script tag in head with attribute data-main. Note the attribute data-main should have a non empty value.");
    }

    /**
     * This function should be called import, but that's not allowed in TypeScript.
     */
    function imports(name: string) {
        createScriptNode('main.js');    
    }

    function loadMain() {
        const moduleName = getMainModuleName();

        // Load "main" module.
        console.log(`Module ${moduleName} loading started.`);

        imports(moduleName);
    }

    /**
     * Convert a relative path to an absolute path.
     * @param {string} relativePath - In this module the "registrationPath" (@see IModule) will be used as relative path.
     * @param {string} basePath - The base path string will be used to resolve the relative path to.
     * @return {string} Absolute path.
     */
    function convertToAbsolutePath(relativePath: string, basePath?: string): string {
        const seperator = "/";
        
        basePath = basePath || "";
        if (basePath === seperator) {
            basePath = "";
        }
        if (relativePath.charAt(0) === "/") {
            relativePath = relativePath.slice(1);
        }
        if (relativePath.charAt(0) !== ".") {
            return relativePath;
        }

        const baseParts = basePath.split(seperator);
        const parts = relativePath.split("/");
        while (parts[0] === "." || parts[0] === "..") {
            if (parts.shift() === "..") {
                baseParts.pop();
            }
        }

        const absolutePath = baseParts.concat(parts).join("/");
        return absolutePath;
    }

    
    function register(deps: Array<string>, fn: (exports: any, context: any) => IRegistrationInfo) {
        console.log("register");
        // Now the file is downloaded and evaled, we must first download, eval and execute the dependencies,
        // Before we can execute this module.
    }

    function registerSystemOnWindow() {
        const windowAsAny = window as any;

        // Use browser System, when available.
        if(!windowAsAny.System) {
            windowAsAny.System = {};
        }

        // Overwrite existing System functions, so we can be in charge of importing modules.
        windowAsAny.System.import = imports;
        windowAsAny.System.register = register;
    }
    
    // Is used to collect state during a System.Import call.
    interface IImportInfo {
        modules: Array<IModule>;    // Contains the state for the modules loaded by the a System.Import call.
    }

    interface IModule {
        registrationPath: string;   // This is litarally the text used to register the module.
                                    // It is only used, when it is converted to the normalizedName.
                                    // e.g. import User from "./components/user", then name will be "./components/user".
                                    // e.g. <script src="services/system.js" data-main="am/main"></script>, then name will be "am/main".
                                    // e.g. System.import("../../components/user"), then name will be "../../components/user".
        absolutePath: string;   // This is the path to the location where the module can be found.
                                // This absolute path is used as key to indentify the module in code.
                                // e.g. url structure:
                                //    /app
                                //        /services
                                //            data.service.ts
                                //        /components
                                //            user.ts (import DataService from "../services/data.service" )
                                // Then the absolute path for the data service will be "/app/services/data.service".
    }

    interface IRegistrationInfo {
        execute: () => void;
        setters: Array<(dep: any) => void>;
    }

    interface ISystem {
        register: (deps: Array<string>, fn: (exports: any, context: any) => IRegistrationInfo) => void;
    }

    interface IWindow {
        System: ISystem
    }
   
    registerSystemOnWindow();    
    loadMain();
}