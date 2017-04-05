# Hot reload in dev

* gulp task watches TypeScript file changes.
* gulp tasks sends http request, including all changed file paths, to hotreload server
* hotreload sends websocket request to browser, including all changed file paths.
* System.update(changedPaths) will be called to hotreload the code in the browser without reloading the page
* In v1 Just add a new tag to the head and rely on browser f12 to reload javascript