System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var objectIndex, typeIndex;
    function addType() {
    }
    exports_1("addType", addType);
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
        throw new Error("Unable to clone simple type.");
    }
    function get(id) {
        var obj = objectIndex[id];
        if (obj instanceof Object && obj.id && obj.typeId) {
            var copy = {
                id: obj.id,
                typeId: obj.typeId
            };
            var storeTypeIndexItem = typeIndex[obj.typeId];
            var storeType = storeTypeIndexItem.value;
            for (var propName in obj) {
                if (obj.hasOwnProperty(propName)) {
                    var field = obj[propName];
                    if ("object" === typeof field && field.fieldId) {
                        var fieldCopy = {
                            fieldId: field.fieldId,
                            value: null
                        };
                        var fieldName = '';
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
                        copy[fieldName] = fieldCopy;
                    }
                }
            }
            return copy;
        }
        throw new Error("Unable to get store object " + id + "! Its type isn't supported.");
    }
    exports_1("get", get);
    return {
        setters:[],
        execute: function() {
            objectIndex = {};
            typeIndex = {};
        }
    }
});
//# sourceMappingURL=store.js.map