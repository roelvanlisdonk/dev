System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function get(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('User\'s name is ' + xhr.responseText);
            }
            else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();
    }
    exports_1("get", get);
    return {
        setters: [],
        execute: function () {
        }
    };
});
//# sourceMappingURL=http.js.map