"use strict";
function log(message) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(message));
    document.body.appendChild(div);
    if (console) {
        console.log(message);
    }
}
function onAppReady() {
    if (navigator.splashscreen && navigator.splashscreen.hide) {
        navigator.splashscreen.hide();
    }
    log("test1");
    log('File plugin is ready');
    log(cordova.file.applicationDirectory);
    log(cordova.file);
    var entry = window.resolveLocalFileSystemURL("filesystem:" + cordova.file.applicationDirectory, applicationDirectoryResolved, fail);
}
function applicationDirectoryResolved(entry) {
    log(entry.fullPath);
    var directoryReader = entry.createReader();
    directoryReader.readEntries(success, fail);
}
function success(entries) {
    for (var i = 0; i < entries.length; i++) {
        log(entries[i].name);
    }
}
function fail(error) {
    alert("Failed to list directory contents: " + error.code);
}
document.addEventListener("app.Ready", onAppReady, false);
//# sourceMappingURL=app.js.map