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
  }
};
let uniqueId = 0;

export { format as f, generateUniqueId as g };
