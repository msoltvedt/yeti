function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
function generateUniqueId() {
  return 'id112233';
}

export { format as f, generateUniqueId as g };
