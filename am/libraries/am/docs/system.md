
# module loading
* A developer should only add one script tag manualy to the head of the index.html page of an AM app.
* This tag should have the relative path (based on the location of the index.html) to the AM system service as source.
* The tag should have a "data-main" attribute containing the relative path (based on the location of the index.html) 
  to the main module (exluding *.js extension).
* The main module will use "import { ... } from ..." or the System.import to load other modules.
* These modules will load based on the location of the "main" module.

Example
./index.html
    <script type="text/javascript" src="libraries/am/system.js" data-main="./main"></script>
./main.ts
./libraries/am/system.ts




## JavaScript - TypeScript - ES6 - System
- JavaScript source code is authored in TypeScript, then transpiled to ES6 modules in System format.
- Because each ES6 module source code is captured inside a System.registration call, all source code files can be downloaded and evaled in parallel order.
- After all files are downloaded and evaled, they will be executed in the correct order.

## Hot reloading - stubbing - mocking - dependency injection - fast dynamic app source code updating
- The System.register function is created in such a way, that all dependencies can be replaced, after the module is downloaded, evaled and executed.
- This makes hot reloading, stubbing, mocking, dependency injection and fast dynamic app source code updating possible.

