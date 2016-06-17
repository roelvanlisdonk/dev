var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var setFocus = dev.helpers.element.focus;
"use strict";
describe("dev.helpers.element.focus", function () {
    it("should set the focus to the first element (in the given container) containing the given attribute.", function () {
        var container = document.createElement("div");
        container.innerHTML = '<input type="text" test />';
        var input = container.firstElementChild;
        expect(setFocus(container, "test")).toBe(true);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var element;
        (function (element_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            var getElementByAttribute = dev.helpers.element.getByAttribute;
            /**
             * Focussus the first element in the container with the given attribute.
             * When the element is a "kendo-drop-down-list" is uses specific logic to set the focus.
             * @param container
             * @param attribute
             */
            function focus(container, attribute) {
                if (isNullOrUndefined(container, attribute)) {
                    return;
                }
                var result = false;
                var element = getElementByAttribute(container, attribute);
                if (element) {
                    if (element.hasAttribute("kendo-drop-down-list")) {
                        $(element).data("kendoDropDownList").focus();
                        result = true;
                    }
                    else {
                        element.focus();
                        result = true;
                    }
                }
                return result;
            }
            element_1.focus = focus;
        })(element = helpers.element || (helpers.element = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var getByAttribute = dev.helpers.element.getByAttribute;
"use strict";
describe("dev.helpers.element.getElementByAttribute", function () {
    it("should get the first element (in the given container) containing the given attribute.", function () {
        var container = document.createElement("div");
        container.innerHTML = '<input type="text" test />';
        var input = container.firstElementChild;
        var result = getByAttribute(container, "test");
        expect(input).toBe(result);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var element;
        (function (element_2) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Get the first element (in the given container), containing the given attribute.
             * @param container
             * @param attributeName
             */
            function getByAttribute(container, attributeName) {
                if (isNullOrUndefined(container, attributeName)) {
                    return;
                }
                var element = container.querySelector("[" + attributeName + "]");
                return element;
            }
            element_2.getByAttribute = getByAttribute;
        })(element = helpers.element || (helpers.element = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var getOrUnset = dev.helpers.field.getOrUnset;
"use strict";
describe("dev.helpers.field.getOrUnset", function () {
    it("should return null, if oldValue and newValue are equal (===).", function () {
        var c = { id: 3 };
        var a = {
            c: c
        };
        expect(getOrUnset(a.c, c)).toBe(null);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var field;
        (function (field) {
            "use strict";
            /**
             * If oldValue and newValue are equal ("==="), null is returned.
             * If oldValue and newValue are NOT equal ("==="), newValue is returned.
             * @param oldValue
             * @param newValue
             */
            function getOrUnset(oldValue, newValue) {
                if (oldValue === newValue) {
                    return null;
                }
                else {
                    return newValue;
                }
            }
            field.getOrUnset = getOrUnset;
        })(field = helpers.field || (helpers.field = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var contains = dev.helpers.list.contains;
"use strict";
describe("dev.helpers.list.contains", function () {
    it("should return true, when item is in the list.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(contains(list, c)).toBe(true);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_1) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Returns true, when the given item is found in the list by exact match ("===").
             * @param item
             * @param list
             */
            function contains(list, item) {
                if (isNullOrUndefined(list, item)) {
                    return;
                }
                for (var i = 0, length = list.length; i < length; i++) {
                    if (list[i] === item) {
                        return true;
                    }
                }
                return false;
            }
            list_1.contains = contains;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var findIndexByFieldName = dev.helpers.list.findIndexByFieldName;
"use strict";
describe("dev.helpers.list.findIndexByFieldName", function () {
    it("should return the index of an item in a list with the given field name, having the given value.", function () {
        var list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
        expect(findIndexByFieldName(list, "id", 3)).toBe(2);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_2) {
            "use strict";
            /**
             * Find the index of an item in a list with the given field name having the given value.
             * @param list
             * @param name
             * @param value
             */
            function findIndexByFieldName(list, name, value) {
                for (var i = 0, length = list.length; i < length; i++) {
                    var item = list[i];
                    if (item[name] === value) {
                        return i;
                    }
                }
                return null;
            }
            list_2.findIndexByFieldName = findIndexByFieldName;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var findIndexByItem = dev.helpers.list.findIndexByItem;
"use strict";
describe("dev.helpers.list.findIndexByItem", function () {
    it("should return the index of the given item by '===' comparison.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(findIndexByItem(list, c)).toBe(2);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_3) {
            "use strict";
            /**
             * Find the index of an item in a list, by checking on same object pointer.
             * @param list
             * @param item
             */
            function findIndexByItem(list, item) {
                for (var i = 0, length = list.length; i < length; i++) {
                    if (list[i] === item) {
                        return i;
                    }
                }
                return null;
            }
            list_3.findIndexByItem = findIndexByItem;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var findItemByFieldName = dev.helpers.list.findItemByFieldName;
"use strict";
describe("dev.helpers.list.findItemByFieldName", function () {
    it("should return the item in a list with the given field name, having the given value.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(findItemByFieldName(list, "id", 3)).toBe(c);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_4) {
            "use strict";
            var findIndexByFieldName = dev.helpers.list.findIndexByFieldName;
            /**
             * Find an item in a list with the given field name having the given value.
             * @param list
             * @param name
             * @param value
             */
            function findItemByFieldName(list, name, value) {
                var index = findIndexByFieldName(list, name, value);
                if (index === null) {
                    return null;
                }
                else {
                    return list[index];
                }
            }
            list_4.findItemByFieldName = findItemByFieldName;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var findNextOnItem = dev.helpers.list.findNextOnItem;
"use strict";
describe("dev.helpers.list.findNextOnItem", function () {
    it("should return the next item in the list after the given item.", function () {
        var b = { id: 2 };
        var c = { id: 3 };
        var list = [{ id: 1 }, b, c, { id: 4 }];
        expect(findNextOnItem(list, b)).toBe(c);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_5) {
            "use strict";
            var findIndexByItem = dev.helpers.list.findIndexByItem;
            /**
             * Get the next item in the list based on the index of the given item.
             */
            function findNextOnItem(list, item) {
                var index = findIndexByItem(list, item);
                var nextIndex = index + 1;
                if (nextIndex >= list.length) {
                    return null;
                }
                return list[nextIndex];
            }
            list_5.findNextOnItem = findNextOnItem;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var getNumberFromIndex = dev.helpers.list.getNumberFromIndex;
"use strict";
describe("dev.helpers.list.getNumberFromIndex", function () {
    it("should return the index of the given item + 1.", function () {
        var c = { id: 6 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(getNumberFromIndex(list, c)).toBe(3);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_6) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            var findIndexByItem = dev.helpers.list.findIndexByItem;
            /**
             * The number will be the index value of the item plus 1.
             * @param list
             * @param item
             */
            function getNumberFromIndex(list, item) {
                if (isNullOrUndefined(list, item)) {
                    return;
                }
                var index = findIndexByItem(list, item) || 0;
                return index + 1;
            }
            list_6.getNumberFromIndex = getNumberFromIndex;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var getTotal = dev.helpers.list.getTotal;
"use strict";
function addOneToItem(item) {
    return item + 1;
}
describe("dev.helpers.list.getTotal", function () {
    it("should return to correct total form items in the list by using the given expression.", function () {
        var list = [1, 2, 3];
        expect(getTotal(list, addOneToItem)).toBe(9);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_7) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Calculates the total of a list by executing the given "getValueToAddFn" foreach item in the list.
             * @param list
             * @param fn This functions determines the value to add to the total per item.
             */
            function getTotal(list, getValueToAddfn) {
                if (isNullOrUndefined(list, getValueToAddfn)) {
                    return;
                }
                var result = 0;
                for (var i = 0, length = list.length; i < length; i++) {
                    var item = list[i];
                    result += getValueToAddfn(item);
                }
                return result;
            }
            list_7.getTotal = getTotal;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var itemExists = dev.helpers.list.itemExists;
"use strict";
describe("dev.helpers.list.itemExists", function () {
    it("should return true when item exists in the list.", function () {
        var c = { id: 3 };
        var list = [{ id: 1 }, { id: 2 }, c, { id: 4 }];
        expect(itemExists(list, c)).toBe(true);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_8) {
            "use strict";
            /**
             * Check if the given item exists in the list by doing an exact comparison ("===").
             * @param list
             * @param itemToFind
             */
            function itemExists(list, itemToFind) {
                for (var i = 0, length = list.length; i < length; i++) {
                    var item = list[i];
                    if (item === itemToFind) {
                        return true;
                    }
                }
                return false;
            }
            list_8.itemExists = itemExists;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var removeOrInsert = dev.helpers.list.removeOrInsert;
"use strict";
describe("dev.helpers.list.removeOrInsert", function () {
    it("should remove item when found or add when NOT found.", function () {
        var c = { id: 4 };
        var list = [{ id: 1 }, { id: 2 }, { id: 3 }];
        removeOrInsert(list, c);
        expect(list.length).toBe(4);
        removeOrInsert(list, c);
        expect(list.length).toBe(3);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var list;
        (function (list_9) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Remove item from the list if found.
             * Add item to the list if NOT found.
             * @param list
             * @param item
             */
            function removeOrInsert(list, item) {
                if (isNullOrUndefined(list, item)) {
                    return;
                }
                for (var i = 0, length = list.length; i < length; i++) {
                    if (list[i] === item) {
                        list.splice(i, 1);
                        return;
                    }
                }
                list.push(item);
                return;
            }
            list_9.removeOrInsert = removeOrInsert;
        })(list = helpers.list || (helpers.list = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_1) {
            "use strict";
            /**
             * Make only the first letter of the give text, lowercase.
             */
            function capitalize(text) {
                if (!text || typeof text !== "string") {
                    return '';
                }
                return text.charAt(0).toUpperCase() + text.substr(1);
            }
            text_1.capitalize = capitalize;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_2) {
            "use strict";
            /**
             * Make only the first letter of the give text, lowercase.
             */
            function decapitalize(text) {
                if (!text || typeof text !== "string") {
                    return '';
                }
                return text.charAt(0).toLowerCase() + text.substr(1);
            }
            text_2.decapitalize = decapitalize;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text) {
            function encode(tekst) {
                if (!tekst) {
                    return '';
                }
                var encoded = tekst.toString();
                var findReplace = [
                    [/&/g, "&amp;"],
                    [/</g, "&lt;"],
                    [/>/g, "&gt;"],
                    [/"/g, "&quot;"],
                    [/'/g, '&#39;']
                ];
                for (var item in findReplace) {
                    encoded = encoded.replace(findReplace[item][0], findReplace[item][1]);
                }
                return encoded;
            }
            text.encode = encode;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_3) {
            "use strict";
            /**
             * Make only the first letter of the give text, lowercase.
             */
            function format(text) {
                var args = arguments;
                return text.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
            }
            text_3.format = format;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var removeWhiteSpace = dev.helpers.text.removeWhiteSpace;
"use strict";
describe("dev.helpers.text.removeWhiteSpace", function () {
    it("should remove all  white space from a string, containing leading, trailing and spaces inside the string.", function () {
        expect(removeWhiteSpace(" te s t ")).toBe("test");
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text) {
            "use strict";
            /**
             * Remove all the white space inside the string.
             */
            function removeWhiteSpace(value) {
                return value.replace(/\s+/g, '');
            }
            text.removeWhiteSpace = removeWhiteSpace;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_4) {
            "use strict";
            function toSnakeCase(text) {
                return text.split(/(?=[A-Z])/).join("-").toLowerCase();
            }
            text_4.toSnakeCase = toSnakeCase;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var text;
        (function (text_5) {
            "use strict";
            /**
             * Make only the first letter of the give text, lowercase.
             */
            function uncapitalize(text) {
                if (!text || typeof text !== "string") {
                    return '';
                }
                return text.charAt(0).toLowerCase() + text.substr(1);
            }
            text_5.uncapitalize = uncapitalize;
        })(text = helpers.text || (helpers.text = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var isBSN = dev.helpers.validation.isBSN;
"use strict";
describe("dev.helpers.validation.isBSN", function () {
    it("should return true, when passed a string containing a correct BSN.", function () {
        expect(isBSN("236132787")).toBe(true);
    });
    it("should return false, when passed a string containing a incorrect BSN.", function () {
        expect(isBSN("111")).toBe(false);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            var isNumeric = dev.helpers.validation.isNumeric;
            /**
             * Determines if the given value is a BSN (Burger Service Nummer), a dutch social security number.
             */
            function isBSN(bsn) {
                var j = bsn.length;
                if (j < 8 || j > 9 || isNumeric(bsn) == false || parseFloat(bsn) < 10000000 || parseFloat(bsn) >= 1000000000) {
                    return false;
                }
                var pos = 0;
                var result = 0;
                for (var i = j; i > 0; i--) {
                    var currentNumber = parseInt(bsn.charAt(pos), 10);
                    result += (i != 1) ? (currentNumber * i) : (currentNumber * i * -1);
                    pos++;
                }
                return (result % 11 == 0);
            }
            validation.isBSN = isBSN;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var isDutchMobileNumber = dev.helpers.validation.isDutchMobileNumber;
"use strict";
describe("dev.helpers.validation.isDutchMobileNumber", function () {
    it("should return true, when passed a dutch mobile number.", function () {
        expect(isDutchMobileNumber("0612345678")).toBe(true);
    });
    it("should return true, when passed a dutch mobile number, containing spaces.", function () {
        expect(isDutchMobileNumber(" 06 12345678 ")).toBe(true);
    });
    it("should return false, when string contains other characters then spaces or numbers.", function () {
        expect(isDutchMobileNumber("06-12345678")).toBe(false);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            var isNumeric = dev.helpers.validation.isNumeric;
            var removeWhiteSpace = dev.helpers.text.removeWhiteSpace;
            /**
             * Determines if the given string contains a dutch mobile phone number.
             */
            function isDutchMobileNumber(number) {
                var mobileNumber = removeWhiteSpace(number);
                if (!isNumeric(mobileNumber)) {
                    return false;
                }
                if (mobileNumber.length !== 10) {
                    return false;
                }
                if (mobileNumber.substring(0, 2) !== '06') {
                    return false;
                }
                return true;
            }
            validation.isDutchMobileNumber = isDutchMobileNumber;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var isEmail = dev.helpers.validation.isEmail;
"use strict";
describe("dev.helpers.validation.isEmail", function () {
    it("should validate if given parameter contains a vaild email address.", function () {
        expect(isEmail("roel.van.lisdonk@ada-ict.nl")).toBe(true);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given email string contains a valid technical valid email address.
             * It excepts unicode characters.
             * @param email
             */
            function isEmail(email) {
                var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return re.test(email);
            }
            validation.isEmail = isEmail;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var isEmpty = dev.helpers.validation.isEmpty;
"use strict";
describe("dev.helpers.validation.isEmpty", function () {
    it("should validate if given parameter is undefined, null, empty string or empty array.", function () {
        expect(isEmpty()).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty("")).toBe(true);
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1])).toBe(false);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given value is "empty".
             * @param value
             * @returns true, when value is undefined.
             * @returns true, when value is null.
             * @returns true, when value is "".
             * @returns true, when value is an array with no items.
             */
            function isEmpty(value) {
                return (value === undefined ||
                    value === null ||
                    value === "" ||
                    (Array.isArray(value) && value.length <= 0));
            }
            validation.isEmpty = isEmpty;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var isFunction = dev.helpers.validation.isFunction;
"use strict";
describe("dev.helpers.validation.isFunction", function () {
    it("should return true, if value starts with '[function'.", function () {
        expect(isFunction('   function   ')).toBe(true);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given string contains an function.
             * @param value
             */
            function isFunction(value) {
                var value = value.trim();
                if (value.startsWith("function")) {
                    return true;
                }
                return false;
            }
            validation.isFunction = isFunction;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
"use strict";
describe("dev.helpers.validation.isNullOrUndefined", function () {
    it("should validate if one of the supplied parameters is null or undefined.", function () {
        expect(isNullOrUndefined()).toBe(true);
        expect(isNullOrUndefined(null)).toBe(true);
        expect(isNullOrUndefined(undefined)).toBe(true);
        expect(isNullOrUndefined("")).toBe(false);
        expect(isNullOrUndefined(true)).toBe(false);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Check if one of the supplied parameters is null or undefined.
             *
             * @param values
             * @returns true, when no parameters are supplied.
             *          true, when one of the supplied parameters is null or undefined.
             *          false, in all other cases.
             */
            function isNullOrUndefined(...values) {
                if (values.length <= 0) {
                    return true;
                }
                for (var i = 0, length = values.length; i < length; i += 1) {
                    var value = values[i];
                    if (value === undefined || value === null) {
                        return true;
                    }
                }
                return false;
            }
            validation.isNullOrUndefined = isNullOrUndefined;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var isNumeric = dev.helpers.validation.isNumeric;
"use strict";
describe("dev.helpers.validation.isNumeric", function () {
    it("should return true, when passed a number.", function () {
        expect(isNumeric(12345)).toBe(true);
    });
    it("should return true, when passed a string containing only numbers.", function () {
        expect(isNumeric("111")).toBe(true);
    });
    it("should return true, when passed a string, starting with zero's and containing only numbers.", function () {
        expect(isNumeric("000111")).toBe(true);
    });
    it("should return false, when passed a string containing characters.", function () {
        expect(isNumeric("1A00")).toBe(false);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            /**
             * Determines if the given value is a number.
             */
            function isNumeric(n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }
            validation.isNumeric = isNumeric;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var propertiesAreEqual = dev.helpers.validation.propertiesAreEqual;
"use strict";
describe("dev.helpers.validation.propertiesAreEqual", function () {
    it("should return true if the value of the given property name is exact ('===') the same on both objects.", function () {
        var c = { id: 3 };
        var a = { propToCheck: c };
        var b = { propToCheck: c };
        expect(propertiesAreEqual(a, b, 'propToCheck')).toBe(true);
    });
});
var dev;
(function (dev) {
    var helpers;
    (function (helpers) {
        var validation;
        (function (validation) {
            "use strict";
            var isNullOrUndefined = dev.helpers.validation.isNullOrUndefined;
            /**
             * Determines if the values of the given property in the object a and b are exactly the same (===).
             * @param a
             * @param b
             * @param name
             * @returns True, if values of given property are exactly the samen on both objects.
             *          Null, if a or b is not set.
             */
            function propertiesAreEqual(a, b, name) {
                if (isNullOrUndefined(a, b)) {
                    return;
                }
                return (a[name] === b[name]);
            }
            validation.propertiesAreEqual = propertiesAreEqual;
        })(validation = helpers.validation || (helpers.validation = {}));
    })(helpers = dev.helpers || (dev.helpers = {}));
})(dev || (dev = {}));
var dev;
(function (dev) {
    "use strict";
    // Register angular app.
    var appName = 'app';
    dev.app = angular.module(appName, []);
    // Boot angular, when DOM is loaded.
    angular.element(document).ready(function () {
        angular.bootstrap(document, [appName]);
    });
    // Add a controller.
    dev.app.controller('AppController', ['$scope', AppController]);
    function AppController($scope) {
        $scope.startSpinner = startSpinner;
        $scope.stopSpinner = stopSpinner;
        function startSpinner() {
            $scope.spinnerVisible = true;
        }
        function stopSpinner() {
            $scope.spinnerVisible = false;
        }
    }
    // Add action button directive.
    dev.app.directive("actionButton", [ActionButton]);
    function ActionButton() {
        var spinnerDefaults = {
            lines: 13,
            length: 6,
            width: 2,
            radius: 3,
            scale: 1,
            corners: 1,
            color: '#ffffff',
            opacity: 0.3,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 20,
            zIndex: 2e9,
            className: 'spinner',
            top: '15px',
            left: '18px',
            shadow: false,
            hwaccel: false,
            position: 'absolute' // Element positioning
        };
        var template = `<button class="button" type="button">
                            <div class="spinner"></div>{{options.text}}
                        </button>`;
        function link($scope, $element) {
            $scope.$watch('options.spinnerVisible', watchForSpinnerVisibilityChange);
            function watchForSpinnerVisibilityChange(newValue, oldValue) {
                var shouldStartSpinner = (!oldValue && newValue === true);
                if (shouldStartSpinner) {
                    var element = $element.find(".spinner")[0];
                    var options = $.extend({}, spinnerDefaults, $scope.options.spinnerOptions);
                    var spinner = new Spinner(options);
                    $scope.spinner = spinner.spin(element);
                }
                var shouldStopSpinner = (oldValue === true && newValue === false);
                if (shouldStopSpinner) {
                    $scope.spinner.stop();
                }
            }
        }
        return {
            template: template,
            link: link,
            replace: true,
            scope: {
                options: "=actionButton"
            }
        };
    }
})(dev || (dev = {}));
var dev;
(function (dev) {
    "use strict";
    function measure(fn) {
        const t0 = performance.now();
        fn();
        const t1 = performance.now();
        console.log("Call took " + (t1 - t0) + " milliseconds.");
    }
})(dev || (dev = {}));
var dev;
(function (dev) {
    var services;
    (function (services) {
        /**
     * Fetch can be used to send and receive data over http(s).
     * Inspired by: https://github.com/ModuleLoader/es6-module-loader/blob/master/src/system-fetch.js
     *  - without XDomainRequest support.
     */
        function fetch(options) {
            var authorization = options.authorization;
            var onError = options.onError;
            var url = options.url;
            var xhr = new XMLHttpRequest();
            function load() {
                var result = {
                    additionalData: options.additionalData,
                    data: xhr.responseText
                };
                options.onSuccess(result);
            }
            function error() {
                var err = new Error('XHR error' + (xhr.status ? ' (' + xhr.status + (xhr.statusText ? ' ' + xhr.statusText : '') + ')' : '') + ' loading ' + url);
                var errorHandlerSupplied = (typeof onError === "function");
                if (errorHandlerSupplied) {
                    var result = {
                        additionalData: options.additionalData,
                        error: err
                    };
                    onError(result);
                }
                else {
                    throw err;
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    // in Chrome on file:/// URLs, status is 0
                    if (xhr.status == 0) {
                        if (xhr.responseText) {
                            load();
                        }
                        else {
                            // when responseText is empty, wait for load or error event
                            // to inform if it is a 404 or empty file
                            xhr.addEventListener('error', error);
                            xhr.addEventListener('load', load);
                        }
                    }
                    else if (xhr.status === 200) {
                        load();
                    }
                    else {
                        error();
                    }
                }
            };
            xhr.open("GET", url, true);
            if (xhr.setRequestHeader) {
                xhr.setRequestHeader('Accept', 'application/x-es-module, */*');
                // can set "authorization: true" to enable withCredentials only
                if (authorization) {
                    if (typeof authorization == 'string') {
                        xhr.setRequestHeader('Authorization', authorization.toString());
                    }
                    xhr.withCredentials = true;
                }
            }
            xhr.send(null);
        }
        services.fetch = fetch;
    })(services = dev.services || (dev.services = {}));
})(dev || (dev = {}));
/**
 *  The am.loader can be used to load ES6 modules.
 *  It is based on: https://github.com/caridy/es6-micro-loader/blob/master/dist/system-polyfill.js
 *  Because it is used to load ES6 modules, by definition am.loader can't be a ES6 module.
 */
var dev;
(function (dev) {
    var services;
    (function (services) {
        var loader;
        (function (loader) {
            "use strict";
            var seen = Object.create(null);
            var internalRegistry = Object.create(null);
            var externalRegistry = Object.create(null);
            var anonymousEntry;
            var headEl = document.getElementsByTagName('head')[0], ie = /MSIE/.test(navigator.userAgent);
            /**
             * A script tag is used to fetch and eval sources,
             * because fetching the data directly will not allow developers to see / debug the sources in the browser.
             */
            function createScriptNode(src, callback, info) {
                var node = document.createElement('script');
                // use async=false for ordered async?
                // parallel-load-serial-execute http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
                if (node.async) {
                    node.async = false;
                }
                if (ie) {
                    node["onreadystatechange"] = function () {
                        if (/loaded|complete/.test(this.readyState)) {
                            this.onreadystatechange = null;
                            callback(info);
                        }
                    };
                }
                else {
                    node.onload = node.onerror = function () {
                        callback(info);
                    };
                }
                node.setAttribute('src', src);
                headEl.appendChild(node);
            }
            function ensuredExecute(name) {
                var mod = internalRegistry[name];
                if (mod && !seen[name]) {
                    seen[name] = true;
                    // one time operation to execute the module body
                    mod.execute();
                }
                return mod && mod.proxy;
            }
            function get(name) {
                return externalRegistry[name] || ensuredExecute(name);
            }
            function has(name) {
                return !!externalRegistry[name] || !!internalRegistry[name];
            }
            function load(name, onSuccess) {
                var endTreeLoading = onSuccess;
                var normalizedName = normalizeName(name, []);
                var moduleAsCode = get(normalizedName);
                if (moduleAsCode && endTreeLoading) {
                    endTreeLoading(moduleAsCode);
                }
                else {
                    // To determine, "if all dependencies are loaded", this "rootInfo" object will be passed to and updated during the load process. 
                    var rootInfo = {
                        counter: 0,
                        done: endTreeLoading,
                        mod: null,
                        normalizedName: normalizedName,
                        parentInfo: null,
                        total: 0
                    };
                    fetchAndEval(rootInfo);
                }
            }
            loader.load = load;
            function fetchAndEval(info) {
                var url = (System.baseURL || '/') + info.normalizedName + '.js';
                createScriptNode(url, onScriptLoad, info);
            }
            function getModuleFromInternalRegistry(name) {
                var mod = internalRegistry[name];
                if (!mod) {
                    throw new Error('Error loading module ' + name);
                }
                return mod;
            }
            function onScriptLoad(info) {
                if (anonymousEntry) {
                    // Register as an named module.
                    System.register(info.normalizedName, anonymousEntry[0], anonymousEntry[1]);
                    anonymousEntry = undefined;
                }
                var mod = getModuleFromInternalRegistry(info.normalizedName);
                info.mod = mod;
                info.total = mod.deps.length;
                handleLoadedModule(info);
            }
            function handleLoadedModule(info) {
                var mod = info.mod;
                var isRootModule = (info.parentInfo === null);
                var hasDepedencies = (mod.deps.length > 0);
                var shouldExecuteDone = (((isRootModule && !hasDepedencies) || (!isRootModule && !hasDepedencies)));
                if (shouldExecuteDone) {
                    var moduleAsCode = get(info.normalizedName);
                    if (info.done) {
                        info.done(moduleAsCode);
                    }
                }
                if (!isRootModule && !hasDepedencies) {
                    updateParentInfo(info);
                }
                if (hasDepedencies) {
                    loadDependencies(mod.deps, info);
                }
            }
            function loadDependencies(deps, parentInfo) {
                for (var i = 0; i < deps.length; i++) {
                    var dep = deps[i];
                    loadDependency(dep, parentInfo);
                }
            }
            function loadDependency(name, parentInfo) {
                var normalizedName = normalizeName(name, []);
                var childInfo = {
                    counter: 0,
                    done: null,
                    mod: null,
                    normalizedName: normalizedName,
                    parentInfo: parentInfo,
                    total: 0
                };
                var mod = get(normalizedName);
                if (mod) {
                    childInfo.mod = mod;
                    handleLoadedModule(childInfo);
                }
                else {
                    fetchAndEval(childInfo);
                }
            }
            function updateParentInfo(info) {
                var parentInfo = info.parentInfo;
                if (parentInfo) {
                    parentInfo.counter += 1;
                    if (parentInfo.counter === parentInfo.total) {
                        var moduleAsCode = get(parentInfo.normalizedName);
                        if (parentInfo.done) {
                            parentInfo.done(moduleAsCode);
                        }
                        if (parentInfo.parentInfo) {
                            updateParentInfo(parentInfo);
                        }
                    }
                }
            }
            function normalizeName(child, parentBase) {
                if (child.charAt(0) === '/') {
                    child = child.slice(1);
                }
                if (child.charAt(0) !== '.') {
                    return child;
                }
                var parts = child.split('/');
                while (parts[0] === '.' || parts[0] === '..') {
                    if (parts.shift() === '..') {
                        parentBase.pop();
                    }
                }
                return parentBase.concat(parts).join('/');
            }
            function register(name, deps, wrapper) {
                if (Array.isArray(name)) {
                    // anounymous module
                    anonymousEntry = [];
                    anonymousEntry.push.apply(anonymousEntry, arguments);
                    return; // breaking to let the script tag to name it.
                }
                var proxy = Object.create(null), values = Object.create(null), mod, meta;
                // creating a new entry in the internal registry
                internalRegistry[name] = mod = {
                    // live bindings
                    proxy: proxy,
                    // exported values
                    values: values,
                    // normalized deps
                    deps: deps.map(function (dep) {
                        return normalizeName(dep, name.split('/').slice(0, -1));
                    }),
                    // other modules that depends on this so we can push updates into those modules
                    dependants: [],
                    // method used to push updates of deps into the module body
                    update: function (moduleName, moduleObj) {
                        meta.setters[mod.deps.indexOf(moduleName)](moduleObj);
                    },
                    execute: function () {
                        mod.deps.map(function (dep) {
                            var imports = externalRegistry[dep];
                            if (imports) {
                                mod.update(dep, imports);
                            }
                            else {
                                imports = get(dep) && internalRegistry[dep].values; // optimization to pass plain values instead of bindings
                                if (imports) {
                                    internalRegistry[dep].dependants.push(name);
                                    mod.update(dep, imports);
                                }
                            }
                        });
                        meta.execute();
                    }
                };
                // collecting execute() and setters[]
                meta = wrapper(function (identifier, value) {
                    values[identifier] = value;
                    mod.lock = true; // locking down the updates on the module to avoid infinite loop
                    mod.dependants.forEach(function (moduleName) {
                        if (internalRegistry[moduleName] && !internalRegistry[moduleName].lock) {
                            internalRegistry[moduleName].update(name, values);
                        }
                    });
                    mod.lock = false;
                    if (!Object.getOwnPropertyDescriptor(proxy, identifier)) {
                        Object.defineProperty(proxy, identifier, {
                            enumerable: true,
                            get: function () {
                                return values[identifier];
                            }
                        });
                    }
                    return value;
                });
            }
            loader.register = register;
            function set(name, values) {
                externalRegistry[name] = values;
            }
        })(loader = services.loader || (services.loader = {}));
    })(services = dev.services || (dev.services = {}));
})(dev || (dev = {}));
var System = System || {
    baseURL: "/",
    import: dev.services.loader.load,
    register: dev.services.loader.register
};
System.register("services/performance/measure", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function measure(fn) {
        var t0 = performance.now();
        fn();
        var t1 = performance.now();
        console.log("Call took " + (t1 - t0) + " milliseconds.");
    }
    exports_1("measure", measure);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("zvdz/to.snake.case", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function toSnakeCase() {
        console.log("app started!");
    }
    exports_2("default", toSnakeCase);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("zvdz/app", ["zvdz/to.snake.case", "@angular/core"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var to_snake_case_1, core_1;
    var AppComponent;
    function start() {
        console.log("app starte!!!");
        to_snake_case_1.default();
    }
    exports_3("default", start);
    return {
        setters:[
            function (to_snake_case_1_1) {
                to_snake_case_1 = to_snake_case_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            let AppComponent = class AppComponent {
            };
            AppComponent = __decorate([
                core_1.Component({
                    selector: 'my-app',
                    template: '<h1>My First Angular 2 App</h1>'
                }), 
                __metadata('design:paramtypes', [])
            ], AppComponent);
            exports_3("AppComponent", AppComponent);
            start();
        }
    }
});
//# sourceMappingURL=rli.bundle.js.map