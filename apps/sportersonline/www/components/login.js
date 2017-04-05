System.register(["../libraries/am/components/styles", "../libraries/am/components/text", "../libraries/am/components/button", "../libraries/am/components/icons/settings", "../libraries/am/storage/store"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function login(isAuthorized) {
        if (!isAuthorized) {
            throw new Error("Please provide isAuthorized.");
        }
        function onExectueClick() {
            console.log("onExectueClick");
        }
        function onSignInClick() {
            isAuthorized.value = true;
            store_1.save(isAuthorized);
        }
        var node = {
            classes: [styles_1.container],
            nodes: [
                { render: text_1.text, when: resources.signIn },
                { render: button_1.button, when: { icon: settings_1.settingsIcon, onclick: onSignInClick, text: resources.signIn } },
                { render: button_1.button, when: { onclick: onExectueClick, text: resources.execute } }
            ],
            name: tagName
        };
        return node;
    }
    exports_1("login", login);
    var styles_1, text_1, button_1, settings_1, store_1, tagName, resources;
    return {
        setters: [
            function (styles_1_1) {
                styles_1 = styles_1_1;
            },
            function (text_1_1) {
                text_1 = text_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }
        ],
        execute: function () {
            exports_1("tagName", tagName = "login");
            exports_1("resources", resources = {
                execute: { en: "Execute", nl: "Uitvoeren" },
                signIn: { en: "Sign in", nl: "Inloggen" }
            });
        }
    };
});
//# sourceMappingURL=login.js.map