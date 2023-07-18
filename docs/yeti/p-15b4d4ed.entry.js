import{r as t,c as e,h as i,g as s}from"./p-ad659053.js";import{u as l}from"./p-5f7a1b51.js";const a=class{constructor(i){t(this,i),this.rowActionClick=e(this,"rowActionClick",7),this.tableSort=e(this,"tableSort",7),this.tableFilter=e(this,"tableFilter",7),this.tablePaginate=e(this,"tablePaginate",7),this.tableHasFilters=!1,this.rowsThatPassFiltering=0,this.tableClass="",this.tableId=l.generateUniqueId(),this.noMatchesText="No matches",this.records=0,this.contents={head:{rows:[]},body:{rows:[]}},this.sortSelf=!0,this.filterSelf=!0,this.paginateSelf=!0,this.iLoveJSX=!0,this.firstRecordIndexToDisplay=0,this.numRecordsToDisplay=0,this.paginationComponent=null,this.filtersAreActive=!1}watchContentsHandler(t,e){return t.body?t.body.rows?(this.markRowsWithChangedRowActions(e),t.head&&e.head&&t.head!=e.head&&this.setHeadingColumnIndices(),void(t.body&&e.body&&t.body!=e.body&&this.setBodyColumnIndices())):(console.error("Supplied data must have rows in table body."),!1):(console.error("Supplied data has no table body."),!1)}handlePaginationUpdate(t){let e=t.target;this.numRecordsToDisplay=e.recordsDisplayed,this.paginateSelf?this.firstRecordIndexToDisplay=e.startIndex:this.tablePaginate.emit({currentPage:t.detail.currentPage,recordsDisplayed:t.detail.recordsDisplayed})}handleReadyToVerify(t){let e=t.target,i=parseInt(e.getAttribute("data-column"));switch(e.nodeName.toLowerCase()){case"yeti-date-picker":return void this.handleDateFilterChange(t.target,i);case"yeti-multiselect":return void("readyToVerifyFast"==t.type&&this.handleMultiselectFilterChange(t.target,i))}}handleMenuButtonChange(t){let e=t.detail.newValue,i=t.target.getAttribute("data-row-index");this.rowActionClick.emit({rowIndex:i,actionLabel:e})}setFiltersActiveFlag(){if(this.tableHasFilters){for(let t=0;t<this.contents.head.rows[0].cells.length;t++)if(this.contents.head.rows[0].cells[t].filtering&&""!=this.contents.head.rows[0].cells[t].filtering.value&&null!=this.contents.head.rows[0].cells[t].filtering.value)return void(this.filtersAreActive=!0);this.filtersAreActive=!1}else this.filtersAreActive=!1}markRowsWithChangedRowActions(t){this.contents.body&&this.contents.body.rows&&this.contents.body.rows.length&&this.contents.body.rows.forEach(((e,i)=>{e.cells.forEach(((s,a)=>{s.rowActions&&s.rowActions.length&&s.rowActions.length>0&&t.body&&t.body.rows&&t.body.rows[i]&&t.body.rows[i].cells[a]&&!l.isEqual(s.rowActions,t.body.rows[i].cells[a].rowActions)&&(e.rowActionsJustChanged=!0)}))}))}isValidTableData(t){return l.isValidJSON(t)?(t=JSON.stringify(t),t=JSON.parse(t),!0):(console.error("Error in yeti-table; supplied data was not valid JSON."),!0)}setHeadingColumnIndices(){this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0&&this.contents.head.rows.forEach(((t,e)=>{t.rowIndex=e,t.cells.forEach(((t,e)=>{t.columnIndex=e}))}))}setBodyColumnIndices(){this.contents.body.rows.forEach(((t,e)=>{t.rowIndex=e,t.cells.forEach(((t,i)=>{t.columnIndex=i,t.rowIndex=e}))}))}setSortableOnCellsOtherThanTheOneWithThisIndex(t){let e=this.contents.head.rows[0].cells;for(let i=0,s=e[0];i<e.length;i++,s=e[i])s.sortDirection&&(s.sortDirection=s.columnIndex==t?s.sortDirection:"unsorted")}setDefaultFilterValues(){this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0&&(this.contents.head.rows.forEach((t=>{t.cells.forEach((t=>{t.filtering&&(t.filtering.value="")}))})),this.filtersAreActive=!1)}handleSort(t,e){t.preventDefault(),this.sortSelf?(this.contents.body.rows.sort(((t,i)=>{let s=t.cells[e.columnIndex].value,a=i.cells[e.columnIndex].value,n=l.getStringifiedType(s),r=l.getStringifiedType(a),h="ascending"==e.sortDirection?-1:1;if(n!=r)if(h>0)switch(n){case"number":case"string":return-1;default:return 1}else switch(n){case"date":case"string":return-1;default:return 1}switch(n){case"number":return(l.castToNumber(s)-l.castToNumber(a))*h;case"string":return s==a?0:s<a?-1*h:1*h;case"date":{let t=new Date(s),e=new Date(a);return t==e?0:t<e?-1*h:1*h}}})),e.sortDirection="ascending"==e.sortDirection?"descending":"ascending",this.setSortableOnCellsOtherThanTheOneWithThisIndex(e.columnIndex),this.iLoveJSX=!this.iLoveJSX):this.tableSort.emit({columnIndex:e.columnIndex,sortDirection:"ascending"==e.sortDirection?"descending":"ascending"})}handleTextFilterChange(t,e){this.filterSelf?(this.contents.head.rows[0].cells[e].filtering.value=t.value,this.iLoveJSX=!this.iLoveJSX):(this.paginationComponent.selectedPage=1,this.tableFilter.emit({columnIndex:e,value:t.value})),this.setFiltersActiveFlag()}handleSelectFilterChange(t,e){this.filterSelf?(this.contents.head.rows[0].cells[e].filtering.value=0==t.selectedIndex?"":t.value,this.iLoveJSX=!this.iLoveJSX):(this.paginationComponent.selectedPage=1,this.tableFilter.emit({columnIndex:e,value:t.value})),this.setFiltersActiveFlag()}handleDateFilterChange(t,e){this.filterSelf?(this.contents.head.rows[0].cells[e].filtering.value=t.value,this.iLoveJSX=!this.iLoveJSX):(this.paginationComponent.selectedPage=1,this.tableFilter.emit({columnIndex:e,value:t.value})),this.setFiltersActiveFlag()}handleMultiselectFilterChange(t,e){this.filterSelf?(this.contents.head.rows[0].cells[e].filtering.value=t.value,this.iLoveJSX=!this.iLoveJSX):(this.paginationComponent.selectedPage=1,this.tableFilter.emit({columnIndex:e,value:t.value})),this.setFiltersActiveFlag()}handleClearAllFilters(){this.filterSelf?this.iLoveJSX=!this.iLoveJSX:(this.paginationComponent.selectedPage=1,this.tableFilter.emit({columnIndex:-1,value:"clear"})),this.setDefaultFilterValues()}doesRowPassFiltering(t){if(!this.filterSelf)return!0;for(let e=0;e<t.cells.length;e++)if(!this.doesCellPassFiltering(t.cells[e]))return console.error(`row ${t.rowIndex} failed filtering because of cell ${t.cells[e].value}`),!1;return!0}doesCellPassFiltering(t){if("undefined"==t.value&&(t.value=""),!(this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0))return!0;let e=this.contents.head.rows[0].cells[t.columnIndex];if(!(e&&e.filtering&&e.filtering.isFilterable&&e.filtering.value))return!0;{let i=e.filtering.value;switch(e.filtering.type){case"text":return t.value.indexOf(i)>=0;case"select":return t.value.indexOf(i)>=0||""==i;case"date":return""==i||new Date(i).getTime()==new Date(t.value).getTime();case"multiselect":return""==i||i.split(",").includes(t.value);default:return console.error("Error in table data: unexpected filtering type supplied."),!1}}}getNumberOfRecords(){return this.contents.body&&this.contents.body.rows&&this.contents.body.rows.length?this.contents.body.rows.length:-1}renderCell(t){if(t.id&&""!=t.id||(t.id=l.generateUniqueId()),t.filtering&&t.filtering.isClearCell)return this.tableHasFilters=!0,this.renderFilterClearCell(t);if(t.rowActions)return this.renderRowActionsCell(t);if(t.isHeading)return this.renderTableHeading(t);{let e=t.cssClass&&""!=t.cssClass?" "+t.cssClass:"";return t.template?i("td",{class:"yeti-table-cell"+e,id:t.id,key:t.id,innerHTML:t.template}):i("td",{class:"yeti-table-cell"+e,id:t.id,key:t.id},t.value)}}renderRowActionsCell(t){let e,s,a,n=t.cssClass&&""!=t.cssClass?"yeti-table-cell yeti-table-control yeti-table-cell-row_actions"+t.cssClass:"yeti-table-cell yeti-table-control yeti-table-cell-row_actions",r=document.querySelector(`#${t.id} yeti-menu-button`);if(e=r&&r.getAttribute("id")?r.getAttribute("id"):t.id&&""!==t.id?`${t.id}_menuButton`:l.generateUniqueId(),a=r&&r.getAttribute("data-times-updated")?parseInt(r.getAttribute("data-times-updated")):0,this.contents.body.rows[t.rowIndex].rowActionsJustChanged&&(++a,e=t.id&&""!==t.id?`${t.id}_menuButton_mk${a}`:l.generateUniqueId(),this.contents.body.rows[t.rowIndex].rowActionsJustChanged=!1),t.rowActions.length<=0)return i("td",{class:n,id:t.id,key:t.id});{let l=[];for(let s=0;s<t.rowActions.length;s++){let a,n=`${e}_opt${s}`;a=i("yeti-menu-button-option",t.rowActions[s].href?{href:t.rowActions[s].href,id:n,key:n}:{id:n,key:n},t.rowActions[s].label),l.push(a)}return s=i("yeti-menu-button",{"menu-alignment":"right","data-row-index":t.rowIndex,"data-times-updated":`${a}`,id:e,key:e,tooltipText:"Row actions"},l),i("td",{class:n,id:t.id,key:t.id},s)}}renderFilterClearCell(t){let e=t.cssClass&&""!=t.cssClass?" "+t.cssClass:"",s=i("yeti-tooltip",{text:"Clear filters"},i("button",{class:"yeti-table-filter-clear-button",onClick:t=>{this.handleClearAllFilters(),t.preventDefault()},"aria-label":"Clear all filters"},i("span",{class:"material-icons","aria-hidden":"true"},"cancel")));return i("td",{class:`yeti-table-heading yeti-table-cell-clear ${e}`,id:t.id,key:t.id},this.filtersAreActive?s:"")}renderTableHeading(t){let e=t.cssClass&&""!=t.cssClass?" "+t.cssClass:"";if(t.isHeading){let s;if(s=t.id&&""!=t.id?`${t.id}_heading`:l.generateUniqueId(),t.sortDirection){let l,a,n,r="";switch(t.sortDirection=t.sortDirection.toLowerCase(),t.sortDirection){case"ascending":a="Sorted ascending",n="expand_less";break;case"descending":a="Sorted descending",n="expand_more";break;default:a="Sortable",n="unfold_more"}return t.filtering&&t.filtering.isFilterable&&(r=i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(t,s))),l=i("th",{class:`yeti-table-heading ${e}`,scope:t.scope&&"row"==t.scope?"row":"col"},i("div",{class:"yeti-table-heading-compound"},i("button",{class:"yeti-table-heading-button",onClick:e=>{this.handleSort(e,t)}},i("div",{class:"yeti-table-heading-button-label",id:s},t.value),i("span",{class:"yeti-table-heading-button-icon"},i("span",{class:"yeti-a11y-hidden"},a),i("span",{class:"material-icons","aria-hidden":"true",title:a},n))),r||"")),l}return i("th",{class:"yeti-table-heading"+e,scope:t.scope&&"row"==t.scope?"row":"col"},t.filtering&&t.filtering.isFilterable?i("div",{class:"yeti-table-heading-compound"},i("div",{class:"yeti-table-heading-compound-actual",id:s},t.value),i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(t,s))):t.value)}console.error("Error rendering table cell: expected th, got td.")}renderTableHeadingFilter(t,e){let s=`${t.id}_filter`;switch(t.filtering.type){case"text":return i("input",{type:"text",value:t.filtering.value,class:"yeti-input yeti-table-heading-filter-input",onKeyUp:e=>{this.handleTextFilterChange(e.target,t.columnIndex)},"aria-labelledby":e});case"select":let l=[];if(!(t.filtering.options&&t.filtering.options.length>0))return console.error("Error in table select filter: no options supplied."),!1;for(let e=0;e<t.filtering.options.length;e++){let a=0==e&&""==t.filtering.value,n=`${s}_option${e}`;a=t.filtering.options[e]==t.filtering.value,l.push(i("option",{selected:a,id:n,key:n},t.filtering.options[e]))}return i("select",{class:"yeti-select yeti-table-heading-filter-input",onChange:e=>{this.handleSelectFilterChange(e.target,t.columnIndex)},"aria-labelledby":e},i("option",{value:"",id:`${s}_defaultOption`,key:`${s}_defaultOption`},"- Any -"),l);case"date":return i("yeti-date-picker",{"data-column":t.columnIndex,"labelled-by":e,value:t.filtering.value,id:s,key:s});case"multiselect":let a=[];if(!(t.filtering.options&&t.filtering.options.length>0))return console.error("Error in table multiselect filter: no options supplied."),!1;for(let e=0;e<t.filtering.options.length;e++){let l=`${s}_option${e}`;a.push(i("yeti-multiselect-option",{id:l,key:l},t.filtering.options[e]))}return i("yeti-multiselect",{placeholder:"- Any -","data-column":t.columnIndex,"labelled-by":e,id:s,key:s,value:t.filtering.value},a);default:return console.error("Error rendering table filter: unexpected filtering type requested:",t.filtering.type),""}}renderRow(t){let e=[];return t.cells.forEach((t=>{e.push(this.renderCell(t))})),e}renderHeaderRow(t){return 0!=this.contents.head.rows.length&&this.contents.head.rows[0].cells&&0!=this.contents.head.rows[0].cells.length?this.renderRow(t):i("th",{class:"yeti-table-heading",scope:"col"},"No data")}renderRows(t=0,e=this.contents.body.rows.length){let s=[],a=[],n=0;if(0==this.contents.body.rows.length||!this.contents.body.rows[0].cells||0==this.contents.body.rows[0].cells.length)return i("tr",{class:"yeti-table-body-row"},i("td",{class:"yeti-table-cell",colSpan:this.contents.head.rows[0]&&this.contents.head.rows[0].cells?this.contents.head.rows[0].cells.length:1},"This table has no data."));for(let r=0;r<this.contents.body.rows.length;r++){const h=this.contents.body.rows[r];this.doesRowPassFiltering(h)&&(a.push(h),r>=t&&n<e&&a.length>=t&&(h.id&&""!=h.id||(h.id=l.generateUniqueId()),++n,s.push(i("tr",{class:"yeti-table-body-row",id:h.id,key:h.id},this.renderRow(h)))))}return this.rowsThatPassFiltering=a.length,s.length>0?s:i("tr",{class:"yeti-table-body-row"},i("td",{class:"yeti-table-cell",colSpan:this.contents.head.rows[0].cells.length},this.noMatchesText))}componentWillLoad(){let t,e=this.el.getAttribute("id"),i=this.el.querySelector("yeti-table-pagination");if(i){let t=i.querySelector("yeti-table-pagination-option"),e=t?parseInt(t.textContent):10;t&&(e=t.hasAttribute("all")?this.getNumberOfRecords():e),this.numRecordsToDisplay=isNaN(e)?10:e}else this.numRecordsToDisplay=this.getNumberOfRecords();e&&""!=e||(e=l.generateUniqueId(),this.el.setAttribute("id",e)),this.setHeadingColumnIndices(),this.setBodyColumnIndices(),this.watchContentsHandler(this.contents,this.contents),this.paginationComponent=this.el.querySelector("yeti-table-pagination"),i&&(t=i.getAttribute("id"),t=t&&""!==t?t:`${e}_pagination`,i.setAttribute("id",t))}componentWillRender(){this.paginateSelf||(this.numRecordsToDisplay=this.paginationComponent.recordsDisplayed)}render(){let t="yeti-table";return""!=this.tableClass&&(t+=" "+this.tableClass),i("table",{class:t},this.contents.head?i("thead",{class:"yeti-table-head"},i("tr",{class:"yeti-table-head-row"},this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0&&this.contents.head.rows[0].cells&&this.contents.head.rows[0].cells.length>0?this.contents.head.rows.map((t=>this.renderRow(t))):i("th",{class:"yeti-table-heading",scope:"col"},"No data"))):"",i("tbody",{class:"yeti-table-body"},this.renderRows(this.firstRecordIndexToDisplay,this.numRecordsToDisplay)))}componentDidRender(){let t=this.el.querySelector("yeti-table-pagination");null!=t&&(t.records=this.paginateSelf?this.rowsThatPassFiltering:this.records)}get el(){return s(this)}static get watchers(){return{contents:["watchContentsHandler"]}}};export{a as yeti_table}