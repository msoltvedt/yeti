import{r as e,c as t,h as l,g as s}from"./p-b0bf542b.js";import{u as i}from"./p-4ae56677.js";const r=class{constructor(l){e(this,l);this.fileExplorerChange=t(this,"fileExplorerChange",7);this.wrapperCSS="";this.showFiles=true;this.minimumDisplayDepth=3;this.path=[{name:"root",content:[{name:"subfolder1",content:[],path:"//subfolder1",isFolder:true,isRoot:false,isSelected:false,selectedIndex:-1,offset:0,pageSize:1e3,totalElements:0,id:i.generateUniqueId(),type:"folder"},{name:"subfolder2",content:[],path:"//subfolder2",isFolder:true,isRoot:false,isSelected:false,selectedIndex:-1,offset:0,pageSize:1e3,totalElements:0,id:i.generateUniqueId(),type:"folder"},{name:"subfolder3",content:[],path:"//subfolder3",isFolder:true,isRoot:false,isSelected:false,selectedIndex:-1,offset:0,pageSize:1e3,totalElements:0,id:i.generateUniqueId(),type:"folder"}],path:"",isFolder:true,isRoot:true,isSelected:true,selectedIndex:-1,offset:0,pageSize:1e3,totalElements:3,id:i.generateUniqueId(),type:"folder"}];this.iLoveJSX=false}handlePathChange(){}handleItemClick(e=0,t=0){let l="";while(this.path.length>e+1){this.path.pop()}this.path[e].content.forEach((e=>{e.isSelected=false}));this.path[e].isSelected=true;this.path[e].selectedIndex=t;l+=this.path[e].content[t].path;this.fileExplorerChange.emit({path:l,depth:e,index:t})}async newFolderObject(){let e={content:[],name:undefined,path:undefined,isFolder:true,isRoot:false,isSelected:false,selectedIndex:-1,id:i.generateUniqueId()};return e}renderFolders(){let e=[];let t={name:"",path:"/",content:[],selectedIndex:-1,isRoot:false,isSelected:false};this.path.forEach(((t,l)=>{e.push(this.renderFolder(t,l))}));while(e.length<this.minimumDisplayDepth){e.push(this.renderFolder(t,-1))}return e}renderFolder(e,t){let s=l("div",{class:"yeti-file_explorer-folder"},l("ul",{class:"yeti-file_explorer-folder-items"},this.renderFolderContents(e,t)));return s}renderFolderContents(e,t=-1){return e.content.map(((e,l)=>this.renderItem(e,t,l)))}renderItem(e,t=-1,s=-1){let i="yeti-file_explorer-folder-item-wrapper"+(e.isSelected?" yeti-file_explorer-folder-item-wrapper__selected":"");let r=l("li",{class:"yeti-file_explorer-folder-item"},l("button",{class:i,onClick:()=>{this.handleItemClick(t,s)},"data-path":e.path},l("yeti-icon",{iconCode:"folder",alt:"subfolder","icon-style":"outlined",class:"yeti-file_explorer-folder-item-icon"}),l("span",{class:"yeti-file_explorer-folder-item-name"},e.name),l("yeti-icon",{iconCode:"chevron_right",alt:"open subfolder",class:"yeti-file_explorer-folder-more"})));return r}render(){let e="yeti-file_explorer-wrapper";e+=this.wrapperCSS!=""?` ${this.wrapperCSS}`:"";return l("div",{class:e},l("div",{class:"yeti-file_explorer"},l("div",{class:"yeti-file_explorer-folders"},this.renderFolders())),l("div",{class:"yeti-file_explorer-path"},this.path[this.path.length-1].path))}componentDidRender(){let e=this.el.querySelector(".yeti-file_explorer-folders");if(e){e.scrollIntoView({behavior:"smooth",block:"start",inline:"end"})}}get el(){return s(this)}static get watchers(){return{path:["handlePathChange"]}}};export{r as yeti_file_explorer};
//# sourceMappingURL=p-ed808701.entry.js.map