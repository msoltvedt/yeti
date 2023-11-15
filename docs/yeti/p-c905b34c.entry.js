import{r as e,c as t,h as i,g as s}from"./p-b0bf542b.js";import{u as l}from"./p-4ae56677.js";const a=class{constructor(i){e(this,i);this.rowActionClick=t(this,"rowActionClick",7);this.cellRadioChange=t(this,"cellRadioChange",7);this.tableSort=t(this,"tableSort",7);this.tableFilter=t(this,"tableFilter",7);this.tablePaginate=t(this,"tablePaginate",7);this.tableHasFilters=false;this.rowsThatPassFiltering=0;this.tableClass="";this.tableId=l.generateUniqueId();this.noRecordsText="No records";this.noMatchesText="No records found matching your filter criteria";this.records=0;this.contents={head:{rows:[]},body:{rows:[]}};this.sortSelf=true;this.filterSelf=true;this.paginateSelf=true;this.placeholderText="";this.iLoveJSX=true;this.firstRecordIndexToDisplay=0;this.numRecordsToDisplay=0;this.paginationComponent=null;this.filtersAreActive=false}watchContentsHandler(e,t){if(!e.body){console.error("Supplied data has no table body.");return false}else if(!e.body.rows){console.error("Supplied data must have rows in table body.");return false}this.markRowsWithChangedRowActions(t);if(e.head&&t.head&&e.head!=t.head){this.setHeadingColumnIndices()}if(e.body&&t.body&&e.body!=t.body){this.setBodyColumnIndices()}}handlePaginationUpdate(e){let t=e.target;this.numRecordsToDisplay=t.recordsDisplayed;if(this.paginateSelf){this.firstRecordIndexToDisplay=t.startIndex}else{this.tablePaginate.emit({currentPage:e.detail.currentPage,recordsDisplayed:e.detail.recordsDisplayed})}}handleReadyToVerify(e){let t=e.target;let i=parseInt(t.getAttribute("data-column"));switch(t.nodeName.toLowerCase()){case"yeti-date-picker":let t=e.target;this.handleDateFilterChange(t,i);return;case"yeti-multiselect":let s=e.target;if(e.type=="readyToVerifySlow"){this.handleMultiselectFilterChange(s,i)}return}}handleMenuButtonChange(e){let t=e.target;let i=e.detail.newValue;let s=t.getAttribute("data-row-index");this.rowActionClick.emit({rowIndex:s,actionLabel:i})}handleCellRadioChange(e){let t=this.contents.body.rows;let i=t[e.rowIndex];t.forEach((e=>e.isSelected=false));i.isSelected=true;this.iLoveJSX=!this.iLoveJSX;this.cellRadioChange.emit({row:i,cell:e})}setFiltersActiveFlag(){if(!this.tableHasFilters){this.filtersAreActive=false}else{for(let e=0;e<this.contents.head.rows[0].cells.length;e++){if(this.contents.head.rows[0].cells[e].filtering&&this.contents.head.rows[0].cells[e].filtering.value!=""&&this.contents.head.rows[0].cells[e].filtering.value!=undefined){this.filtersAreActive=true;return}}this.filtersAreActive=false}}markRowsWithChangedRowActions(e){if(!this.contents.body||!this.contents.body.rows||!this.contents.body.rows.length){return}this.contents.body.rows.forEach(((t,i)=>{t.cells.forEach(((s,a)=>{if(s.rowActions&&s.rowActions.length&&s.rowActions.length>0){if(e.body&&e.body.rows&&e.body.rows[i]&&e.body.rows[i].cells[a]&&!l.isEqual(s.rowActions,e.body.rows[i].cells[a].rowActions)){t.rowActionsJustChanged=true}}}))}))}isValidTableData(e){if(l.isValidJSON(e)){e=JSON.stringify(e);e=JSON.parse(e);return true}else{console.error("Error in yeti-table; supplied data was not valid JSON.")}return true}setHeadingColumnIndices(){if(!this.contents.head||!this.contents.head.rows||!(this.contents.head.rows.length>0)){return}this.contents.head.rows.forEach(((e,t)=>{e.rowIndex=t;e.cells.forEach(((e,t)=>{e.columnIndex=t}))}))}setBodyColumnIndices(){this.contents.body.rows.forEach(((e,t)=>{e.rowIndex=t;e.cells.forEach(((e,i)=>{e.columnIndex=i;e.rowIndex=t}))}))}setSortableOnCellsOtherThanTheOneWithThisIndex(e){let t=this.contents.head.rows[0].cells;for(let i=0,s=t[0];i<t.length;i++,s=t[i]){if(s.sortDirection){s.sortDirection=s.columnIndex==e?s.sortDirection:"unsorted"}}}setDefaultFilterValues(){if(!this.contents.head||!this.contents.head.rows||!(this.contents.head.rows.length>0)){return}this.contents.head.rows.forEach((e=>{e.cells.forEach((e=>{if(e.filtering){e.filtering.value=""}}))}));this.filtersAreActive=false}handleSort(e,t){e.preventDefault();if(!this.sortSelf){this.tableSort.emit({columnIndex:t.columnIndex,sortDirection:t.sortDirection=="ascending"?"descending":"ascending"});return}this.sortContentsPerHeaderCell(t);t.sortDirection=t.sortDirection=="ascending"?"descending":"ascending";this.iLoveJSX=!this.iLoveJSX}sortContentsPerHeaderCell(e){this.contents.body.rows.sort(((t,i)=>{let s=t.cells[e.columnIndex].value;let a=i.cells[e.columnIndex].value;let r=l.getStringifiedType(s);let n=l.getStringifiedType(a);let h=e.sortDirection=="ascending"?-1:1;if(r!=n){if(h>0){switch(r){case"number":return-1;case"string":return-1;default:return 1}}else{switch(r){case"date":return-1;case"string":return-1;default:return 1}}}switch(r){case"number":{return(l.castToNumber(s)-l.castToNumber(a))*h}case"string":{if(s==a){return 0}else{return s.toLowerCase()<a.toLowerCase()?-1*h:1*h}}case"date":{let e=new Date(s);let t=new Date(a);if(e==t){return 0}else{return e<t?-1*h:1*h}}}}));this.setSortableOnCellsOtherThanTheOneWithThisIndex(e.columnIndex)}handleTextFilterChange(e,t,i){if(e.key!="Enter"){e.preventDefault();e.stopImmediatePropagation();return false}this.handleTextFilterSearch(t,i)}handleTextFilterSearch(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value})}else{this.contents.head.rows[0].cells[t].filtering.value=e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleTextFilterButtonClick(e,t,i){e.preventDefault();this.handleTextFilterSearch(t,i)}handleTextFilterClear(e,t){e.value="";this.handleTextFilterSearch(e,t)}handleSelectFilterChange(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value})}else{this.contents.head.rows[0].cells[t].filtering.value=e.selectedIndex==0?"":e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleDateFilterChange(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value})}else{this.contents.head.rows[0].cells[t].filtering.value=e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleMultiselectFilterChange(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value})}else{this.contents.head.rows[0].cells[t].filtering.value=e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleClearAllFilters(){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:-1,value:"clear"})}else{this.iLoveJSX=!this.iLoveJSX}this.setDefaultFilterValues()}doesRowPassFiltering(e){if(!this.filterSelf){return true}for(let t=0;t<e.cells.length;t++){if(!this.doesCellPassFiltering(e.cells[t])){console.error(`row ${e.rowIndex} failed filtering because of cell ${e.cells[t].value}`);return false}}return true}doesCellPassFiltering(e){if(e.value=="undefined"){e.value=""}if(!this.contents.head||!this.contents.head.rows||!(this.contents.head.rows.length>0)){return true}let t=this.contents.head.rows[0].cells[e.columnIndex];if(t&&t.filtering&&t.filtering.isFilterable&&t.filtering.value){let i=t.filtering.value;switch(t.filtering.type){case"text":{if(e.value.indexOf(i)>=0){return true}else{return false}}case"select":{if(e.value.indexOf(i)>=0||i==""){return true}else{return false}}case"date":{if(i==""){return true}else if(new Date(i).getTime()==new Date(e.value).getTime()){return true}else{return false}}case"multiselect":{if(i==""){return true}else{let t=i.split(",");return t.includes(e.value)}}default:console.error("Error in table data: unexpected filtering type supplied.");return false}}else{return true}}getNumberOfRecords(){return this.contents.body&&this.contents.body.rows&&this.contents.body.rows.length?this.contents.body.rows.length:-1}renderCell(e){if(!e.id||e.id==""){e.id=l.generateUniqueId()}if(e.filtering&&e.filtering.isClearCell){this.tableHasFilters=true;return this.renderFilterClearCell(e)}if(e.rowActions){return this.renderRowActionsCell(e)}if(e.isRadio){return this.renderRadioCell(e)}if(e.isHeading){return this.renderTableHeading(e)}else{let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";if(e.template){return i("td",{class:"yeti-table-cell"+t,id:e.id,key:e.id,innerHTML:e.template})}return i("td",{class:"yeti-table-cell"+t,id:e.id,key:e.id},e.value)}}renderRowActionsCell(e){let t=e.cssClass&&e.cssClass!=""?"yeti-table-cell yeti-table-control yeti-table-cell-row_actions"+e.cssClass:"yeti-table-cell yeti-table-control yeti-table-cell-row_actions";let s=document.querySelector(`#${e.id} yeti-menu-button`);let a;let r;let n;if(s&&s.getAttribute("id")){a=s.getAttribute("id")}else{a=e.id&&e.id!==""?`${e.id}_menuButton`:l.generateUniqueId()}if(s&&s.getAttribute("data-times-updated")){n=parseInt(s.getAttribute("data-times-updated"))}else{n=0}if(this.contents.body.rows[e.rowIndex].rowActionsJustChanged){++n;a=e.id&&e.id!==""?`${e.id}_menuButton_mk${n}`:l.generateUniqueId();this.contents.body.rows[e.rowIndex].rowActionsJustChanged=false}if(e.rowActions.length<=0){return i("td",{class:t,id:e.id,key:e.id})}else{let s=[];for(let t=0;t<e.rowActions.length;t++){let l;let r=`${a}_opt${t}`;if(e.rowActions[t].href){l=i("yeti-menu-button-option",{href:e.rowActions[t].href,id:r,key:r},e.rowActions[t].label)}else{l=i("yeti-menu-button-option",{id:r,key:r},e.rowActions[t].label)}s.push(l)}r=i("yeti-menu-button",{"menu-alignment":"right","data-row-index":e.rowIndex,"data-times-updated":`${n}`,id:a,key:a,tooltipText:"Row actions"},s);return i("td",{class:t,id:e.id,key:e.id},r)}}renderRadioCell(e){let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";let s=`${this.tableId}_radios`;let l=`${s}_${e.rowIndex}`;let a=this.contents.body.rows[e.rowIndex];let r=a.isSelected?true:false;let n=i("input",Object.assign({type:"radio",class:"yeti-radio",name:s,value:l,id:l,onChange:()=>{this.handleCellRadioChange(e)}},r?{checked:true}:{}));return i("td",{class:`yeti-table-cell yeti-table-control ${t}`,id:e.id,key:e.id},n)}renderFilterClearCell(e){let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";let s=i("yeti-tooltip",{text:"Clear filters"},i("button",{class:"yeti-table-filter-clear-button",onClick:e=>{this.handleClearAllFilters();e.preventDefault()},"aria-label":"Clear all filters"},i("span",{class:"material-icons","aria-hidden":"true"},"cancel")));return i("td",{class:`yeti-table-heading yeti-table-cell-clear ${t}`,id:e.id,key:e.id},this.filtersAreActive?s:"")}renderTableHeading(e){let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";if(!e.isHeading){console.error("Error rendering table cell: expected th, got td.");return}else{let s;if(!e.id||e.id==""){s=l.generateUniqueId()}else{s=`${e.id}_heading`}if(e.sortDirection){let l;let a="";let r;let n;e.sortDirection=e.sortDirection.toLowerCase();switch(e.sortDirection){case"ascending":r="Sorted ascending";n="expand_less";break;case"descending":r="Sorted descending";n="expand_more";break;default:r="Sortable";n="unfold_more"}if(e.filtering&&e.filtering.isFilterable){a=i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(e,s))}l=i("th",{class:`yeti-table-heading ${t}`,scope:e.scope&&e.scope=="row"?"row":"col"},i("div",{class:"yeti-table-heading-compound"},i("button",{class:"yeti-table-heading-button",onClick:t=>{this.handleSort(t,e)}},i("div",{class:"yeti-table-heading-button-label",id:s},e.value),i("span",{class:"yeti-table-heading-button-icon"},i("span",{class:"yeti-a11y-hidden"},r),i("span",{class:"material-icons","aria-hidden":"true",title:r},n))),a?a:""));return l}else if(e.filtering&&e.filtering.isFilterable){return i("th",{class:"yeti-table-heading"+t,scope:e.scope&&e.scope=="row"?"row":"col"},i("div",{class:"yeti-table-heading-compound"},i("div",{class:"yeti-table-heading-compound-actual",id:s},e.value),i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(e,s))))}else{return i("th",{class:"yeti-table-heading"+t,scope:e.scope&&e.scope=="row"?"row":"col"},e.value)}}}renderTableHeadingFilter(e,t){let s=`${e.id}_filter`;switch(e.filtering.type){case"text":let l=`yeti-table-filter-text-${e.columnIndex}`;return i("div",{class:"yeti-table-heading-filter-input-wrapper"},i("yeti-input",{type:"search",value:e.filtering.value,inputClass:"yeti-table-heading-filter-input",onKeyUp:t=>{let i=t.target;this.handleTextFilterChange(t,i,e.columnIndex)},onSearchFieldClear:()=>this.handleTextFilterClear(this.el.querySelector(`#${l}`),e.columnIndex),inputId:l,labeledBy:t}),i("button",{class:"yeti-table-heading-filter-input-button",onClick:t=>{t.preventDefault();this.handleTextFilterButtonClick(t,this.el.querySelector(`#${l}`),e.columnIndex)}},i("span",{class:"material-icons","aria-hidden":"true"},"search")));case"select":let a=[];if(e.filtering.options&&e.filtering.options.length>0){for(let t=0;t<e.filtering.options.length;t++){let l=t==0&&e.filtering.value==""?true:false;let r=`${s}_option${t}`;l=e.filtering.options[t]==e.filtering.value?true:false;a.push(i("option",{selected:l,id:r,key:r},e.filtering.options[t]))}}else{console.error("Error in table select filter: no options supplied.");return false}return i("select",{class:"yeti-select yeti-table-heading-filter-input",onChange:t=>{this.handleSelectFilterChange(t.target,e.columnIndex)},"aria-labelledby":t},i("option",{value:"",id:`${s}_defaultOption`,key:`${s}_defaultOption`},"- Any -"),a);case"date":return i("yeti-date-picker",{"data-column":e.columnIndex,"labelled-by":t,value:e.filtering.value,id:s,key:s});case"multiselect":let r=[];if(e.filtering.options&&e.filtering.options.length>0){for(let t=0;t<e.filtering.options.length;t++){let l=`${s}_option${t}`;let a=e.filtering.options[t];let n=e.filtering.value&&e.filtering.value.includes(a)?true:false;let h={id:l,key:l};if(n){h["selected"]=true}r.push(i("yeti-multiselect-option",Object.assign({},h),a))}}else{console.error("Error in table multiselect filter: no options supplied.");return false}return i("yeti-multiselect",{placeholder:"- Any -","data-column":e.columnIndex,"labelled-by":t,id:s,key:s,value:e.filtering.value},r);default:console.error("Error rendering table filter: unexpected filtering type requested:",e.filtering.type);return""}}renderRow(e){let t=[];e.cells.forEach((e=>{t.push(this.renderCell(e))}));return t}renderHeaderRow(e){if(this.contents.head.rows.length==0||!this.contents.head.rows[0].cells||this.contents.head.rows[0].cells.length==0){return i("th",{class:"yeti-table-heading",scope:"col"},"No data")}else{return this.renderRow(e)}}renderRows(e=0,t=this.contents.body.rows.length){let s=[];let a=[];let r=0;if(this.contents.body.rows.length==0||!this.contents.body.rows[0].cells||this.contents.body.rows[0].cells.length==0){let e=!this.contents.head.rows[0]||!this.contents.head.rows[0].cells?1:this.contents.head.rows[0].cells.length;return i("tr",{class:"yeti-table-body-row"},i("td",{class:"yeti-table-cell",colSpan:e},this.placeholderText))}for(let n=0;n<this.contents.body.rows.length;n++){const h=this.contents.body.rows[n];let o="yeti-table-body-row";o+=h.isSelected?" yeti-table-body-row__selected":"";if(this.doesRowPassFiltering(h)){a.push(h);if(n>=e&&r<t&&a.length>=e){if(!h.id||h.id==""){h.id=l.generateUniqueId()}++r;s.push(i("tr",{class:o,id:h.id,key:h.id},this.renderRow(h)))}}}this.rowsThatPassFiltering=a.length;if(s.length>0){return s}return i("tr",{class:"yeti-table-body-row"},i("td",{class:"yeti-table-cell",colSpan:this.contents.head.rows[0].cells.length},this.noMatchesText))}componentWillLoad(){let e=this.el.getAttribute("id");let t=this.el.querySelector("yeti-table-pagination");let i;let s=this.contents.head.rows[0].cells;if(t){let e=t.querySelector("yeti-table-pagination-option");let i=e?parseInt(e.textContent):10;if(e){i=e.hasAttribute("all")?this.getNumberOfRecords():i}this.numRecordsToDisplay=!isNaN(i)?i:10}else{this.numRecordsToDisplay=this.getNumberOfRecords()}if(!e||e==""){e=l.generateUniqueId();this.el.setAttribute("id",e)}this.setHeadingColumnIndices();this.setBodyColumnIndices();this.watchContentsHandler(this.contents,this.contents);this.paginationComponent=this.el.querySelector("yeti-table-pagination");if(t){i=t.getAttribute("id");i=i&&i!==""?i:`${e}_pagination`;t.setAttribute("id",i)}for(let e=0;e<s.length;e++){let t=s[e];if(t.sortDirection&&(t.sortDirection=="ascending"||t.sortDirection=="descending")){this.sortContentsPerHeaderCell(t);break}}}componentWillRender(){let e=this.el.querySelector("yeti-table-pagination");if(!this.paginateSelf){let e=this.paginationComponent.recordsDisplayed;this.numRecordsToDisplay=e}if(!e){this.numRecordsToDisplay=this.contents.body.rows.length}}render(){let e="yeti-table";if(this.tableClass!=""){e+=" "+this.tableClass}return i("table",{class:e},this.contents.head?i("thead",{class:"yeti-table-head"},i("tr",{class:"yeti-table-head-row"},this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0&&this.contents.head.rows[0].cells&&this.contents.head.rows[0].cells.length>0?this.contents.head.rows.map((e=>this.renderRow(e))):i("th",{class:"yeti-table-heading",scope:"col"},"No data"))):"",i("tbody",{class:"yeti-table-body"},this.renderRows(this.firstRecordIndexToDisplay,this.numRecordsToDisplay)))}componentDidRender(){let e=this.el.querySelector("yeti-table-pagination");if(e!=null){e.records=this.paginateSelf?this.rowsThatPassFiltering:this.records}this.setFiltersActiveFlag()}get el(){return s(this)}static get watchers(){return{contents:["watchContentsHandler"]}}};export{a as yeti_table};
//# sourceMappingURL=p-c905b34c.entry.js.map