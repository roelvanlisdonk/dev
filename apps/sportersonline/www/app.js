System.register(["./libraries/am/platform/dom/boot", "./libraries/am/common/observable", "./libraries/am/storage/store", "./libraries/am/components/styles", "./components/login", "./components/feed"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function app() {
        var root = store_1.getRoot() || createRoot();
        var node = {
            classes: [styles_1.container],
            nodes: [
                { render: login_1.login, when: observable_1.not(root.user.isAuthorized) },
                { render: feed_1.feed, when: root.user.isAuthorized }
            ],
            name: tagName
        };
        return node;
    }
    exports_1("app", app);
    function createRoot() {
        var root = {
            user: {
                authorizationToken: { value: null },
                email: { value: null },
                isAuthorized: { value: false },
            }
        };
        return root;
    }
    var boot_1, observable_1, store_1, styles_1, login_1, feed_1, tagName;
    return {
        setters: [
            function (boot_1_1) {
                boot_1 = boot_1_1;
            },
            function (observable_1_1) {
                observable_1 = observable_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (styles_1_1) {
                styles_1 = styles_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (feed_1_1) {
                feed_1 = feed_1_1;
            }
        ],
        execute: function () {
            exports_1("tagName", tagName = "app");
            boot_1.boot(document.body, app);
        }
    };
});
//# sourceMappingURL=app.js.map