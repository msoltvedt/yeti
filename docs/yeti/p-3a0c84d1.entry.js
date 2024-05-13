import{r as e,h as t,g as n}from"./p-e8f90371.js";import{u as i}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=false;this.wrapperId=""}componentWillLoad(){let e=this.el.id;let t;let n;let a;let o=document.createElement("div");o.classList.add("yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=i.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;n=t.parentElement;if(!t||!n){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");n.insertBefore(o,t);o.appendChild(t);o.appendChild(this.el);a=t.querySelectorAll("h1, h2, h3, h4, h5, h6");for(let e=0;e<a.length;e++){let t=a[e];let n={label:"",id:"",level:1};t.id=t.id&&t.id!=""?t.id:i.generateUniqueId();n.label=t.innerText;n.id=t.id;n.level=parseInt(t.nodeName.substring(1));this.headings.push(n)}}render(){let e="yeti-page_contents";if(!this.isExpanded){e+=" yeti-page_contents__collapsed"}return t("div",{key:"7b5907036e1756b3a786c1f58cb14c0e86644201",class:e,id:this.wrapperId},!this.isExpanded?t("button",{class:"yeti-page_contents-minmax",title:"Expand page contents",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=true}},t("yeti-icon",{iconCode:"toc"})):"",t("ul",{key:"c2125983ee98415ab7618ae520496bd66d308b8c",class:"yeti-page_contents-headings"},this.headings.map(((e,n)=>{let i=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let a=`#${e.id}`;let o=`${e.id}_entry`;let c=e.label;let s={};if(n==0){i+=" yeti-page_contents-heading-title";s=t("button",{class:"yeti-page_contents-minmax",title:"Minimize",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=false}},t("yeti-icon",{iconCode:"minimize"}))}return t("li",{class:i,id:o,key:o},t("a",{href:a,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},c,n==0?s:""))})),t("li",{key:"900a5bae2fc558533d50d86f2d33193ff20e12fa",class:"yeti-page_contents-heading-actions"},t("a",{key:"67fbf304fa7eaae7d59455a4ee7760c453025e15",href:"",title:"Back to top",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"862027ba8869442a914ebd51d5f7907783a69912",iconCode:"vertical_align_top"})),t("a",{key:"7b5cee222c195f18c201d0f1c21403909a5a0d3c",href:"",title:"Collapse all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.remove("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"5b8a6060c47eec934f5050255306267d4ef95d83",iconCode:"unfold_less_double"})),t("a",{key:"dbd678ae09c459874317c3d06274cffa6962e731",href:"",title:"Expand all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.add("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"d2f46fa9d2aed8740758b32707d8a80aa8e5f91a",iconCode:"unfold_more_double"})))))}componentDidLoad(){let e=document.querySelectorAll("h1, h2, h3, h4, h5, h6");let t;let n={root:null,rootMargin:"0px",threshold:1};t=new IntersectionObserver(i,n);e.forEach((e=>{t.observe(e)}));function i(e){e.forEach((e=>{let t=document.querySelector(`#${e.target.id}_entry`);if(e.isIntersecting&&e.target.nodeName!="H1"){t.classList.add("yeti-page_contents-heading__visible")}else{t.classList.remove("yeti-page_contents-heading__visible")}}))}}get el(){return n(this)}};export{a as yeti_page_contents};
//# sourceMappingURL=p-3a0c84d1.entry.js.map