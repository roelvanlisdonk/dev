
# module loading
* A developer should only add one script tag manualy to the head of the index.html page of an AM app.
* This tag should have the relative path (based on the location of the index.html) to the AM system service as source.
* The tag should have a "data-main" attribute containing the relative path (based on the location of the index.html) 
  to the main module (exluding *.js extension).
* The main module will use "import { ... } from ..." or the System.import to load other modules.


## import modules
There are 2 ways you can import modules:
* By using import { MyClass } from "./path/to/mymodule" at the top of a module.
    * Modules will be resolved based on the location of the script containing the import statement.
* By using System.import("./path/to/mymodule");
    * Modules will be resolved based on the location of html document that loaded the AM system service.
    * Note that relative paths parts will be stripped.
    * eg https://local.dev/index.html constain the script tag that loads the "am/system.js" module.
    * Then "path/to/mymodule", "/path/to/mymodule", "./path/to/mymodule" and "../path/to/mymodule" 
      will all resolve to "https://local.dev/path/to/mymodule.js"

Example
URL: https://local.dev/index.html
https://local.dev/index.html
    <script type="text/javascript" src="libraries/am/system.js" data-main="./main"></script>
https://local.dev/main.ts
https://local.dev/libraries/am/system.ts
https://local.dev/path/to/mymodule.ts




## JavaScript - TypeScript - ES6 - System
- JavaScript source code is authored in TypeScript, then transpiled to ES6 modules in System format.
- Because each ES6 module source code is captured inside a System.registration call, all source code files can be downloaded and evaled in parallel order.
- After all files are downloaded and evaled, they will be executed in the correct order.

## Hot reloading - stubbing - mocking - dependency injection - fast dynamic app source code updating
- The System.register function is created in such a way, that all dependencies can be replaced, after the module is downloaded, evaled and executed.
- This makes hot reloading, stubbing, mocking, dependency injection and fast dynamic app source code updating possible.

