System.register(["../../common/validation/is.array", "../../common/validation/is.function", "../../common/validation/is.object", "../../common/observable"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getListener(part, node, render, remove) {
        var state = {
            part: part,
            node: node,
            remove: remove,
            render: render
        };
        var listener = {
            fn: rerenderPart,
            state: state
        };
        return listener;
    }
    function renderPart(node, part, render, remove) {
        var partToRender = part;
        var renderer = part;
        var hasRenderProperty = is_object_1.isObject(renderer.render);
        if (hasRenderProperty) {
            if (is_function_1.isFunction(renderer.render)) {
                var factory = renderer.render;
                var factoryResult = factory(renderer.when);
                if (is_array_1.isArray(factoryResult)) {
                }
                else {
                    partToRender = factoryResult;
                }
            }
            else {
                partToRender = renderer.render;
            }
        }
        if (partToRender) {
            render(node, part);
        }
    }
    function renderParts(node, parts, render, remove) {
        if (!node) {
            throw new Error("Please provide node.");
        }
        if (parts) {
            var total = parts.length;
            for (var i = 0; i < total; i++) {
                var part = parts[i];
                renderPart(node, part, render, remove);
            }
        }
    }
    exports_1("renderParts", renderParts);
    function rerenderPart(evt) {
        var state = evt.listener.state;
        var node = state.node;
        var part = state.part;
        if (evt.source.value) {
            state.render(node, part);
        }
        else {
            state.remove(node, part);
        }
    }
    function setupRerendering(part, node, render, remove) {
        if (part.display === undefined || part.display === null) {
            return true;
        }
        if (part.display === false || part.display === true) {
            return part.display;
        }
        var displayAsObservableFn = part.display;
        if (is_function_1.isFunction(displayAsObservableFn.fn)) {
            if (is_object_1.isObject(displayAsObservableFn.input)) {
                var listener = getListener(part, node, render, remove);
                observable_1.addListener(displayAsObservableFn.input, listener, displayAsObservableFn.traverse);
            }
            var value = displayAsObservableFn.fn(displayAsObservableFn.input);
            return value;
        }
        var displayAsObservableField = part.display;
        if (is_object_1.isObject(displayAsObservableField)) {
            var value = Boolean(displayAsObservableField.value);
            var listener = getListener(part, node, render, remove);
            observable_1.addListener(displayAsObservableField, listener);
            return value;
        }
        return true;
    }
    var is_array_1, is_function_1, is_object_1, observable_1;
    return {
        setters: [
            function (is_array_1_1) {
                is_array_1 = is_array_1_1;
            },
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
//# sourceMappingURL=part.js.map