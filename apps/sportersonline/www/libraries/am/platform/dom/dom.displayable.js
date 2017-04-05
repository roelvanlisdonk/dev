System.register(["../../common/validation/is.function", "../../common/validation/is.object", "../../common/observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getListener(displayable, node, render, remove) {
        var state = {
            displayable: displayable,
            node: node,
            remove: remove,
            render: render
        };
        var listener = {
            fn: rerenderDisplayable,
            state: state
        };
        return listener;
    }
    function renderDisplayable(node, displayable, render, remove) {
        var vdNode = node.vdNode;
        var shouldDisplay = setupRerendering(displayable, node, render, remove);
        if (shouldDisplay) {
            render(node, displayable);
        }
    }
    function renderDisplayables(node, displayables, render, remove) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (displayables) {
            var total = displayables.length;
            for (var i = 0; i < total; i++) {
                var displayable = displayables[i];
                renderDisplayable(node, displayable, render, remove);
            }
        }
    }
    exports_1("renderDisplayables", renderDisplayables);
    function rerenderDisplayable(evt) {
        var state = evt.listener.state;
        var node = state.node;
        var vdNode = state.node.vdNode;
        var displayable = state.displayable;
        if (evt.source.value) {
            state.render(node, displayable);
        }
        else {
            state.remove(node, displayable);
        }
    }
    function setupRerendering(displayable, node, render, remove) {
        if (displayable.display === undefined || displayable.display === null) {
            return true;
        }
        if (displayable.display === false || displayable.display === true) {
            return displayable.display;
        }
        var displayAsObservableFn = displayable.display;
        if (is_function_1.isFunction(displayAsObservableFn.fn)) {
            if (is_object_1.isObject(displayAsObservableFn.input)) {
                var listener = getListener(displayable, node, render, remove);
                observable_1.addListener(displayAsObservableFn.input, listener, displayAsObservableFn.traverse);
            }
            var value = displayAsObservableFn.fn(displayAsObservableFn.input);
            return value;
        }
        var displayAsObservableField = displayable.display;
        if (is_object_1.isObject(displayAsObservableField)) {
            var value = Boolean(displayAsObservableField.value);
            var listener = getListener(displayable, node, render, remove);
            observable_1.addListener(displayAsObservableField, listener);
            return value;
        }
        return true;
    }
    var is_function_1, is_object_1, observable_1;
    return {
        setters: [
            function (is_function_1_1) {
                is_function_1 = is_function_1_1;
            },
            function (is_object_1_1) {
                is_object_1 = is_object_1_1;
            },
            function (observable_1_1) {
                observable_1 = observable_1_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=dom.displayable.js.map