function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
const utils = {
  generateUniqueId: function () {
    ++uniqueId;
    return 'yid' + uniqueId;
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
    console.log('In isConvertableToNumber, possibleNumber was', possibleNumber.toString(), typeof possibleNumber);
    let castedPossibility = this.castToNumber(possibleNumber.toString());
    if (Number.isNaN(castedPossibility)) {
      return false;
    }
    else {
      return true;
    }
  },
  getType: function (dunno) {
    if (utils.isConvertibleToDate(dunno)) {
      console.log(`${dunno} is date`);
      return "date";
    }
    else {
      if (utils.isConvertibleToNumber(dunno)) {
        console.log(`${dunno} is number`);
        return "number";
      }
      else {
        console.log(`${dunno} is string`);
        return "string";
      }
    }
  },
  castToNumber: function (someString) {
    console.log('in castToNumber, someString was', someString, typeof someString);
    let deCommaified = someString.replace('/,/g', '');
    console.log('in castToNumber, have de-comma-ified, someString was', deCommaified, typeof deCommaified);
    console.warn(`Return ${parseFloat(deCommaified)} from castToNumber`);
    return parseFloat(deCommaified);
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
  }
};
let uniqueId = 0;

export { format as f, utils as u };
