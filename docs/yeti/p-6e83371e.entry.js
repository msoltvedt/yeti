import{r as e,c as t,h as i,g as s}from"./p-0d1be970.js";import{u as l}from"./p-943baa85.js";const a=class{constructor(i){e(this,i);this.rowActionClick=t(this,"rowActionClick",7);this.cellRadioChange=t(this,"cellRadioChange",7);this.tableSort=t(this,"tableSort",7);this.tableFilter=t(this,"tableFilter",7);this.tablePaginate=t(this,"tablePaginate",7);this.tableHasFilters=false;this.hasExpandableRows=false;this.rowsThatPassFiltering=0;this.tableClass="";this.tableId=l.generateUniqueId();this.noRecordsText="No records";this.noMatchesText="No records found matching your filter criteria";this.records=0;this.contents={head:{rows:[]},body:{rows:[]}};this.sortSelf=true;this.filterSelf=true;this.paginateSelf=true;this.placeholderText="";this.iLoveJSX=true;this.firstRecordIndexToDisplay=0;this.numRecordsToDisplay=0;this.paginationComponent=null;this.filtersAreActive=false}watchContentsHandler(e,t){var i;if(!e.body){console.error("Supplied data has no table body.");return false}else if(!e.body.rows){console.error("Supplied data must have rows in table body.");return false}this.hasExpandableRows=false;for(let t=0;t<((i=e.body.rows)===null||i===void 0?void 0:i.length);t++){if(e.body.rows[t].isExpandable){this.hasExpandableRows=true;break}}this.markRowsWithChangedRowActions(t);if(e.head&&t.head&&e.head!=t.head){this.setHeadingColumnIndices()}if(e.body&&t.body&&e.body!=t.body){this.setBodyColumnIndices()}}handlePaginationUpdate(e){let t=e.target;this.numRecordsToDisplay=t.recordsDisplayed;if(this.paginateSelf){this.firstRecordIndexToDisplay=t.startIndex}else{this.tablePaginate.emit({currentPage:e.detail.currentPage,recordsDisplayed:e.detail.recordsDisplayed,recordsPerPage:e.detail.recordsPerPage})}}handleReadyToVerify(e){let t=e.target;let i=parseInt(t.getAttribute("data-column"));switch(t.nodeName.toLowerCase()){case"yeti-date-picker":let t=e.target;this.handleDateFilterChange(t,i);return;case"yeti-dropdown":let s=e.target;if(e.type=="readyToVerifyFast"){this.handleMultiselectFilterChange(s,i)}return}}handleMenuButtonSelectionMade(e){let t=e.target;let i=e.detail.value;let s=t.getAttribute("data-row-index");let l=t.getAttribute("data-parent-row-index");this.rowActionClick.emit({rowIndex:s,parentRowIndex:l,actionLabel:i})}handleCellRadioChange(e){let t=this.contents.body.rows;let i=t[e.rowIndex];t.forEach((e=>e.isSelected=false));i.isSelected=true;this.iLoveJSX=!this.iLoveJSX;this.cellRadioChange.emit({row:i,cell:e})}setFiltersActiveFlag(){if(!this.tableHasFilters){this.filtersAreActive=false}else{for(let e=0;e<this.contents.head.rows[0].cells.length;e++){if(this.contents.head.rows[0].cells[e].filtering&&this.contents.head.rows[0].cells[e].filtering.value!=""&&this.contents.head.rows[0].cells[e].filtering.value!=undefined){this.filtersAreActive=true;return}}this.filtersAreActive=false}}markRowsWithChangedRowActions(e){if(!this.rowExistsAtIndex(0)){return}this.contents.body.rows.forEach(((t,i)=>{t.cells.forEach(((s,a)=>{try{let r=e.body.rows[i].cells[a];if(this.hasRowActions(s)&&!l.isEqual(s.rowActions,r.rowActions)){t.rowActionsJustChanged=true}}catch(e){t.rowActionsJustChanged=true}}));if(t.childRows){t.childRows.forEach(((t,s)=>{t.cells.forEach(((a,r)=>{try{let n=e.body.rows[i].childRows[s].cells[r];if(this.hasRowActions(a)&&!l.isEqual(a.rowActions,n.rowActions)){t.rowActionsJustChanged=true}}catch(e){t.rowActionsJustChanged=true}}))}))}}))}hasRowActions(e){if(e.rowActions&&e.rowActions.length&&e.rowActions.length>0){return true}else{return false}}rowExistsAtIndex(e,t=-1,i=this.contents){try{let s;if(t>=0){s=i.body.rows[e].childRows[t]}else{s=i.body.rows[e]}if(s!=undefined){return true}else{return false}}catch(e){return false}}isValidTableData(e){if(l.isValidJSON(e)){e=JSON.stringify(e);e=JSON.parse(e);return true}else{console.error("Error in yeti-table; supplied data was not valid JSON.")}return true}setHeadingColumnIndices(){if(!this.contents.head||!this.contents.head.rows||!(this.contents.head.rows.length>0)){return}this.contents.head.rows.forEach(((e,t)=>{e.rowIndex=t;e.cells.forEach(((e,t)=>{e.columnIndex=t}))}))}setBodyColumnIndices(){this.contents.body.rows.forEach(((e,t)=>{e.rowIndex=t;this.setColumnIndicesForRow(e);if(e.childRows&&e.childRows.length&&e.childRows.length>0){e.childRows.forEach(((i,s)=>{i.rowIndex=s;i.parentRow=e;this.setColumnIndicesForRow(i,t)}))}}))}setColumnIndicesForRow(e,t=-1){let i=e.rowIndex;e.cells.forEach(((e,s)=>{e.columnIndex=s;e.rowIndex=i;e.parentRowIndex=t}))}setSortableOnCellsOtherThanTheOneWithThisIndex(e){let t=this.contents.head.rows[0].cells;for(let i=0,s=t[0];i<t.length;i++,s=t[i]){if(s.sortDirection){s.sortDirection=s.columnIndex==e?s.sortDirection:"unsorted"}}}setDefaultFilterValues(){if(!this.contents.head||!this.contents.head.rows||!(this.contents.head.rows.length>0)){return}this.contents.head.rows.forEach((e=>{e.cells.forEach((e=>{if(e.filtering){e.filtering.value=""}}))}));this.filtersAreActive=false}handleSort(e,t){e.preventDefault();if(!this.sortSelf){this.tableSort.emit({columnIndex:t.columnIndex,sortDirection:t.sortDirection=="ascending"?"descending":"ascending"});return}t.sortDirection=t.sortDirection=="ascending"?"descending":"ascending";this.sortContentsPerHeaderCell(t);this.iLoveJSX=!this.iLoveJSX}sortContentsPerHeaderCell(e){this.contents.body.rows.sort(((t,i)=>{let s=t.cells[e.columnIndex].value;let a=i.cells[e.columnIndex].value;let r=l.getStringifiedType(s);let n=l.getStringifiedType(a);let h=e.sortDirection=="ascending"?1:-1;if(r!=n){if(h>0){switch(r){case"number":return-1;case"string":return-1;default:return 1}}else{switch(r){case"date":return-1;case"string":return-1;default:return 1}}}switch(r){case"number":{return(l.castToNumber(s)-l.castToNumber(a))*h}case"string":{if(s==a){return 0}else{return s.toLowerCase()<a.toLowerCase()?-1*h:1*h}}case"date":{let e=new Date(s);let t=new Date(a);if(e==t){return 0}else{return e<t?-1*h:1*h}}}}));this.setSortableOnCellsOtherThanTheOneWithThisIndex(e.columnIndex)}handleTextFilterChange(e,t,i){if(e.key!="Enter"){e.preventDefault();e.stopImmediatePropagation();return false}this.handleTextFilterSearch(t,i)}handleTextFilterSearch(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value})}else{this.contents.head.rows[0].cells[t].filtering.value=e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleTextFilterButtonClick(e,t,i){e.preventDefault();this.handleTextFilterSearch(t,i)}handleTextFilterClear(e,t){e.value="";this.handleTextFilterSearch(e,t)}handleSelectFilterChange(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value})}else{this.contents.head.rows[0].cells[t].filtering.value=e.selectedIndex==0?"":e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleDateFilterChange(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value,isValid:e.isValid,control:e})}else{this.contents.head.rows[0].cells[t].filtering.value=e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleMultiselectFilterChange(e,t){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:t,value:e.value})}else{this.contents.head.rows[0].cells[t].filtering.value=e.value;this.iLoveJSX=!this.iLoveJSX}this.setFiltersActiveFlag()}handleClearAllFilters(){if(!this.filterSelf){this.paginationComponent.selectedPage=1;this.tableFilter.emit({columnIndex:-1,value:"clear"})}else{this.iLoveJSX=!this.iLoveJSX}this.setDefaultFilterValues()}doesRowPassFiltering(e){if(!this.filterSelf){return true}for(let t=0;t<e.cells.length;t++){if(!this.doesCellPassFiltering(e.cells[t])){return false}}return true}doesCellPassFiltering(e){if(e.value=="undefined"){e.value=""}if(!this.contents.head||!this.contents.head.rows||!(this.contents.head.rows.length>0)){return true}let t=this.contents.head.rows[0].cells[e.columnIndex];if(t&&t.filtering&&t.filtering.isFilterable&&t.filtering.value){let i=t.filtering.value;switch(t.filtering.type){case"text":{if(e.value.indexOf(i)>=0){return true}else{return false}}case"select":{if(e.value.indexOf(i)>=0||i==""){return true}else{return false}}case"date":{if(i==""){return true}else if(new Date(i).getTime()==new Date(e.value).getTime()){return true}else{return false}}case"multiselect":{if(i==""){return true}else{let t=i.split(",");return t.includes(e.value)}}default:console.error("Error in table data: unexpected filtering type supplied.");return false}}else{return true}}getNumberOfRecords(){return this.contents.body&&this.contents.body.rows&&this.contents.body.rows.length?this.contents.body.rows.length:-1}renderCell(e){if(!e.id||e.id==""){e.id=l.generateUniqueId()}if(e.filtering&&e.filtering.isClearCell){this.tableHasFilters=true;return this.renderFilterClearCell(e)}if(e.rowActions){return this.renderRowActionsCell(e)}if(e.isRadio){return this.renderRadioCell(e)}if(e.isHeading){return this.renderTableHeading(e)}else{let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";return i("td",Object.assign({class:"yeti-table-cell"+t,id:e.id,key:e.id},e.template?{innerHTML:e.template}:{},e.colspan&&typeof e.colspan=="number"?{colspan:e.colspan}:{},e.rowspan&&typeof e.rowspan=="number"?{rowspan:e.rowspan}:{}),e.template?"":e.value)}}renderExpandoButton(e){let t=[];let s="";e.isExpanded=e.isExpanded==undefined||e.isExpanded==false?false:true;let a=e.isExpanded?"Collapse current row":"Expand current row";let r=e.isExpanded?"expand_less":"expand_more";if(!e.id||e.id==""){e.id=l.generateUniqueId()}e.childRows.forEach(((i,s)=>{i.id=!i.id||i.id==""?`${e.id}_child_${s}`:i.id;t.push(i.id)}));s=t.join(" ");return i("button",{type:"button",class:"yeti-table-expando_button","aria-label":a,"aria-expanded":e.isExpanded,"aria-controls":s,onClick:()=>{e.isExpanded=!e.isExpanded;this.iLoveJSX=!this.iLoveJSX}},i("yeti-icon",{iconCode:r,"aria-hidden":true}))}renderRowActionsCell(e){let t=e.cssClass&&e.cssClass!=""?"yeti-table-cell yeti-table-control yeti-table-cell-row_actions "+e.cssClass:"yeti-table-cell yeti-table-control yeti-table-cell-row_actions";let s=document.querySelector(`#${e.id} yeti-menu-button`);let a;let r;let n;let h=e.parentRowIndex>=0?this.contents.body.rows[e.parentRowIndex].childRows[e.rowIndex]:this.contents.body.rows[e.rowIndex];if(s&&s.getAttribute("id")){a=s.getAttribute("id")}else{a=e.id&&e.id!==""?`${e.id}_menuButton`:l.generateUniqueId()}if(s&&s.getAttribute("data-times-updated")){n=parseInt(s.getAttribute("data-times-updated"))}else{n=0}if(h.rowActionsJustChanged){++n;a=e.id&&e.id!==""?`${e.id}_menuButton_mk${n}`:l.generateUniqueId();h.rowActionsJustChanged=false}if(e.rowActions.length<=0){return i("td",{class:t,id:e.id,key:e.id})}else{let s=[];for(let t=0;t<e.rowActions.length;t++){let l;let r=`${a}_opt${t}`;if(e.rowActions[t].href){l=i("yeti-menu-button-option",Object.assign({href:e.rowActions[t].href},e.rowActions[t].target?{target:e.rowActions[t].target}:{},e.rowActions[t].downloadAs&&e.rowActions[t].downloadAs!=""?{"download-as":e.rowActions[t].downloadAs}:{},{id:r,key:r}),e.rowActions[t].label)}else{l=i("yeti-menu-button-option",{id:r,key:r},e.rowActions[t].label)}s.push(l)}r=i("yeti-menu-button",{"menu-alignment":"right","data-row-index":e.rowIndex,"data-parent-row-index":e.parentRowIndex,"data-times-updated":`${n}`,id:a,key:a,tooltipText:"Row actions"},s);return i("td",{class:t,id:e.id,key:e.id},r)}}renderRadioCell(e){let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";let s=`${this.tableId}_radios`;let l=`${s}_${e.rowIndex}`;let a=this.contents.body.rows[e.rowIndex];let r=a.isSelected?true:false;let n=i("input",Object.assign({type:"radio",class:"yeti-radio",name:s,value:l,id:l,onChange:()=>{this.handleCellRadioChange(e)}},r?{checked:true}:{}));return i("td",{class:`yeti-table-cell yeti-table-control ${t}`,id:e.id,key:e.id},n)}renderFilterClearCell(e){let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";let s=i("yeti-tooltip",{text:"Clear filters"},i("button",{class:"yeti-table-filter-clear-button",onClick:e=>{this.handleClearAllFilters();e.preventDefault()},"aria-label":"Clear all filters"},i("span",{class:"material-icons","aria-hidden":"true"},"cancel")));return i("td",{class:`yeti-table-heading yeti-table-cell-clear ${t}`,id:e.id,key:e.id},this.filtersAreActive?s:"")}renderTableHeading(e){let t=e.cssClass&&e.cssClass!=""?" "+e.cssClass:"";if(!e.isHeading){console.error("Error rendering table cell: expected th, got td.");return}else{let s;if(!e.id||e.id==""){s=l.generateUniqueId()}else{s=`${e.id}_heading`}if(e.sortDirection){let l;let a="";let r;let n;e.sortDirection=e.sortDirection.toLowerCase();switch(e.sortDirection){case"ascending":r="Sorted ascending";n="expand_less";break;case"descending":r="Sorted descending";n="expand_more";break;default:r="Sortable";n="unfold_more"}if(e.filtering&&e.filtering.isFilterable){a=i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(e,s))}l=i("th",{class:`yeti-table-heading ${t}`,scope:e.scope&&e.scope=="row"?"row":"col"},i("div",{class:"yeti-table-heading-compound"},i("button",{class:"yeti-table-heading-button",onClick:t=>{this.handleSort(t,e)}},i("div",{class:"yeti-table-heading-button-label",id:s},e.value),i("span",{class:"yeti-table-heading-button-icon"},i("span",{class:"yeti-a11y-hidden"},r),i("span",{class:"material-icons","aria-hidden":"true",title:r},n))),a?a:""));return l}else if(e.filtering&&e.filtering.isFilterable){return i("th",{class:"yeti-table-heading"+t,scope:e.scope&&e.scope=="row"?"row":"col"},i("div",{class:"yeti-table-heading-compound"},i("div",{class:"yeti-table-heading-compound-actual",id:s},e.value),i("div",{class:"yeti-table-heading-filter"},this.renderTableHeadingFilter(e,s))))}else{return i("th",Object.assign({class:"yeti-table-heading"+t,scope:e.scope&&e.scope=="row"?"row":"col"},e.template?{innerHTML:e.template}:{}),e.template?"":e.value)}}}renderTableHeadingFilter(e,t){var s;let l=`${e.id}_filter`;let a=((s=e.filtering)===null||s===void 0?void 0:s.placeholder)?e.filtering.placeholder:"-Any-";switch(e.filtering.type){case"text":let s=`yeti-table-filter-text-${e.columnIndex}`;return i("div",{class:"yeti-table-heading-filter-input-wrapper"},i("yeti-input",{type:"search",value:e.filtering.value,inputClass:"yeti-table-heading-filter-input",onKeyUp:t=>{let i=t.target;this.handleTextFilterChange(t,i,e.columnIndex)},onSearchFieldClear:()=>this.handleTextFilterClear(this.el.querySelector(`#${s}`),e.columnIndex),inputId:s,labeledBy:t}),i("button",{class:"yeti-table-heading-filter-input-button",onClick:t=>{t.preventDefault();this.handleTextFilterButtonClick(t,this.el.querySelector(`#${s}`),e.columnIndex)}},i("span",{class:"material-icons","aria-hidden":"true"},"search")));case"select":let r=[];if(e.filtering.options&&e.filtering.options.length>0){for(let t=0;t<e.filtering.options.length;t++){let s=t==0&&e.filtering.value==""?true:false;let a=`${l}_option${t}`;s=e.filtering.options[t]==e.filtering.value?true:false;r.push(i("option",{selected:s,id:a,key:a},e.filtering.options[t]))}}else{console.error("Error in table select filter: no options supplied.");return false}return i("select",{class:"yeti-select yeti-table-heading-filter-input",onChange:t=>{this.handleSelectFilterChange(t.target,e.columnIndex)},"aria-labelledby":t},i("option",{value:"",id:`${l}_defaultOption`,key:`${l}_defaultOption`},a),r);case"date":return i("yeti-date-picker",{"data-column":e.columnIndex,"labelled-by":t,value:e.filtering.value,id:l,key:l,showErrorTooltip:true});case"multiselect":let n=[];if(e.filtering.options&&e.filtering.options.length>0){for(let t=0;t<e.filtering.options.length;t++){let i=`${l}_option${t}`;let s=e.filtering.options[t];let a=e.filtering.value&&e.filtering.value.includes(s)?true:false;let r={selected:a,label:s,isVisible:true,value:s,id:i};n.push(r)}}else{console.error("Error in table multiselect filter: no options supplied.");return false}return i("yeti-dropdown",{"is-multiselect":"true",placeholder:a,"data-column":e.columnIndex,"labelled-by":t,id:l,key:l,value:e.filtering.value,options:n});default:console.error("Error rendering table filter: unexpected filtering type requested:",e.filtering.type);return""}}renderRow(e){var t;let s=[];if(this.hasExpandableRows){let l=`${e.id}_expando`;if((t=e.cells[0])===null||t===void 0?void 0:t.isHeading){s.push(i("th",{class:"yeti-table-heading yeti-table-heading-expando",scope:"col",id:l,key:l}))}else{if(e.isExpandable){s.push(i("td",{class:"yeti-table-cell yeti-table-cell-expando",id:l,key:l},this.renderExpandoButton(e)))}else{if(this.hasExpandableRows){s.push(i("td",{class:"yeti-table-cell yeti-table-cell-expando",id:l,key:l}))}}}}e.cells.forEach((e=>{s.push(this.renderCell(e))}));return s}renderRows(e=0,t=this.contents.body.rows.length){let s=[];let a=[];let r=0;if(this.contents.body.rows.length==0||!this.contents.body.rows[0].cells||this.contents.body.rows[0].cells.length==0){let e=!this.contents.head.rows[0]||!this.contents.head.rows[0].cells?1:this.contents.head.rows[0].cells.length;return i("tr",{class:"yeti-table-body-row"},this.hasExpandableRows?i("td",null):"",i("td",{class:"yeti-table-cell",colSpan:e},this.placeholderText))}for(let n=0;n<this.contents.body.rows.length;n++){const h=this.contents.body.rows[n];let o="yeti-table-body-row";let d;o+=h.isSelected?" yeti-table-body-row__selected":"";d=o+" yeti-table-body-row-child_row";o+=h.isSummary?" yeti-table-body-row-summary":"";o+=h.cssClass?` ${h.cssClass}`:"";if(this.doesRowPassFiltering(h)){a.push(h);if(n>=e&&r<t&&a.length>=e){if(!h.id||h.id==""){h.id=l.generateUniqueId()}++r;s.push(i("tr",{class:o,id:h.id,key:h.id},this.renderRow(h)));if(h.childRows&&h.childRows.length&&h.childRows.length>0){if(h.isExpanded==undefined){h.isExpanded=false}if(h.isExpandable&&!h.isExpanded){d+=" yeti-table-body-row-child_row__hidden"}if(h.isSummary){d+=" yeti-table-body-row-child_row-has_summary_parent"}for(let e=0;e<h.childRows.length;e++){let t=h.childRows[e].id=`${h.id}_child_${e}`;s.push(i("tr",{class:d,id:t,key:t},this.renderRow(h.childRows[e])))}}}}}this.rowsThatPassFiltering=a.length;if(s.length>0){return s}return i("tr",{class:"yeti-table-body-row"},i("td",{class:"yeti-table-cell",colSpan:this.contents.head.rows[0].cells.length},this.noMatchesText))}componentWillLoad(){let e=this.el.getAttribute("id");let t=this.el.querySelector("yeti-table-pagination");let i;let s;if(t){let e=t.querySelector("yeti-table-pagination-option");let i=e?parseInt(e.textContent):10;if(e){i=e.hasAttribute("all")?this.getNumberOfRecords():i}this.numRecordsToDisplay=!isNaN(i)?i:10}else{this.numRecordsToDisplay=this.getNumberOfRecords()}if(!e||e==""){e=l.generateUniqueId();this.el.setAttribute("id",e)}this.setHeadingColumnIndices();this.setBodyColumnIndices();this.watchContentsHandler(this.contents,this.contents);this.paginationComponent=this.el.querySelector("yeti-table-pagination");if(t){i=t.getAttribute("id");i=i&&i!==""?i:`${e}_pagination`;t.setAttribute("id",i)}if(this.sortSelf){if(this.contents&&this.contents.head&&this.contents.head.rows&&this.contents.head.rows[0]&&this.contents.head.rows[0].cells){s=this.contents.head.rows[0].cells;for(let e=0;e<s.length;e++){let t=s[e];if(t.sortDirection&&(t.sortDirection=="ascending"||t.sortDirection=="descending")){this.sortContentsPerHeaderCell(t);break}}}}}componentWillRender(){let e=this.el.querySelector("yeti-table-pagination");if(!this.paginateSelf){let e=this.paginationComponent.recordsDisplayed;this.numRecordsToDisplay=e}if(!e){this.numRecordsToDisplay=this.contents.body.rows.length}}render(){var e;let t="yeti-table";let s="yeti-table-head";s+=((e=this.contents.head)===null||e===void 0?void 0:e.cssClass)?` ${this.contents.head.cssClass}`:"";if(this.tableClass!=""){t+=" "+this.tableClass}return i("table",{key:"0727964f7b57edb45bea4045c334c0b9c761f886",class:t},this.contents.head?i("thead",{class:s},i("tr",{class:"yeti-table-head-row"},this.contents.head&&this.contents.head.rows&&this.contents.head.rows.length>0&&this.contents.head.rows[0].cells&&this.contents.head.rows[0].cells.length>0?this.contents.head.rows.map((e=>this.renderRow(e))):i("th",{class:"yeti-table-heading",scope:"col"},"No data"))):"",i("tbody",{key:"f64711f5675c86af464d6c7fcae53c26c2ff871b",class:"yeti-table-body"},this.renderRows(this.firstRecordIndexToDisplay,this.numRecordsToDisplay)))}componentDidRender(){let e=this.el.querySelector("yeti-table-pagination");if(e!=null){e.records=this.paginateSelf?this.rowsThatPassFiltering:this.records}this.setFiltersActiveFlag()}get el(){return s(this)}static get watchers(){return{contents:["watchContentsHandler"]}}};export{a as yeti_table};
//# sourceMappingURL=p-6e83371e.entry.js.map