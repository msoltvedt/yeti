import{r as e,h as t,g as a}from"./p-e8f90371.js";import{u as n}from"./p-943baa85.js";const i=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=false;this.wrapperId=""}componentWillLoad(){let e=this.el.id;let t;let a;let i;let s=document.createElement("div");s.classList.add("yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=n.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;a=t.parentElement;if(!t||!a){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");a.insertBefore(s,t);s.appendChild(t);s.appendChild(this.el);i=t.querySelectorAll("h1, h2, h3, h4, h5, h6");for(let e=0;e<i.length;e++){let t=i[e];let a={label:"",id:"",level:1};t.id=t.id&&t.id!=""?t.id:n.generateUniqueId();a.label=t.innerText;a.id=t.id;a.level=parseInt(t.nodeName.substring(1));this.headings.push(a)}}render(){return t("div",{key:"0286595fbf25adf41a1ea0cf36568226fb83f088",class:"yeti-page_contents",id:this.wrapperId},t("ul",{key:"fc82fa0127bcba2ad6b4becc60e8cb5a7a960eb5",class:"yeti-page_contents-headings"},this.headings.map(((e,a)=>{let n=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let i=`#${e.id}`;let s=e.label;return t("li",{class:n},t("a",{href:i,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},s,a==0?[t("br",null)," Page Contents"]:""))})),t("li",{key:"3f6ef6aabc9f6fb783f67601ec2bdd6a9c14af01",class:"yeti-page_contents-heading yeti-page_contents-heading-level-2"},t("a",{key:"7560907ad07d6ab4329408b377267822ea1b8744",href:"",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})}},"Top"))))}componentDidLoad(){let e=document.querySelectorAll("h3")[document.querySelectorAll("h3").length];console.log(e)}get el(){return a(this)}};export{i as yeti_page_contents};
//# sourceMappingURL=p-3e3e77d9.entry.js.map