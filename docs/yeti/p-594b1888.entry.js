import{r as e,h as t,g as i}from"./p-0d1be970.js";import{u as n}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=true;this.wrapperId="";this.ignoreWithin=""}componentWillLoad(){let e=this.el.id;let t;let i;let a;let o=document.createElement("div");o.classList.add("yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=n.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;i=t.parentElement;if(!t||!i){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");i.insertBefore(o,t);o.appendChild(t);o.appendChild(this.el);if(this.ignoreWithin!=""){a=t.querySelectorAll(`:is(h1, h2, h3, h4, h5, h6):not(.${this.ignoreWithin} :is(h1, h2, h3, h4, h5, h6))`)}else{a=t.querySelectorAll("h1, h2, h3, h4, h5, h6")}for(let e=0;e<a.length;e++){let t=a[e];let i={label:"",id:"",level:1};t.id=t.id&&t.id!=""?t.id:n.generateUniqueId();i.label=t.innerText;i.id=t.id;i.level=parseInt(t.nodeName.substring(1));this.headings.push(i)}}render(){let e="yeti-page_contents";if(!this.isExpanded){e+=" yeti-page_contents__collapsed"}return t("div",{key:"d5bd617bf5943a466f98190537c9ac5c854627ba",class:e,id:this.wrapperId},!this.isExpanded?t("button",{class:"yeti-page_contents-minmax",title:"Expand page contents",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=true}},t("yeti-icon",{iconCode:"toc"})):"",t("ul",{key:"ef9f7e32f865e1dc079b2c99787b0d103aeb8222",class:"yeti-page_contents-headings"},this.headings.map(((e,i)=>{let n=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let a=`#${e.id}`;let o=`${e.id}_entry`;let c=e.label;let s={};if(i==0){n+=" yeti-page_contents-heading-title";s=t("button",{class:"yeti-page_contents-minmax",title:"Minimize",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=false}},t("yeti-icon",{iconCode:"minimize"}))}return t("li",{class:n,id:o,key:o},t("a",{href:a,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},c,i==0?s:""))})),t("li",{key:"7387c1ff110def18a10ecf53a7f991c8ab203b18",class:"yeti-page_contents-heading-actions"},t("a",{key:"14ae4884c59442f3e4e3d6d625b7a796ed54e999",href:"",title:"Back to top",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"3fdc1960213ec84a8d8611910090e3d4ff1dd1e3",iconCode:"vertical_align_top"})),t("a",{key:"d5cf68283b31a3a6a5d2051b57d5b2c00e2375df",href:"",title:"Collapse all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.remove("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"bee0b624fad556c98f60e0b2e693cf722559ec1d",iconCode:"unfold_less_double"})),t("a",{key:"2bcc343a2ce37ca2ab7d58342a4e49a2da7d6a86",href:"",title:"Expand all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.add("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"7ac5f61bd7ce162bac4547fca7e0490bad0d5f57",iconCode:"unfold_more_double"})))))}componentDidLoad(){let e=document.querySelectorAll("h1, h2, h3, h4, h5, h6");let t;let i={root:null,rootMargin:"0px",threshold:1};t=new IntersectionObserver(n,i);e.forEach((e=>{t.observe(e)}));function n(e){e.forEach((e=>{let t=document.querySelector(`#${e.target.id}_entry`);if(e.isIntersecting&&e.target.nodeName!="H1"){if(t&&t.classList){t.classList.add("yeti-page_contents-heading__visible")}}else{if(t&&t.classList){t.classList.remove("yeti-page_contents-heading__visible")}}}))}}get el(){return i(this)}};export{a as yeti_page_contents};
//# sourceMappingURL=p-594b1888.entry.js.map