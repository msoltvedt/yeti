import { Component, Prop, h, State, Watch, Element } from '@stencil/core';
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
    /*if (this.isValidTableData(newValue))
    this.isValidTableData(newValue);
    this.contentsActual = newValue as JSON;*/

    /*try {
      newContents = newValue as TableContents;
      console.log(newContents.body);

      if (!newContents.body) {
        throw new Error('Supplied data has no table body.');
      } else if (!newContents.body.rows) {
        throw new Error('Supplied data must have rows in table body.');
      }
    } catch (e) {
      console.error(e.message);
    }*/

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



  componentWillLoad() {
    this.watchContentsHandler(this.contents);
  }




  isValidTableData(data: object | string): boolean {
    // Verify that the supplied data is in the correct format.
    console.log('isValidJSON returned ', utils.isValidJSON(data));
    
    if (utils.isValidJSON(data)) {
      // The data is at least JSON
      data = JSON.stringify(data);
      data = JSON.parse(data);
      
      console.log(Object.keys(data));

      return true;
    } else {
      console.error('Error in yeti-table; supplied data was not valid JSON.');
    }

    return true;
  }



  renderCell(cell: YetiTableCell) {

    let css = (cell.cssClass && cell.cssClass != '') ? ' ' + cell.cssClass : '';

    if (cell.isHeading) {
      return <th class={'yeti-table-heading' + css} id={cell.id ? cell.id : utils.generateUniqueId()}>{cell.value}</th>
    } else {
      return <td class={'yeti-table-cell' + css} id={cell.id ? cell.id : utils.generateUniqueId()}>{cell.value}</td>
    }

  }



  renderRow(row: YetiTableRow) {

    let cells = [];

    row.cells.map((cell: YetiTableCell) => {
      cells.push(this.renderCell(cell));
    })

    return cells;

  }



  renderRows(rows: YetiTableRow[]) {

    let tbodyContents = [];

    rows.map((row) => {
      tbodyContents.push(
        <tr class={"yeti-table-body-row"} id={row.id ? row.id : utils.generateUniqueId()}>{this.renderRow(row)}</tr>
      );
    })

    return tbodyContents;
  }



  render() {

    let cssClass = 'yeti-table';

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
            this.renderRows(this.contents.body.rows)
          }

        </tbody>

    </table>
    );
  }

}
