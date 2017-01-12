
# module loading

## JavaScript - TypeScript - ES6 - System
- JavaScript source code is authored in TypeScript, then transpiled to ES6 modules in System format.
- Because each ES6 module source code is captured inside a System.registration call, all source code files can be downloaded and evaled in parallel order.
- After all files are downloaded and evaled, they will be executed in the correct order.

## Hot reloading - stubbing - mocking - dependency injection - fast dynamic app source code updating
- The System.register function is created in such a way, that all dependencies can be replaced, after the module is downloaded, evaled and executed.
- This makes hot reloading, stubbing, mocking, dependency injection and fast dynamic app source code updating possible.

