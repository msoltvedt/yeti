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
  getType: function (dunno) {
    if (utils.isDate(dunno)) {
      return "date";
    }
    else {
      if (Number.isNaN(parseInt(dunno, 10))) {
        return "string";
      }
      else {
        return "number";
      }
    }
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
