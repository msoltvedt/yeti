import{r as e,h as t,g as i}from"./p-39d3f65a.js";import{u as n}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=true;this.wrapperId="";this.ignoreWithin=""}componentWillLoad(){let e=this.el.id;let t;let i;let a;let o=document.createElement("div");let c=[];o.classList.add("yeti-page_contents-wrapper");if(!e){e=n.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;i=t.parentElement;if(!t||!i){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");i.insertBefore(o,t);o.appendChild(t);o.appendChild(this.el);if(this.ignoreWithin!=""){a=t.querySelectorAll(`:is(h1, h2, h3, h4, h5, h6):not(.${this.ignoreWithin} :is(h1, h2, h3, h4, h5, h6))`)}else{a=t.querySelectorAll("h1, h2, h3, h4, h5, h6")}for(let e=0;e<a.length;e++){let t=a[e];let i;let o={label:"",id:"",level:1};i=t.id&&t.id!=""?t.id:t.innerText.replaceAll(" ","");i=c.includes(i)?n.generateUniqueId():i;o.label=t.innerText;o.id=i;o.level=parseInt(t.nodeName.substring(1));this.headings.push(o);c.push(i);t.id=i}}render(){let e="yeti-page_contents";if(!this.isExpanded){e+=" yeti-page_contents__collapsed"}return t("div",{key:"c46d5ae24fea4f101ffc9fb07c5bb5fa00f02fc2",class:e,id:this.wrapperId},!this.isExpanded?t("button",{class:"yeti-page_contents-minmax",title:"Expand page contents",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=true}},t("yeti-icon",{iconCode:"toc"})):"",t("ul",{key:"8ed3524e0145c61f35ce27e65e525d76518362ce",class:"yeti-page_contents-headings"},this.headings.map(((e,i)=>{let n=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let a=`#${e.id}`;let o=`${e.id}_entry`;let c=e.label;let s={};if(i==0){n+=" yeti-page_contents-heading-title";s=t("button",{class:"yeti-page_contents-minmax",title:"Minimize",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=false}},t("yeti-icon",{iconCode:"minimize"}))}return t("li",{class:n,id:o,key:o},t("a",{href:a,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},c,i==0?s:""))})),t("li",{key:"51a5cc405fbd3626f754d68990ad2bb67b225893",class:"yeti-page_contents-heading-actions"},t("a",{key:"d626854a959a58156cf86a93ad41cd448beafb17",href:"",title:"Back to top",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"26876820b5778a330b2b145135801e1f6d0e0b9d",iconCode:"vertical_align_top"})),t("a",{key:"ae06c6a49bb9aa4bba7a42e2bbd41d967a499444",href:"",title:"Collapse all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.remove("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"13bfa25ef0215a1e72a1ca66b391a8d5487a7c2b",iconCode:"unfold_less_double"})),t("a",{key:"ea82d9d59a2303a9f29c091e72388d5f93120289",href:"",title:"Expand all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.add("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"36880f91a7a256e80ae5e44ae9d5b170bf9d3dbb",iconCode:"unfold_more_double"})))))}componentDidLoad(){let e=document.querySelectorAll("h1, h2, h3, h4, h5, h6");let t;let i={root:null,rootMargin:"0px",threshold:1};t=new IntersectionObserver(n,i);e.forEach((e=>{t.observe(e)}));function n(e){e.forEach((e=>{let t=document.querySelector(`#${e.target.id}_entry`);if(e.isIntersecting&&e.target.nodeName!="H1"){if(t&&t.classList){t.classList.add("yeti-page_contents-heading__visible")}}else{if(t&&t.classList){t.classList.remove("yeti-page_contents-heading__visible")}}}))}}get el(){return i(this)}};export{a as yeti_page_contents};
//# sourceMappingURL=p-3fcf1d0f.entry.js.map