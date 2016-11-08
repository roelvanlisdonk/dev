System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index;
    function fixDataBasedOnSchemaChanges(types) {
        throw new Error("Not implemented exception.");
    }
    exports_1("fixDataBasedOnSchemaChanges", fixDataBasedOnSchemaChanges);
    function cloneSimpleType(obj) {
        var copy;
        if (null == obj || "object" != typeof obj) {
            return copy;
        }
        ;
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        throw new Error("Unable to clone simple type. This is most likely cast by IStoreField.value containing In the curren version of the store, arrays can only have types (boolean, Date, number, string) and ");
    }
    function get(id) {
        var obj = index[id];
        if (obj instanceof Object && obj.id && obj.typeId) {
            var copy = {
                id: obj.id,
                typeId: obj.typeId
            };
            for (var propName in obj) {
                if (obj.hasOwnProperty(propName)) {
                    var field = obj[propName];
                    if ("object" === typeof field && field.fieldId) {
                        var fieldCopy = {
                            fieldId: field.fieldId,
                            value: null
                        };
                        if (field.value instanceof Array) {
                            var sourceArray = field.value;
                            var destArray = [];
                            for (var i = 0, len = sourceArray.length; i < len; i++) {
                                destArray[i] = cloneSimpleType(sourceArray[i]);
                            }
                            fieldCopy.value = destArray;
                        }
                        else {
                            fieldCopy.value = cloneSimpleType(field.value);
                        }
                        copy[propName] = fieldCopy;
                    }
                }
            }
            return copy;
        }
        throw new Error("Unable to get store object " + id + "! Its type isn't supported.");
    }
    exports_1("get", get);
    function save(storeObject) {
        if (storeObject && storeObject.id) {
            var current = index[storeObject.id];
            if (!current) {
                index[storeObject.id] = storeObject;
            }
            for (var fieldName in storeObject) {
                saveField(storeObject, current, fieldName);
            }
            return;
        }
        throw new Error("Given parameter is not an IStoreObject.");
    }
    exports_1("save", save);
    function saveField(storeObject, current, fieldName) {
        var storeObjectAsAny = storeObject;
        var currentAsAny = current;
        if (storeObject.hasOwnProperty(fieldName)) {
            var field = storeObjectAsAny[fieldName];
            var fieldIsAStoreField = ("undefined" !== field.id && "undefined" !== field.value);
            if (fieldIsAStoreField) {
                var valueIsAnStoreObject = (field.value.id);
                if (valueIsAnStoreObject) {
                    save(field.value);
                    return;
                }
                var valueIsAnArray = field.value instanceof Array;
                if (valueIsAnArray) {
                    return;
                }
                currentAsAny[fieldName] = storeObjectAsAny[fieldName];
            }
        }
    }
    function fillStoreWithStubData() {
    }
    return {
        setters:[],
        execute: function() {
            index = {};
        }
    }
});
//# sourceMappingURL=store.js.map