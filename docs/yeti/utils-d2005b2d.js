function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
function generateUniqueId() {
  ++uniqueId;
  return 'id' + uniqueId;
}
const utils = {
  generateUniqueId: function () {
    ++uniqueId;
    return 'id' + uniqueId;
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
