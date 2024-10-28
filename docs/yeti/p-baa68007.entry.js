import{r as e,c as t,h as i,g as l}from"./p-0d1be970.js";import{u as r}from"./p-943baa85.js";const s=class{constructor(i){e(this,i);this.fileExplorerChange=t(this,"fileExplorerChange",7);this.wrapperClass="";this.showFiles=true;this.minimumDisplayDepth=3;this.path=[{name:"root",content:[],path:"",displayPath:"",isFolder:true,isRoot:true,isSelected:true,isLoading:false,selectedIndex:-1,offset:0,pageSize:1e3,totalElements:0,id:r.generateUniqueId(),type:"folder"}];this.iLoveJSX=false}handlePathChange(){}handleItemClick(e=0,t=0){let i="";let l="";while(this.path.length>e+1){this.path.pop()}this.path[e].content.forEach((e=>{e.isSelected=false}));this.path[e].isSelected=true;this.path[e].selectedIndex=t;i+=this.path[e].content[t].path;l+=this.path[e].content[t].displayPath;this.fileExplorerChange.emit({path:i,displayPath:l,depth:e,index:t})}handleItemKeyDown(e,t=0,i=0){let l=e.target;let r=l.closest(".yeti-file_explorer-folder-items");let s=r.querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper");let o;let a;let d=e.key.toLowerCase();switch(d){case"arrowdown":{e.preventDefault();o=i+1>=this.path[t].content.length?0:i+1;a=s[o];a.focus();break}case"arrowup":{e.preventDefault();o=i-1<0?this.path[t].content.length-1:i-1;a=s[o];a.focus();break}case"arrowright":{if(this.path[t+1]&&this.path[t+1].content&&this.path[t+1].content.length>0){let i=this.path[t+1].selectedIndex>0?this.path[t+1].selectedIndex:0;e.preventDefault();a=this.el.querySelectorAll(".yeti-file_explorer-folder-items")[t+1].querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper")[i];a.focus();a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}break}case"arrowleft":{if(t>0){let i=this.path[t-1].selectedIndex;e.preventDefault();a=this.el.querySelectorAll(".yeti-file_explorer-folder-items")[t-1].querySelectorAll(".yeti-file_explorer-folder-item .yeti-file_explorer-folder-item-wrapper")[i];a.focus();a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}break}}}async newFolderObject(){let e={content:[],name:undefined,path:undefined,displayPath:undefined,isFolder:true,isRoot:false,isLoading:false,isSelected:false,selectedIndex:-1,id:r.generateUniqueId()};return e}renderFolders(){let e=[];let t={name:"",path:"/",displayPath:"",content:[],selectedIndex:-1,isRoot:false,isSelected:false,isLoading:false};this.path.forEach(((t,i)=>{e.push(this.renderFolder(t,i))}));while(e.length<this.minimumDisplayDepth){e.push(this.renderFolder(t,-1))}return e}renderFolder(e,t){let l=i("div",{class:"yeti-file_explorer-folder"},i("ul",{class:"yeti-file_explorer-folder-items"},i("li",{class:"yeti-file_explorer-folder-item"},i("yeti-loading",{isInline:true,isActive:true}))));let r=i("div",{class:"yeti-file_explorer-folder"},i("ul",{class:"yeti-file_explorer-folder-items"},this.renderFolderContents(e,t)));return e.isLoading?l:r}renderFolderContents(e,t=-1){return e.content.map(((e,i)=>this.renderItem(e,t,i)))}renderItem(e,t=-1,l=-1){let r="yeti-file_explorer-folder-item-wrapper"+(e.isSelected?" yeti-file_explorer-folder-item-wrapper__selected":"");let s=i("li",{class:"yeti-file_explorer-folder-item"},i("button",{class:r,onClick:()=>{this.handleItemClick(t,l)},"data-path":e.path,onKeyDown:e=>{this.handleItemKeyDown(e,t,l)}},i("yeti-icon",{iconCode:"folder",alt:"subfolder","icon-style":"outlined",class:"yeti-file_explorer-folder-item-icon"}),i("span",{class:"yeti-file_explorer-folder-item-name"},e.name),i("yeti-icon",{iconCode:"chevron_right",alt:"open subfolder",class:"yeti-file_explorer-folder-more"})));return s}render(){let e="yeti-file_explorer-wrapper";e+=this.wrapperClass!=""?` ${this.wrapperClass}`:"";return i("div",{key:"660013892d11a8eb5441fc1c9dced364257acf82",class:e},i("div",{key:"a36b88cd7635ebcb9f7f77faae1f55d02dd4c326",class:"yeti-file_explorer"},i("div",{key:"b2e2d559dea8a5b023c3bb51e89eaffadea0a5ca",class:"yeti-file_explorer-folders"},this.renderFolders())),i("div",{key:"cabec0cd753aa11df69db7780f98c679dab79206",class:"yeti-file_explorer-path"},this.path[this.path.length-1].displayPath))}componentDidRender(){let e=this.el.querySelector(".yeti-file_explorer-folders");if(e){e.scrollIntoView({behavior:"smooth",block:"start",inline:"end"})}}get el(){return l(this)}static get watchers(){return{path:["handlePathChange"]}}};export{s as yeti_file_explorer};
//# sourceMappingURL=p-baa68007.entry.js.map