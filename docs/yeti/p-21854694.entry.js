import{r as e,c as t,h as i,g as l}from"./p-f504dd71.js";import{u as s}from"./p-5c303e9a.js";const a=class{constructor(i){e(this,i),this.rowActionClick=t(this,"rowActionClick",7),this.tableClass="",this.tableId=s.generateUniqueId(),this.contents={head:{rows:[{cells:[{value:"Data"}]}]},body:{rows:[{cells:[{value:"This table has no data."}]}]}},this.contentsActual=void 0,this.isValid=!0,this.iLoveJSX=!0}watchContentsHandler(e){return e.body?e.body.rows?void 0:(console.error("Supplied data must have rows in table body."),!1):(console.error("Supplied data has no table body."),!1)}handlePaginationUpdate(){this.iLoveJSX=!this.iLoveJSX}handleReadyToVerify(e){let t=e.target,i=parseInt(t.getAttribute("data-column"));switch(t.nodeName.toLowerCase()){case"yeti-date-picker":return void this.handleDateFilterChange(e.target,i);case"yeti-multiselect":return void this.handleMultiselectFilterChange(e.target,i)}}handleMenuButtonChange(e){let t=e.detail.newValue,i=e.target.getAttribute("data-row-index");this.rowActionClick.emit({rowIndex:i,actionLabel:t})}isValidTableData(e){return s.isValidJSON(e)?(e=JSON.stringify(e),e=JSON.parse(e),!0):(console.error("Error in yeti-table; supplied data was not valid JSON."),!0)}setHeadingColumnIndices(){this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0&&this.contents.head.rows.forEach(((e,t)=>{e.rowIndex=t,e.cells.forEach(((e,t)=>{e.columnIndex=t}))}))}setBodyColumnIndices(){this.contents.body.rows.forEach(((e,t)=>{e.rowIndex=t,e.cells.forEach(((e,i)=>{e.columnIndex=i,e.rowIndex=t}))}))}setSortableOnCellsOtherThanTheOneWithThisIndex(e){let t=this.contents.head.rows[0].cells;for(let i=0,l=t[0];i<t.length;i++,l=t[i])l.sortDirection&&(l.sortDirection=l.columnIndex==e?l.sortDirection:"unsorted")}setDefaultFilterValues(){this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0&&this.contents.head.rows.forEach((e=>{e.cells.forEach((e=>{e.filtering&&(e.filtering.value="")}))}))}handleSort(e){this.contents.body.rows.sort(((t,i)=>{let l=t.cells[e.columnIndex].value,a=i.cells[e.columnIndex].value,n=s.getStringifiedType(l),r=s.getStringifiedType(a),o="ascending"==e.sortDirection?-1:1;if(n!=r)if(o>0)switch(n){case"number":case"string":return-1;default:return 1}else switch(n){case"date":case"string":return-1;default:return 1}switch(n){case"number":return(s.castToNumber(l)-s.castToNumber(a))*o;case"string":return l==a?0:l<a?-1*o:1*o;case"date":{let e=new Date(l),t=new Date(a);return e==t?0:e<t?-1*o:1*o}}})),e.sortDirection="ascending"==e.sortDirection?"descending":"ascending",this.setSortableOnCellsOtherThanTheOneWithThisIndex(e.columnIndex),this.iLoveJSX=!this.iLoveJSX}handleTextFilterChange(e,t){this.contents.head.rows[0].cells[t].filtering.value=e.value,this.iLoveJSX=!this.iLoveJSX}handleSelectFilterChange(e,t){this.contents.head.rows[0].cells[t].filtering.value=0==e.selectedIndex?"":e.value,this.iLoveJSX=!this.iLoveJSX}handleDateFilterChange(e,t){this.contents.head.rows[0].cells[t].filtering.value=e.value,this.iLoveJSX=!this.iLoveJSX}handleMultiselectFilterChange(e,t){this.contents.head.rows[0].cells[t].filtering.value=e.value,this.iLoveJSX=!this.iLoveJSX}handleClearAllFilters(){this.setDefaultFilterValues(),this.iLoveJSX=!this.iLoveJSX}doesRowPassFiltering(e){for(let t=0;t<e.cells.length;t++)if(!this.doesCellPassFiltering(e.cells[t]))return!1;return!0}doesCellPassFiltering(e){if(!(this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0))return!0;let t=this.contents.head.rows[0].cells[e.columnIndex];if(!t.filtering||!t.filtering.isFilterable)return!0;{let i=t.filtering.value;switch(t.filtering.type){case"text":return e.value.indexOf(i)>=0;case"select":return e.value.indexOf(i)>=0||""==i;case"date":return""==i||new Date(i).getTime()==new Date(e.value).getTime();case"multiselect":return""==i||i.split(",").includes(e.value);default:return console.error("Error in table data: unexpected filtering type supplied."),!1}}}renderCell(e){return e.id=e.id?e.id:s.generateUniqueId(),e.filtering&&e.filtering.isClearCell?this.renderFilterClearCell(e):e.rowActions?this.renderRowActionsCell(e):e.isHeading?this.renderTableHeading(e):i("td",{class:"yeti-table-cell"+(e.cssClass&&""!=e.cssClass?" "+e.cssClass:""),key:e.id},e.value)}renderRowActionsCell(e){let t,l=e.cssClass&&""!=e.cssClass?"yeti-table-cell yeti-table-control yeti-table-cell-row_actions"+e.cssClass:"yeti-table-cell yeti-table-control yeti-table-cell-row_actions";if(e.rowActions.length<=0)return i("td",{class:l,key:e.id});{let s=[];for(let t=0;t<e.rowActions.length;t++){let l;l=i("yeti-menu-button-option",e.rowActions[t].href?{href:e.rowActions[t].href}:null,e.rowActions[t].label),s.push(l)}return t=i("yeti-menu-button",{"menu-alignment":"right","data-row-index":e.rowIndex,tooltipText:"Row actions"},s),i("td",{class:l,key:e.id},t)}}renderFilterClearCell(e){let t=e.cssClass&&""!=e.cssClass?" "+e.cssClass:"",l=i("yeti-tooltip",{text:"Clear filters"},i("button",{class:"yeti-table-filter-clear-button",onClick:()=>{this.handleClearAllFilters()},"aria-label":"Clear all filters"},i("span",{class:"material-icons","aria-hidden":"true"},"cancel"))),s=!1;if(this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0)for(let e=0;e<this.contents.head.rows[0].cells.length;e++){let t=this.contents.head.rows[0].cells[e];if(t.filtering&&t.filtering.value&&""!=t.filtering.value){s=!0;break}}return i("td",{class:`yeti-table-heading yeti-table-cell-clear ${t}`,key:e.id},s?l:"")}renderTableHeading(e){let t=e.cssClass&&""!=e.cssClass?" "+e.cssClass:"";if(e.isHeading){let l=s.generateUniqueId();if(e.sortDirection){let s,a,n,r="";switch(e.sortDirection=e.sortDirection.toLowerCase(),e.sortDirection){case"ascending":a="Sorted ascending",n="expand_less";break;case"descending":a="Sorted descending",n="expand_more";break;default:a="Sortable",n="unfold_more"}return e.filtering&&e.filtering.isFilterable&&(r=i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(e,l))),s=i("th",{class:`yeti-table-heading ${t}`,scope:e.scope&&"row"==e.scope?"row":"col"},i("div",{class:"yeti-table-heading-compound"},i("button",{class:"yeti-table-heading-button",onClick:()=>{this.handleSort(e)}},i("div",{class:"yeti-table-heading-button-label",id:l},e.value),i("span",{class:"yeti-table-heading-button-icon"},i("span",{class:"yeti-a11y-hidden"},a),i("span",{class:"material-icons","aria-hidden":"true",title:a},n))),r||"")),s}return i("th",{class:"yeti-table-heading"+t,key:e.id,scope:e.scope&&"row"==e.scope?"row":"col"},e.filtering&&e.filtering.isFilterable?i("div",{class:"yeti-table-heading-compound"},i("div",{class:"yeti-table-heading-compound-actual",id:l},e.value),i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(e,l))):e.value)}console.error("Error rendering table cell: expected th, got td.")}renderTableHeadingFilter(e,t){switch(e.filtering.type){case"text":return i("input",{type:"text",value:e.filtering.value,class:"yeti-input yeti-table-heading-filter-input",onKeyUp:t=>{this.handleTextFilterChange(t.target,e.columnIndex)},"aria-labelledby":t});case"select":let l=[];if(!(e.filtering.options&&e.filtering.options.length>0))return console.error("Error in table select filter: no options supplied."),!1;for(let t=0;t<e.filtering.options.length;t++){let s=0==t&&""==e.filtering.value;s=e.filtering.options[t]==e.filtering.value,l.push(i("option",{selected:s},e.filtering.options[t]))}return i("select",{class:"yeti-select yeti-table-heading-filter-input",onChange:t=>{this.handleSelectFilterChange(t.target,e.columnIndex)},"aria-labelledby":t},i("option",null,"-Any-"),l);case"date":return i("yeti-date-picker",{key:s.generateUniqueId(),"data-column":e.columnIndex,"labelled-by":t,value:e.filtering.value});case"multiselect":let a=[];if(!(e.filtering.options&&e.filtering.options.length>0))return console.error("Error in table multiselect filter: no options supplied."),!1;for(let t=0;t<e.filtering.options.length;t++)a.push(i("yeti-multiselect-option",null,e.filtering.options[t]));return i("yeti-multiselect",{placeholder:"-Any-","data-column":e.columnIndex,"labelled-by":t,value:e.filtering.value},a);default:return console.error("Error rendering table filter: unexpected filtering type requested:",e.filtering.type),""}}renderRow(e){let t=[];return e.cells.map((e=>{t.push(this.renderCell(e))})),t}renderRows(e=0,t=this.contents.body.rows.length-1){let l=[],a=0;for(let n=e;n<=t;n++){const e=this.contents.body.rows[n];this.doesRowPassFiltering(e)&&(++a,e.id=e.id?e.id:s.generateUniqueId(),l.push(i("tr",{class:"yeti-table-body-row",key:e.id},this.renderRow(e))))}return a>0?l:i("tr",{class:"yeti-table-body-row"},i("td",{class:"yeti-table-cell",colSpan:this.contents.head.rows[0].cells.length},"No matches"))}componentWillLoad(){this.watchContentsHandler(this.contents),this.setHeadingColumnIndices(),this.setBodyColumnIndices(),this.setDefaultFilterValues()}render(){let e="yeti-table",t=this.el.querySelector("yeti-table-pagination"),l=0,a=this.contents.body.rows.length-1;return null!=t&&(t.records=this.contents.body.rows.length,t.id=t.id?t.id:s.generateUniqueId(),l=t.startIndex-1,a=t.endIndex-1),""!=this.tableClass&&(e+=" "+this.tableClass),0==this.isValid&&(e+=" yeti-input__error"),i("table",{class:e},this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0?i("thead",{class:"yeti-table-head"},i("tr",{class:"yeti-table-head-row"},this.contents.head.rows.map((e=>this.renderRow(e))))):"",i("tbody",{class:"yeti-table-body"},this.renderRows(l,a)))}get el(){return l(this)}static get watchers(){return{contents:["watchContentsHandler"]}}};export{a as yeti_table}