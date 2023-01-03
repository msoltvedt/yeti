export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function generateUniqueId() {
  ++uniqueId;
  return 'id' + uniqueId;
}

export const utils = {

  generateUniqueId: function() {
    ++uniqueId;
    return 'id' + uniqueId;
  },

  

}

let uniqueId = 0;