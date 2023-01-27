export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const utils = {

  
  generateUniqueId: function() {
    ++uniqueId;
    return 'yid' + uniqueId;
  },


  isValidJSON: function(candidate: object | string) {

    candidate = JSON.stringify(candidate);

    try {
      JSON.parse(candidate);
    } catch (e) {
      return false;
    }
    return true;

  }

}

export interface YetiTableContents {
  head? : {
    cssClass?: string,
    id?: string,
    rows : YetiTableRow[]
  },

  body : {
    cssClass?: string,
    id?: string,
    rows : YetiTableRow[]
  },

  foot? : {
    cssClass?: string,
    id?: string,
    rows : YetiTableRow[]
  },
}

export interface YetiTableRow {
  cssClass?: string,
  isExpandable?: boolean,
  id?: string,
  cells: YetiTableCell[]
}

export interface YetiTableCell {
  cssClass?: string,
  isHeading?: boolean,
  id?: string,
  value: string
}

let uniqueId = 0;