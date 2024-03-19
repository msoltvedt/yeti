import{r as e,c as t,h as r,g as i}from"./p-e8f90371.js";import{u as l}from"./p-943baa85.js";const s=class{constructor(r){e(this,r);this.fileExplorerChange=t(this,"fileExplorerChange",7);this.wrapperClass="";this.showFiles=true;this.minimumDisplayDepth=3;this.path=[{name:"root",content:[],path:"",isFolder:true,isRoot:true,isSelected:true,selectedIndex:-1,offset:0,pageSize:1e3,totalElements:0,id:l.generateUniqueId(),type:"folder"}];this.iLoveJSX=false}handlePathChange(){}handleItemClick(e=0,t=0){let r="";while(this.path.length>e+1){this.path.pop()}this.path[e].content.forEach((e=>{e.isSelected=false}));this.path[e].isSelected=true;this.path[e].selectedIndex=t;r+=this.path[e].content[t].path;this.fileExplorerChange.emit({path:r,depth:e,index:t})}handleItemKeyDown(e,t=0,r=0){let i=e.target;let l=i.closest(".yeti-file_explorer-folder-items");let s=l.querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper");let o;let a;let f=e.key.toLowerCase();switch(f){case"arrowdown":{e.preventDefault();o=r+1>=this.path[t].content.length?0:r+1;a=s[o];a.focus();break}case"arrowup":{e.preventDefault();o=r-1<0?this.path[t].content.length-1:r-1;a=s[o];a.focus();break}case"arrowright":{if(this.path[t+1]&&this.path[t+1].content&&this.path[t+1].content.length>0){let r=this.path[t+1].selectedIndex>0?this.path[t+1].selectedIndex:0;e.preventDefault();a=this.el.querySelectorAll(".yeti-file_explorer-folder-items")[t+1].querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper")[r];a.focus();a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}break}case"arrowleft":{if(t>0){let r=this.path[t-1].selectedIndex;e.preventDefault();a=this.el.querySelectorAll(".yeti-file_explorer-folder-items")[t-1].querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper")[r];a.focus();a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}break}}}async newFolderObject(){let e={content:[],name:undefined,path:undefined,isFolder:true,isRoot:false,isSelected:false,selectedIndex:-1,id:l.generateUniqueId()};return e}renderFolders(){let e=[];let t={name:"",path:"/",content:[],selectedIndex:-1,isRoot:false,isSelected:false};this.path.forEach(((t,r)=>{e.push(this.renderFolder(t,r))}));while(e.length<this.minimumDisplayDepth){e.push(this.renderFolder(t,-1))}return e}renderFolder(e,t){let i=r("div",{class:"yeti-file_explorer-folder"},r("ul",{class:"yeti-file_explorer-folder-items"},this.renderFolderContents(e,t)));return i}renderFolderContents(e,t=-1){return e.content.map(((e,r)=>this.renderItem(e,t,r)))}renderItem(e,t=-1,i=-1){let l="yeti-file_explorer-folder-item-wrapper"+(e.isSelected?" yeti-file_explorer-folder-item-wrapper__selected":"");let s=r("li",{class:"yeti-file_explorer-folder-item"},r("button",{class:l,onClick:()=>{this.handleItemClick(t,i)},"data-path":e.path,onKeyDown:e=>{this.handleItemKeyDown(e,t,i)}},r("yeti-icon",{iconCode:"folder",alt:"subfolder","icon-style":"outlined",class:"yeti-file_explorer-folder-item-icon"}),r("span",{class:"yeti-file_explorer-folder-item-name"},e.name),r("yeti-icon",{iconCode:"chevron_right",alt:"open subfolder",class:"yeti-file_explorer-folder-more"})));return s}render(){let e="yeti-file_explorer-wrapper";e+=this.wrapperClass!=""?` ${this.wrapperClass}`:"";return r("div",{key:"2aa573ad81e4104b9d90d38f3bef5e240fdcba3e",class:e},r("div",{key:"532cfd17ba5b0458ac1779495157ba43fcbabe03",class:"yeti-file_explorer"},r("div",{key:"ae684f95cc667cca4fe4cf60993526e099ba9971",class:"yeti-file_explorer-folders"},this.renderFolders())),r("div",{key:"fd1b196312fb9ff9aa1274620a3968ca3089cf82",class:"yeti-file_explorer-path"},this.path[this.path.length-1].path))}componentDidRender(){let e=this.el.querySelector(".yeti-file_explorer-folders");if(e){e.scrollIntoView({behavior:"smooth",block:"start",inline:"end"})}}get el(){return i(this)}static get watchers(){return{path:["handlePathChange"]}}};export{s as yeti_file_explorer};
//# sourceMappingURL=p-9b7efaab.entry.js.map