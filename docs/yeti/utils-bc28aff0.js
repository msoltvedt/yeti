function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
const utils = {
  generateUniqueId: function () {
    ++uniqueId;
    return 'yid' + uniqueId;
  },
  isDate: function (possibleDate) {
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
  isNumber: function (possibleNumber) {
    let castedPossibility = this.castToNumber(possibleNumber);
    if (Number.isNaN(castedPossibility)) {
      return false;
    }
    else {
      return true;
    }
  },
  getType: function (dunno) {
    if (utils.isDate(dunno)) {
      console.log(`${dunno} is date`);
      return "date";
    }
    else {
      if (utils.isNumber(dunno)) {
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
    return parseFloat(someString.replace(',', ''));
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
