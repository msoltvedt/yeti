function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
function generateUniqueId() {
  return 'id1';
}

export { format as f, generateUniqueId as g };
