import{r as e,h as t,g as i}from"./p-39d3f65a.js";import{u as n}from"./p-943baa85.js";const a=class{constructor(t){e(this,t);this.headings=[];this.isExpanded=true;this.wrapperId="";this.ignoreWithin=""}componentWillLoad(){let e=this.el.id;let t;let i;let a;let o=document.createElement("div");let c=[];o.classList.add("yeti-page_contents-wrapper");if(!e){e=n.generateUniqueId();this.wrapperId=`${e}_wrapper`}t=this.el.parentElement;i=t.parentElement;if(!t||!i){console.warn("yeti-page-contents requires containing parent and grandparent elements.");return}t.classList.add("yeti-page_contents-wrappee");i.insertBefore(o,t);o.appendChild(t);o.appendChild(this.el);if(this.ignoreWithin!=""){a=t.querySelectorAll(`:is(h1, h2, h3, h4, h5, h6):not(.${this.ignoreWithin} :is(h1, h2, h3, h4, h5, h6))`)}else{a=t.querySelectorAll("h1, h2, h3, h4, h5, h6")}for(let e=0;e<a.length;e++){let t=a[e];let i;let o={label:"",id:"",level:1};i=t.id&&t.id!=""?t.id:t.innerText.replaceAll(" ","");i=c.includes(i)?n.generateUniqueId():i;o.label=t.innerText;o.id=i;o.level=parseInt(t.nodeName.substring(1));this.headings.push(o);c.push(i);t.id=i}}render(){let e="yeti-page_contents";if(!this.isExpanded){e+=" yeti-page_contents__collapsed"}return t("div",{key:"24b0399c8c755fc3505d0b27e9573d167fe301d7",class:e,id:this.wrapperId},!this.isExpanded?t("button",{class:"yeti-page_contents-minmax",title:"Expand page contents",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=true}},t("yeti-icon",{iconCode:"toc"})):"",t("ul",{key:"c4e2f45388e2eaadfd56e825c0a19e5ec4ba1d60",class:"yeti-page_contents-headings"},this.headings.map(((e,i)=>{let n=`yeti-page_contents-heading yeti-page_contents-heading-level-${e.level}`;let a=`#${e.id}`;let o=`${e.id}_entry`;let c=e.label;let s={};if(i==0){n+=" yeti-page_contents-heading-title";s=t("button",{class:"yeti-page_contents-minmax",title:"Minimize",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();this.isExpanded=false}},t("yeti-icon",{iconCode:"minimize"}))}return t("li",{class:n,id:o,key:o},t("a",{href:a,onClick:t=>{t.preventDefault();t.stopImmediatePropagation();document.getElementById(e.id).scrollIntoView({behavior:"smooth",inline:"start"})}},c,i==0?s:""))})),t("li",{key:"959b09b95f35b305ef06c51ae001a73c68aa01b4",class:"yeti-page_contents-heading-actions"},t("a",{key:"7a2e487344e19d672c47531e419ff8be5a8a87de",href:"",title:"Back to top",onClick:e=>{e.preventDefault();e.stopImmediatePropagation();document.body.scrollIntoView({behavior:"smooth",inline:"start"})},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"f38495ba9c8459735809b3e4d0fe31912150f5e3",iconCode:"vertical_align_top"})),t("a",{key:"83ecd4aa77153b602e59f1aca176757adca38094",href:"",title:"Collapse all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.remove("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"88f9813b26adb27c8ad32ffe404af12b987130aa",iconCode:"unfold_less_double"})),t("a",{key:"5e3aaf1e78f772131708ffc91dd47e9c8a8d1e89",href:"",title:"Expand all code blocks",onClick:e=>{let t=document.getElementsByClassName("ydoc-code_sample");e.preventDefault();e.stopImmediatePropagation();for(let e=0;e<t.length;e++){t[e].classList.add("ydoc-demo__code_expanded")}},class:"yeti-page_contents-heading-action"},t("yeti-icon",{key:"b5811ea540ea27ce553bde90fd652a592a98c66d",iconCode:"unfold_more_double"})))))}componentDidLoad(){let e=document.querySelectorAll("h1, h2, h3, h4, h5, h6");let t;let i={root:null,rootMargin:"0px",threshold:1};t=new IntersectionObserver(n,i);e.forEach((e=>{t.observe(e)}));function n(e){e.forEach((e=>{let t=document.querySelector(`#${e.target.id}_entry`);if(e.isIntersecting&&e.target.nodeName!="H1"){if(t&&t.classList){t.classList.add("yeti-page_contents-heading__visible")}}else{if(t&&t.classList){t.classList.remove("yeti-page_contents-heading__visible")}}}))}}get el(){return i(this)}};export{a as yeti_page_contents};
//# sourceMappingURL=p-fc399f43.entry.js.map