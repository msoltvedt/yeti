import { Component, Prop, h, State, Watch, Element, Listen } from '@stencil/core';
import { utils, YetiTableContents, YetiTableRow, YetiTableCell } from '../../utils/utils';

@Component({
  tag: 'yeti-table',
  shadow: false,
})

export class YetiTable {

  @Element() el: HTMLElement;

  @Prop() tableClass: string = '';

  @Prop() tableId: string = utils.generateUniqueId();

  @Prop() contents: YetiTableContents = {
    head: {
      rows: [
        {
          cells: [
            {
              value: "Data"
            }
          ]
        }
      ]
    },

    body: {
      rows: [
        {
          cells: [
            {
              value: "This table has no data."
            }
          ]
        }
      ]
    }
  }

  @Watch('contents')
  watchContentsHandler(newValue: YetiTableContents) {

    if (!newValue.body) {
      console.error('Supplied data has no table body.');
      return false;
    } else if (!newValue.body.rows) {
      console.error('Supplied data must have rows in table body.');
      return false;
    }

  }

  @State() contentsActual: YetiTableContents;

  @Prop({
    mutable: true,
    reflect: true
  }) isValid: boolean = true;

  @State() iLoveJSX: boolean = true;

  @Listen('paginationUpdated')
  handlePaginationUpdate() {
    this.iLoveJSX = !this.iLoveJSX; // this.render() doesn't work, and there's no this.forceUpdate() in Stencil
  }



  componentWillLoad() {
    this.watchContentsHandler(this.contents);
  }




  isValidTableData(data: object | string): boolean {
    // Verify that the supplied data is in the correct format.
    
    if (utils.isValidJSON(data)) {
      // The data is at least JSON
      data = JSON.stringify(data);
      data = JSON.parse(data);

      return true;
    } else {
      console.error('Error in yeti-table; supplied data was not valid JSON.');
    }

    return true;
  }



  renderCell(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';

    cell.id = (cell.id) ? cell.id : utils.generateUniqueId();

    if (cell.isHeading) {
      return <th class={'yeti-table-heading' + css} key={cell.id}>{cell.value}</th>
    } else {
      return <td class={'yeti-table-cell' + css} key={cell.id}>{cell.value}</td>
    }

  }



  renderRow(row: YetiTableRow) {

    let cells = [];

    row.cells.map((cell: YetiTableCell) => {
      cells.push(this.renderCell(cell));
    })

    return cells;

  }



  // renderRows(rows: YetiTableRow[]) {

  //   let tbodyContents = [];

  //   rows.map((row) => {
  //     tbodyContents.push(
  //       <tr class={"yeti-table-body-row"} id={row.id ? row.id : utils.generateUniqueId()}>{this.renderRow(row)}</tr>
  //     );
  //   })

  //   return tbodyContents;
  // }



  renderRows(rowStartIndex: number = 0, rowEndIndex: number = this.contents.body.rows.length-1) {

    let tbodyContents = [];

    for (let i = rowStartIndex; i <= rowEndIndex; i++) {

      const row = this.contents.body.rows[i];
      row.id = (row.id) ? row.id : utils.generateUniqueId();
      tbodyContents.push( 
        <tr class={"yeti-table-body-row"} key={row.id}>{this.renderRow(row)}</tr>
      );

    }

    return tbodyContents;
  }



  render() {

    let cssClass = 'yeti-table';
    let paginationComponent = this.el.querySelector('yeti-table-pagination');
    let indexOfFirstRowToDisplay: number = 0;
    let indexOfLastRowToDisplay: number = this.contents.body.rows.length-1;
    
    if (paginationComponent != null) {
      
      paginationComponent.records = this.contents.body.rows.length;

      paginationComponent.id = paginationComponent.id ? paginationComponent.id : utils.generateUniqueId();

      indexOfFirstRowToDisplay = paginationComponent.startIndex - 1;
      indexOfLastRowToDisplay = paginationComponent.endIndex - 1;

    }

    if (this.tableClass != '') {
      cssClass += ' ' + this.tableClass;
    }

    if (this.isValid == false) {
      cssClass += ' yeti-input__error';
    }

    return (
      
      <table class={cssClass}>

        <thead class="yeti-table-head">

          <tr class="yeti-table-head-row">

              {
                this.contents.head.rows.map((row) => {
                  return this.renderRow(row);
                })
              }

          </tr>

        </thead>


        <tbody class="yeti-table-body">

          {
            this.renderRows(indexOfFirstRowToDisplay, indexOfLastRowToDisplay)
          }

        </tbody>

    </table>
    );
  }

}
