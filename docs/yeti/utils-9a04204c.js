function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
const utils = {
  generateUniqueId: function () {
    ++uniqueId;
    return 'yid' + uniqueId;
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
    const re = /(\b[0-9]{1,4}(\/|\-)[0-9]{1,2}(\/|\-)[0-9]{2,4}\b)|((\w{3})\s\d)/g;
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
    let castedPossibility = this.castToNumber(possibleNumber.toString());
    if (Number.isNaN(castedPossibility)) {
      return false;
    }
    else {
      return true;
    }
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
  }
};
let uniqueId = 0;

export { format as f, utils as u };

//# sourceMappingURL=utils-9a04204c.js.map