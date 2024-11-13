import{r as e,h as t,g as i}from"./p-0d1be970.js";import{u as n}from"./p-943baa85.js";const o=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=true;this.wrapperId="";this.ignoreWithin=""}componentWillLoad(){let e=this.el.id;let t;let i;let o;let a=document.createElement("div");a.classList.add("yeti-page_contents-wrapper");this.el.setAttribute("aria-hidden","true");if(!e){e=n.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;i=t.parentElement;if(!t||!i){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");i.insertBefore(a,t);a.appendChild(t);a.appendChild(this.el);if(this.ignoreWithin!=""){o=t.querySelectorAll(`:is(h1, h2, h3, h4, h5, h6):not(.${this.ignoreWithin} :is(h1, h2, h3, h4, h5, h6))`)}else{o=t.querySelectorAll("h1, h2, h3, h4, h5, h6")}for(let e=0;e<o.length;e++){let t=o[e];let i={label:"",id:"",level:1};t.id=t.id&&t.id!=""?t.id:n.generateUniqueId();i.label=t.innerText;i.id=t.id;i.level=parseInt(t.nodeName.substring(1));this.headings.push(i)}}render(){let e="yeti-page_contents";if(!this.isExpanded){e+=" yeti-page_contents__collapsed"}return t("div",{key:"14070db2237cb67730de4d2576e6a4e1be7c86a5",class:e,id:this.wrapperId},!this.isExpanded?t("button",{class:"yeti-page_contents-minmax",title:"Expand page contents",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=true}},t("yeti-icon",{iconCode:"toc"})):"",t("ul",{key:"b71f26fddbf4b73358bbc6567e999d1aea56a86f",class:"yeti-page_contents-headings"},this.headings.map(((e,i)=>{let n=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let o=`#${e.id}`;let a=`${e.id}_entry`;let c=e.label;let s={};if(i==0){n+=" yeti-page_contents-heading-title";s=t("button",{class:"yeti-page_contents-minmax",title:"Minimize",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=false}},t("yeti-icon",{iconCode:"minimize"}))}return t("li",{class:n,id:a,key:a},t("a",{href:o,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},c,i==0?s:""))})),t("li",{key:"9e4ab07d9b1d3cfca2766001e6a2b180855f1de0",class:"yeti-page_contents-heading-actions"},t("a",{key:"8c32c4d1971e88c90830be5a973662fff6a469ce",href:"",title:"Back to top",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"043a4ab94d0a565ebd55769a05877560477d75eb",iconCode:"vertical_align_top"})),t("a",{key:"cbf3cf717bd843da2836dd0e8ad588c256d42321",href:"",title:"Collapse all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.remove("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"3d82c49777719aaecbacd031529df903ce49f7e5",iconCode:"unfold_less_double"})),t("a",{key:"ab174e21228ee2b96b49704dde0907c1a2a8fbf0",href:"",title:"Expand all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.add("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"44b16833d57ce7c46099ec40122979a216667987",iconCode:"unfold_more_double"})))))}componentDidLoad(){let e=document.querySelectorAll("h1, h2, h3, h4, h5, h6");let t;let i={root:null,rootMargin:"0px",threshold:1};t=new IntersectionObserver(n,i);e.forEach((e=>{t.observe(e)}));function n(e){e.forEach((e=>{let t=document.querySelector(`#${e.target.id}_entry`);if(e.isIntersecting&&e.target.nodeName!="H1"){if(t&&t.classList){t.classList.add("yeti-page_contents-heading__visible")}}else{if(t&&t.classList){t.classList.remove("yeti-page_contents-heading__visible")}}}))}}get el(){return i(this)}};export{o as yeti_page_contents};
//# sourceMappingURL=p-0c026dcc.entry.js.map