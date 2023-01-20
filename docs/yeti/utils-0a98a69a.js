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
    console.log(candidate);
    try {
      JSON.parse(candidate);
    }
    catch (e) {
      console.error('Invalid JSON!');
      return false;
    }
    console.log('Valid JSON!');
    return true;
  }
};
let uniqueId = 0;

export { format as f, utils as u };
