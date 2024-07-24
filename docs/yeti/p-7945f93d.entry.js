import{r as e,h as t,g as i}from"./p-0d1be970.js";import{u as n}from"./p-943baa85.js";const c=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=true;this.wrapperId="";this.ignoreWithin=""}componentWillLoad(){let e=this.el.id;let t;let i;let c;let o=document.createElement("div");o.classList.add("yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=n.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;i=t.parentElement;if(!t||!i){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");i.insertBefore(o,t);o.appendChild(t);o.appendChild(this.el);if(this.ignoreWithin!=""){c=t.querySelectorAll(`:is(h1, h2, h3, h4, h5, h6):not(.${this.ignoreWithin} :is(h1, h2, h3, h4, h5, h6))`)}else{c=t.querySelectorAll("h1, h2, h3, h4, h5, h6")}for(let e=0;e<c.length;e++){let t=c[e];let i={label:"",id:"",level:1};t.id=t.id&&t.id!=""?t.id:n.generateUniqueId();i.label=t.innerText;i.id=t.id;i.level=parseInt(t.nodeName.substring(1));this.headings.push(i)}}render(){let e="yeti-page_contents";if(!this.isExpanded){e+=" yeti-page_contents__collapsed"}return t("div",{key:"c617c88ff319adc0abe2bba87ff52796176483cc",class:e,id:this.wrapperId},!this.isExpanded?t("button",{class:"yeti-page_contents-minmax",title:"Expand page contents",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=true}},t("yeti-icon",{iconCode:"toc"})):"",t("ul",{key:"323383c5cdc847685745f951ed6bf58f57b7a190",class:"yeti-page_contents-headings"},this.headings.map(((e,i)=>{let n=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let c=`#${e.id}`;let o=`${e.id}_entry`;let a=e.label;let s={};if(i==0){n+=" yeti-page_contents-heading-title";s=t("button",{class:"yeti-page_contents-minmax",title:"Minimize",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=false}},t("yeti-icon",{iconCode:"minimize"}))}return t("li",{class:n,id:o,key:o},t("a",{href:c,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},a,i==0?s:""))})),t("li",{key:"c7090de0b8c14ed18d9672d9912a1c8f8c434176",class:"yeti-page_contents-heading-actions"},t("a",{key:"58dc5e1c17b8dab61097048d1605d24cd6c809ca",href:"",title:"Back to top",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"91709fa48685a27aebe2da5f2cc096113fa20a87",iconCode:"vertical_align_top"})),t("a",{key:"e236be2ace7dc9fcfafb9658d17f649143ea0591",href:"",title:"Collapse all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.remove("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"1a9ed61f0c8d3d9f6b446332ebd1fb2515c43b3c",iconCode:"unfold_less_double"})),t("a",{key:"83cb0044604b6034e3f4280ceaf917e3f2cc3624",href:"",title:"Expand all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.add("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"ec0f0d2f5fdc28beef50e2fae5cf5fd48abb1817",iconCode:"unfold_more_double"})))))}componentDidLoad(){let e=document.querySelectorAll("h1, h2, h3, h4, h5, h6");let t;let i={root:null,rootMargin:"0px",threshold:1};t=new IntersectionObserver(n,i);e.forEach((e=>{t.observe(e)}));function n(e){e.forEach((e=>{let t=document.querySelector(`#${e.target.id}_entry`);if(e.isIntersecting&&e.target.nodeName!="H1"){if(t&&t.classList){t.classList.add("yeti-page_contents-heading__visible")}}else{if(t&&t.classList){t.classList.remove("yeti-page_contents-heading__visible")}}}))}}get el(){return i(this)}};export{c as yeti_page_contents};
//# sourceMappingURL=p-7945f93d.entry.js.map