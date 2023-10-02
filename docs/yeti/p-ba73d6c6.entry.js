import{r as e,c as t,h as i,g as l}from"./p-1e2113d3.js";const s=class{constructor(i){e(this,i);this.fileExplorerChange=t(this,"fileExplorerChange",7);this.wrapperCSS="";this.showFiles=true;this.model=undefined;this.terminus=undefined;this.iLoveJSX=false}handleItemClick(e,t=0,i=0){let l=e.currentTarget.getAttribute("data-path");let s=l.substring(0,l.lastIndexOf("/"));let r=this.getFolderFromPath(s);this.setNewSelectedTerminus(l);this.updatePath(l);r.isSelected=true;r.selectedIndex=i;this.fileExplorerChange.emit({path:l,depth:t,index:i});this.iLoveJSX=!this.iLoveJSX}updatePath(e){let t=e.slice(1).split("/");let i=this.model.root;for(let e=0;e<t.length;e++){let l=i.content.map((e=>e.name));i.isSelected=true;i.selectedIndex=l.indexOf(t[e]);i=i.content[l.indexOf(t[e])]}}setNewSelectedTerminus(e){let t;t=this.getFolderFromPath(e);this.clearTerminusPath();this.model.root.isSelected=true;t.isSelected=true;t.isTerminus=true;this.terminus=t}clearTerminusPath(){if(!this.terminus){return}else{let e=this.terminus.path.slice(1).split("/");let t=this.model.root;for(let i=0;i<e.length;i++){let l=t.content.map((e=>e.name));t=t.content[l.indexOf(e[i])];t.isSelected=false;t.isTerminus=false}this.terminus=null}}getFolderFromPath(e){let t;let i=this.model.root;if(e==""){return this.model.root}e=e.slice(1);t=e.split("/");for(let e=0;e<t.length;e++){let l=t[e];let s=i.content.map((e=>e.name));i=i.content[s.indexOf(l)]}return i}renderFolders(){let e=[];let t={name:"",path:"/",content:[],selectedIndex:-1,isRoot:false,isSelected:false,isTerminus:false};if(this.model.root.content.length==0){for(let i=0;i<this.model.minDisplayDepth;i++){e.push(this.renderFolder(i==0?this.model.root:t))}}else{let t=this.model.root;do{e.push(this.renderFolder(t));t=t.content[t.selectedIndex]}while(t&&t.isSelected)}return e}renderFolder(e){let t=e.path.split("/").length-1;let l=i("div",{class:"yeti-file_explorer-folder"},i("ul",{class:"yeti-file_explorer-folder-items"},this.renderFolderContents(e,t)));return l}renderFolderContents(e,t=-1){return e.content.map(((e,i)=>this.renderItem(e,t,i)))}renderItem(e,t=-1,l=-1){let s="yeti-file_explorer-folder-item-wrapper"+(e.isSelected?" yeti-file_explorer-folder-item-wrapper__selected":"");let r=i("li",{class:"yeti-file_explorer-folder-item"},i("button",{class:s,onClick:e=>{this.handleItemClick(e,t,l)},"data-path":e.path},i("yeti-icon",{iconCode:"folder",alt:"subfolder","icon-style":"outlined",class:"yeti-file_explorer-folder-item-icon"}),i("span",{class:"yeti-file_explorer-folder-item-name"},e.name),e.content.length>0?i("yeti-icon",{iconCode:"chevron_right",alt:"open subfolder",class:"yeti-file_explorer-folder-more"}):""));return r}componentWillLoad(){let e;if(!this.model){let e={root:{name:"",path:"/",content:[],selectedIndex:-1,offset:0,pageSize:0,totalElements:0,isRoot:true,isSelected:false,isTerminus:false},minDisplayDepth:3};this.model=e}e=this.model.root.content;e.forEach(((e,t)=>{if(e.isSelected){e.selectedIndex=t}}))}render(){let e="yeti-file_explorer-wrapper";e+=this.wrapperCSS!=""?` ${this.wrapperCSS}`:"";return i("div",{class:e},i("div",{class:"yeti-file_explorer"},i("div",{class:"yeti-file_explorer-folders"},this.renderFolders())),i("div",{class:"yeti-file_explorer-path"},this.terminus?this.terminus.path:""))}componentDidRender(){let e=this.el.querySelectorAll(".yeti-file_explorer-folder");if(e&&e.length){e[e.length-1].scrollIntoView({behavior:"smooth",block:"nearest"})}}get el(){return l(this)}};export{s as yeti_file_explorer};
//# sourceMappingURL=p-ba73d6c6.entry.js.map