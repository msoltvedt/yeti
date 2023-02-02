export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const utils = {

  
  generateUniqueId: function() {
    ++uniqueId;
    return 'yid' + uniqueId;
  },


  isConvertibleToDate: function(possibleDate: string) {
    const re = /(\b[0-9]{1,4}(\/|\-)[0-9]{1,2}(\/|\-)[0-9]{2,4}\b)|((\w{3})\s\d)/g;
    if (possibleDate.search(re) > -1) {
      let dateObject = new Date(possibleDate);
      if (dateObject.toString() == "Invalid Date") {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  },



  isConvertibleToNumber: function(possibleNumber: string) {
    let castedPossibility = this.castToNumber(possibleNumber.toString());
    if (Number.isNaN(castedPossibility)) {
      return false;
    } else {
      return true;
    }
  },



  getStringifiedType: function(dunno: string) {
    if (utils.isConvertibleToDate(dunno)) {
      return "date";
    } else {
      if (utils.isConvertibleToNumber( dunno )) {
        return "number";
      } else {
        return "string";
      }
    }
  },



  castToNumber: function(someString: string) {
    return parseFloat( someString.replace(/,/g, '') );
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
  cells: YetiTableCell[],
  rowIndex?: number
}

export interface YetiTableCell {
  cssClass?: string,
  isHeading?: boolean,
  sortDirection?: string, // "ascending" | "descending" | "unsorted"
  id?: string,
  value: string,
  columnIndex?: number
}

let uniqueId = 0;