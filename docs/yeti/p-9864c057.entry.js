import{r as t,c as e,h as i,g as s}from"./p-e8f90371.js";import{u as a}from"./p-943baa85.js";const l=class{constructor(i){t(this,i);this.paginationUpdated=e(this,"paginationUpdated",7);this.cssClass="";this.htmlId=a.generateUniqueId();this.records=0;this.showOptions=true;this.recordAliasSingular="item";this.recordAliasPlural="items";this.startIndex=0;this.recordsDisplayed=0;this.itemsPerPageOptions=[10,25,50,100,"All"];this.selectedItemsPerPageOptionIndex=0;this.selectedPage=1;this.pages=1}watchRecordsHandler(){this.updatePages();this.updateIndices()}watchRecordsDisplayed(){this.paginationUpdated.emit({currentPage:this.selectedPage-1,recordsDisplayed:this.recordsDisplayed})}parseOptionElements(t){let e=[];for(let i=0;i<t.length;i++){let s=t.item(i);if(s.tagName.toLowerCase()=="yeti-table-pagination-option"){if(s.attributes&&s.attributes["selected"]){console.log(`Option ${i} was pre-selected:`,s)}if(s.attributes&&s.attributes["all"]){e.push("All")}else{let t=parseInt(s.innerHTML);if(!Number.isNaN(t)){e.push(t)}else{console.warn(`Ignoring <yeti-table-pagination-option> with invalid value "${s.innerHTML}". Numbers only please.`)}}}}if(e.length>0){this.itemsPerPageOptions=e}for(let e=t.length-1;e>=0;--e){t.item(e).remove()}}getItemsPerPageOption(){return this.itemsPerPageOptions[this.selectedItemsPerPageOptionIndex]}updateIndices(){let t=this.getItemsPerPageOption();if(t=="All"||t>this.records){this.startIndex=0}else{this.startIndex=(this.selectedPage-1)*t}if(t=="All"||t>this.records){this.recordsDisplayed=this.records}else{this.recordsDisplayed=Math.min(this.records-this.startIndex,t)}}updatePages(){let t=this.getItemsPerPageOption();t=t=="All"?1:Math.ceil(this.records/t);this.pages=t}handleItemsPerPageChange(t){let e=t.target;this.selectedItemsPerPageOptionIndex=e.selectedIndex;this.selectedPage=1;this.updatePages();this.updateIndices();t.preventDefault();this.paginationUpdated.emit({currentPage:this.selectedPage-1,recordsDisplayed:this.recordsDisplayed})}handlePageSelectChange(t){let e=t.target;this.selectedPage=parseInt(e.value);this.updateIndices();t.preventDefault();this.paginationUpdated.emit({currentPage:this.selectedPage-1,recordsDisplayed:this.recordsDisplayed})}handlePreviousPageButtonClick(t){this.selectedPage=Math.max(1,this.selectedPage-1);this.updateIndices();t.preventDefault();this.paginationUpdated.emit({currentPage:this.selectedPage-1,recordsDisplayed:this.recordsDisplayed})}handleNextPageButtonClick(t){this.selectedPage=Math.min(this.pages,this.selectedPage+1);this.updateIndices();t.preventDefault();this.paginationUpdated.emit({currentPage:this.selectedPage-1,recordsDisplayed:this.recordsDisplayed})}componentWillLoad(){let t=this.el.children;if(t.length>0){this.parseOptionElements(t)}}render(){let t="yeti-table-pagination";if(this.cssClass!=""){t+=" "+this.cssClass}return i("nav",{key:"07ceb118c58af030a1814e92d188ee54ce48c972",class:t,"aria-label":"Table Pagination"},i("div",{key:"930b23ccb26e734b228ee4235f528ecf9ad0c717",class:"yeti-table-pagination-items_per_page"},this.showOptions?[i("label",{htmlFor:"demo-items_per_page",class:"yeti-table-pagination-items_per_page-label"},this.recordAliasPlural," per page:"),i("select",{id:"demo-items_per_page",class:"yeti-select yeti-table-pagination-items_per_page-select",onChange:t=>{this.handleItemsPerPageChange(t)}},this.itemsPerPageOptions.map((t=>i("option",{value:t,class:"yeti-table-pagination-items_per_page-select-option"},t))))]:"",i("span",{key:"e2adb4af217dde3b18f45eda837a05fe450e1090",class:"yeti-table-pagination-items_per_page-count"},this.getItemsPerPageOption()=="All"||this.records==0?"":this.startIndex+1+" to "+(this.startIndex+this.recordsDisplayed)+" of ",this.records," ",this.records==1?this.recordAliasSingular:this.recordAliasPlural)),this.records>0?i("div",{class:"yeti-table-pagination-pages"},i("label",{htmlFor:"demo-pages",class:"yeti-a11y-hidden"},"Page number, of ",this.pages," page",this.pages==1?"":"s"),i("select",{id:"demo-pages",class:"yeti-select yeti-table-pagination-pages-select",onChange:t=>{this.handlePageSelectChange(t)}},(()=>{let t=[];for(let e=1;e<=this.pages;e++){t.push(i("option",Object.assign({value:e,class:"yeti-table-pagination-pages-select-page"},e==this.selectedPage&&{selected:true}),e))}return t})()),i("span",{class:"yeti-table-pagination-pages-of_pages","aria-hidden":"true"},"of ",this.pages," page",this.pages==1?"":"s"),i("ul",{class:"yeti-table-pagination-pages-buttons"},i("li",{class:"yeti-table-pagination-pages-buttons-action"},i("button",Object.assign({class:"yeti-table-pagination-pages-buttons-button",onClick:t=>{this.handlePreviousPageButtonClick(t)}},this.selectedPage==1&&{disabled:true}),i("span",{class:"material-icons","aria-hidden":"true"},"arrow_left"),i("span",{class:"yeti-a11y-hidden"},"Previous page"))),i("li",{class:"yeti-table-pagination-pages-buttons-action"},i("button",Object.assign({class:"yeti-table-pagination-pages-buttons-button",onClick:t=>{this.handleNextPageButtonClick(t)}},this.selectedPage==this.pages&&{disabled:true}),i("span",{class:"material-icons","aria-hidden":"true"},"arrow_right"),i("span",{class:"yeti-a11y-hidden"},"Next page"))))):"")}componentDidRender(){}get el(){return s(this)}static get watchers(){return{records:["watchRecordsHandler"],recordsDisplayed:["watchRecordsDisplayed"]}}};export{l as yeti_table_pagination};
//# sourceMappingURL=p-9864c057.entry.js.map