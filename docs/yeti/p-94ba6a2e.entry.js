import{r as e,h as t,g as n}from"./p-e8f90371.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=false;this.wrapperId=""}componentWillLoad(){let e=this.el.id;let t;let n;let a;let o=document.createElement("div");o.classList.add("yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=i.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;n=t.parentElement;if(!t||!n){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");n.insertBefore(o,t);o.appendChild(t);o.appendChild(this.el);a=t.querySelectorAll("h1, h2, h3, h4, h5, h6");for(let e=0;e<a.length;e++){let t=a[e];let n={label:"",id:"",level:1};t.id=t.id&&t.id!=""?t.id:i.generateUniqueId();n.label=t.innerText;n.id=t.id;n.level=parseInt(t.nodeName.substring(1));this.headings.push(n)}}render(){return t("div",{key:"a3076420102f424e42eef42b1009ea6dd174cb1c",class:"yeti-page_contents",id:this.wrapperId},t("ul",{key:"94b892a8f5131b99e8ea142ea1b03b32e6abd0c4",class:"yeti-page_contents-headings"},this.headings.map(((e,n)=>{let i=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let a=`#${e.id}`;let o=`${e.id}_entry`;let s=e.label;let c={};if(n==0){i+=" yeti-page_contents-heading-title";c=t("yeti-icon",{iconCode:"minimize"})}return t("li",{class:i,id:o,key:o},t("a",{href:a,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},s,c))})),t("li",{key:"2120e09796964c52bbb88002443633f94c850295",class:"yeti-page_contents-heading-actions"},t("a",{key:"8c2cb0cc81831b25c4a7b33eb30b668d4aeeb75e",href:"",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"3b6571cc25964919270284fd2555e1262599290f",iconCode:"vertical_align_top"})),t("a",{key:"347310eb527dff327fcaad2fc90468f2a220104d",href:"",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"fcbc4fc349295573019120d2831fc0b347600dd3",iconCode:"unfold_less_double"})))))}componentDidLoad(){let e=document.querySelectorAll("h1, h2, h3, h4, h5, h6");let t;let n={root:null,rootMargin:"0px",threshold:1};t=new IntersectionObserver(i,n);e.forEach((e=>{t.observe(e)}));function i(e){e.forEach((e=>{let t=document.querySelector(`#${e.target.id}_entry`);if(e.isIntersecting&&e.target.nodeName!="H1"){t.classList.add("yeti-page_contents-heading__visible")}else{t.classList.remove("yeti-page_contents-heading__visible")}}))}}get el(){return n(this)}};export{a as yeti_page_contents};
//# sourceMappingURL=p-94ba6a2e.entry.js.map