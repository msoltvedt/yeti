function format(first, middle, last) {
    return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
const utils = {
    generateUniqueId: function () {
        ++uniqueId;
        return 'yid' + uniqueId;
    },
    wrapAll: function (elements, wrapper) {
        for (let i = 0; i < elements.length; i++) {
            wrapper.appendChild(elements[i]);
        }
    },
    isEqual: function (a, b) {
        const objKeysA = Object.keys(a);
        const objKeysB = Object.keys(b);
        const areBothArrays = Array.isArray(a) && Array.isArray(b);
        const areBothObjects = this.isObject(a) && this.isObject(b);
        // Handle type mismatch
        if (typeof a != typeof b) {
            return false;
        }
        // Handle arrays
        if (areBothArrays) {
            if (a.length != b.length) {
                return false;
            }
            else {
                for (let i = 0; i < a.length; i++) {
                    if (!this.isEqual(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
        }
        // Handle non-array objects
        if (areBothObjects) {
            if (objKeysA.length !== objKeysB.length) {
                return false;
            }
            for (var key of objKeysA) {
                const aValue = a[key];
                const bValue = b[key];
                if (!this.isEqual(aValue, bValue)) {
                    return false;
                }
            }
            return true;
        }
        // Handle everything else
        return a === b;
    },
    isObject: function (object) {
        return object != null && typeof object === "object";
    },
    isConvertibleToDate: function (possibleDate) {
        const re = /(^[0-9]{1,4}(\/|\-)[0-9]{1,2}(\/|\-)[0-9]{2,4}$)|(^((jan|Jan|JAN|january|January|JANUARY)|(feb|Feb|FEB|february|February|FEBRUARY)|(mar|Mar|MAR|march|March|MARCH)|(apr|Apr|APR|april|April|APRIL)|(may|May|MAY)|(jun|Jun|JUN|june|June|JUNE)|(jul|Jul|JUL|july|July|JULY)|(aug|Aug|AUG|august|August|AUGUST)|(sep|Sep|SEP|september|September|SEPTEMBER)|(oct|Oct|OCT|october|October|OCTOBER)|(nov|Nov|NOV|november|November|NOVEMBER)|(dec|Dec|DEC|december|December|DECEMBER))\s[0-9]{1,4}$)/g;
        if (possibleDate.search(re) > -1) {
            let dateObject = new Date(possibleDate);
            if (dateObject.toString() == "Invalid Date") {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    },
    isConvertibleToNumber: function (possibleNumber) {
        const re = /(^(((-|\+)?((\d)*(\.)?(\d)*)){1})$)/g;
        // let castedPossibility = this.castToNumber(possibleNumber.toString());
        possibleNumber = possibleNumber.replace(/,/g, "");
        if (possibleNumber.search(re) > -1) {
            return true;
        }
        else {
            return false;
        }
        // if (Number.isNaN(castedPossibility)) {
        //   return false;
        // } else {
        //   return true;
        // }
    },
    getStringifiedType: function (dunno) {
        if (utils.isConvertibleToDate(dunno)) {
            return "date";
        }
        else {
            if (utils.isConvertibleToNumber(dunno)) {
                return "number";
            }
            else {
                return "string";
            }
        }
    },
    castToNumber: function (someString) {
        return parseFloat(someString.replace(/,/g, ''));
    },
    isValidJSON: function (candidate) {
        candidate = JSON.stringify(candidate);
        try {
            JSON.parse(candidate);
        }
        catch (e) {
            return false;
        }
        return true;
    },
    getMonthName: function (date) {
        return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
    },
    aria: {
        // Primarily from the W3 APG
        ignoreUtilFocusChanges: false,
        focusFirstDescendant: function (element) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var child = element.childNodes[i];
                if (utils.aria.attemptFocus(child) ||
                    utils.aria.focusFirstDescendant(child)) {
                    return true;
                }
            }
            return false;
        },
        focusLastDescendant: function (element) {
            for (var i = element.childNodes.length - 1; i >= 0; i--) {
                var child = element.childNodes[i];
                if (utils.aria.attemptFocus(child) ||
                    utils.aria.focusLastDescendant(child)) {
                    return true;
                }
            }
            return false;
        },
        attemptFocus: function (element) {
            if (!utils.aria.isFocusable(element)) {
                return false;
            }
            utils.aria.ignoreUtilFocusChanges = true;
            try {
                element.focus();
            }
            catch (e) {
                // continue regardless of error
            }
            utils.aria.ignoreUtilFocusChanges = false;
            return document.activeElement === element;
        },
        isFocusable: function (element) {
            if (element.tabIndex < 0) {
                return false;
            }
            if (element.disabled) {
                return false;
            }
            switch (element.nodeName) {
                case 'A':
                    return !!element.href && element.rel != 'ignore';
                case 'INPUT':
                    return element.type != 'hidden';
                case 'BUTTON':
                case 'SELECT':
                case 'TEXTAREA':
                    return true;
                default:
                    return false;
            }
        },
    } // End aria
};
let uniqueId = 0;

export { format as f, utils as u };

//# sourceMappingURL=utils-4523b86b.js.map