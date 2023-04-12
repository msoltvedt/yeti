export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const utils = {

  
  generateUniqueId: function() {
    ++uniqueId;
    return 'yid' + uniqueId;
  },


  isEqual: function(a, b) {

    const objKeysA = Object.keys(a);
    const objKeysB = Object.keys(b);
  
    const areBothArrays = Array.isArray(a) && Array.isArray(b);
    const areBothObjects = this.isObject(a) && this.isObject(b);

    // Handle type mismatch
    if (typeof a != typeof b) {
      return false;
    }

    // Handle arrays
    if (areBothArrays) {
      if (a.length != b.length) {
        return false;
      } else {
        for (let i = 0; i < a.length; i++) {
          if (!this.isEqual(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
    }

    // Handle non-array objects
    if (areBothObjects) {
  
      if (objKeysA.length !== objKeysB.length) {
        return false;
      }
    
      for (var key of objKeysA) {
        const aValue = a[key];
        const bValue = b[key];
    
        if (!this.isEqual(aValue, bValue)) {
          return false;
        }
      }
      return true;
    }

    // Handle everything else
    return a === b;
  },
  


  isObject: function(object) {
    return object != null && typeof object === "object";
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

  },



  getMonthName: function(date: Date) {
    return new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
  }

  

}



/****************************************************** Interfaces *********************************************/
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

  state? : {
    totalRecords: number
  }
}

export interface YetiTableRow {
  cssClass?: string,
  isExpandable?: boolean,
  id?: string,
  cells: YetiTableCell[],
  rowIndex?: number,
  rowActionsJustChanged?: boolean,
  detail?: object
}

export interface YetiTableCell {
  cssClass?: string,
  isHeading?: boolean,
  sortDirection?: string, // "ascending" | "descending" | "unsorted"
  id?: string,
  value: string,
  columnIndex?: number,
  rowIndex?: number,
  filtering?: YetiTableFilterObject,
  rowActions?: YetiTableRowAction[],
  scope?: string, // "col" (default) | "row",
  template?: any, // HTML
  detail: object
}

export interface YetiTableFilterObject {
  isFilterable: boolean,
  isClearCell: boolean,
  type?: string // "text" | "date" | "select" | "multiselect"
  options?: string[],
  value?: string
}

export interface YetiTableRowAction {
  label: string,
  href?: string
}

export interface YetiMultiselectOption {
  selected: boolean,
  label: string,
  id?: string
}

export interface YetiMenuButtonOption {
  label: string,
  href?: string,
  hasHTML?: boolean,
  id: string,
  value?: string,
  innerHTML?: string
}

let uniqueId = 0;