const t="yeti";let e;let n;let s;let l=false;let o=false;let i=false;let f=false;let c=false;const r=(t,e="")=>{{return()=>{}}};const u=(t,e)=>{{return()=>{}}};const a="{visibility:hidden}.hydrated{visibility:inherit}";const d="slot-fb{display:contents}slot-fb[hidden]{display:none}";const v="http://www.w3.org/1999/xlink";const p={};const y="http://www.w3.org/2000/svg";const h="http://www.w3.org/1999/xhtml";const b=t=>t!=null;const $=t=>{t=typeof t;return t==="object"||t==="function"};function m(t){var e,n,s;return(s=(n=(e=t.head)===null||e===void 0?void 0:e.querySelector('meta[name="csp-nonce"]'))===null||n===void 0?void 0:n.getAttribute("content"))!==null&&s!==void 0?s:undefined}const w=(t,e,...n)=>{let s=null;let l=null;let o=null;let i=false;let f=false;const c=[];const r=e=>{for(let n=0;n<e.length;n++){s=e[n];if(Array.isArray(s)){r(s)}else if(s!=null&&typeof s!=="boolean"){if(i=typeof t!=="function"&&!$(s)){s=String(s)}if(i&&f){c[c.length-1].t+=s}else{c.push(i?g(null,s):s)}f=i}}};r(n);if(e){if(e.key){l=e.key}if(e.name){o=e.name}{const t=e.className||e.class;if(t){e.class=typeof t!=="object"?t:Object.keys(t).filter((e=>t[e])).join(" ")}}}const u=g(t,null);u.l=e;if(c.length>0){u.o=c}{u.i=l}{u.u=o}return u};const g=(t,e)=>{const n={v:0,p:t,t:e,h:null,o:null};{n.l=null}{n.i=null}{n.u=null}return n};const S={};const j=t=>t&&t.p===S;const k=(t,e)=>{if(t!=null&&!$(t)){if(e&4){return t==="false"?false:t===""||!!t}if(e&2){return parseFloat(t)}if(e&1){return String(t)}return t}return t};const O=t=>Rt(t).$hostElement$;const C=(t,e,n)=>{const s=O(t);return{emit:t=>M(s,e,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:t})}};const M=(t,e,n)=>{const s=Ft.ce(e,n);t.dispatchEvent(s);return s};const R=new WeakMap;const x=(t,e,n)=>{let s=Nt.get(t);if(It&&n){s=s||new CSSStyleSheet;if(typeof s==="string"){s=e}else{s.replaceSync(e)}}else{s=e}Nt.set(t,s)};const P=(t,e,n)=>{var s;const l=T(e);const o=Nt.get(l);t=t.nodeType===11?t:Wt;if(o){if(typeof o==="string"){t=t.head||t;let n=R.get(t);let i;if(!n){R.set(t,n=new Set)}if(!n.has(l)){{i=Wt.createElement("style");i.innerHTML=o;const e=(s=Ft.$)!==null&&s!==void 0?s:m(Wt);if(e!=null){i.setAttribute("nonce",e)}t.insertBefore(i,t.querySelector("link"))}if(e.v&4){i.innerHTML+=d}if(n){n.add(l)}}}else if(!t.adoptedStyleSheets.includes(o)){t.adoptedStyleSheets=[...t.adoptedStyleSheets,o]}}return l};const A=t=>{const e=t.m;const n=t.$hostElement$;const s=e.v;const l=r("attachStyles",e.S);const o=P(n.shadowRoot?n.shadowRoot:n.getRootNode(),e);if(s&10){n["s-sc"]=o;n.classList.add(o+"-h")}l()};const T=(t,e)=>"sc-"+t.S;const E=(t,e,n,s,l,o)=>{if(n!==s){let i=At(t,e);let f=e.toLowerCase();if(e==="class"){const e=t.classList;const l=N(n);const o=N(s);e.remove(...l.filter((t=>t&&!o.includes(t))));e.add(...o.filter((t=>t&&!l.includes(t))))}else if(e==="style"){{for(const e in n){if(!s||s[e]==null){if(e.includes("-")){t.style.removeProperty(e)}else{t.style[e]=""}}}}for(const e in s){if(!n||s[e]!==n[e]){if(e.includes("-")){t.style.setProperty(e,s[e])}else{t.style[e]=s[e]}}}}else if(e==="key");else if(e==="ref"){if(s){s(t)}}else if(!i&&e[0]==="o"&&e[1]==="n"){if(e[2]==="-"){e=e.slice(3)}else if(At(Ut,f)){e=f.slice(2)}else{e=f[2]+e.slice(3)}if(n||s){const l=e.endsWith(U);e=e.replace(W,"");if(n){Ft.rel(t,e,n,l)}if(s){Ft.ael(t,e,s,l)}}}else{const c=$(s);if((i||c&&s!==null)&&!l){try{if(!t.tagName.includes("-")){const l=s==null?"":s;if(e==="list"){i=false}else if(n==null||t[e]!=l){t[e]=l}}else{t[e]=s}}catch(t){}}let r=false;{if(f!==(f=f.replace(/^xlink\:?/,""))){e=f;r=true}}if(s==null||s===false){if(s!==false||t.getAttribute(e)===""){if(r){t.removeAttributeNS(v,e)}else{t.removeAttribute(e)}}}else if((!i||o&4||l)&&!c){s=s===true?"":s;if(r){t.setAttributeNS(v,e,s)}else{t.setAttribute(e,s)}}}}};const L=/\s/;const N=t=>!t?[]:t.split(L);const U="Capture";const W=new RegExp(U+"$");const D=(t,e,n,s)=>{const l=e.h.nodeType===11&&e.h.host?e.h.host:e.h;const o=t&&t.l||p;const i=e.l||p;{for(s in o){if(!(s in i)){E(l,s,o[s],undefined,n,e.v)}}}for(s in i){E(l,s,o[s],i[s],n,e.v)}};const F=(t,o,c,r)=>{const u=o.o[c];let a=0;let d;let v;let p;if(!l){i=true;if(u.p==="slot"){if(e){r.classList.add(e+"-s")}u.v|=u.o?2:1}}if(u.t!==null){d=u.h=Wt.createTextNode(u.t)}else if(u.v&1){d=u.h=Wt.createTextNode("")}else{if(!f){f=u.p==="svg"}d=u.h=Wt.createElementNS(f?y:h,u.v&2?"slot-fb":u.p);if(f&&u.p==="foreignObject"){f=false}{D(null,u,f)}if(b(e)&&d["s-si"]!==e){d.classList.add(d["s-si"]=e)}if(u.o){for(a=0;a<u.o.length;++a){v=F(t,u,a,d);if(v){d.appendChild(v)}}}{if(u.p==="svg"){f=false}else if(d.tagName==="foreignObject"){f=true}}}d["s-hn"]=s;{if(u.v&(2|1)){d["s-sr"]=true;d["s-cr"]=n;d["s-sn"]=u.u||"";p=t&&t.o&&t.o[c];if(p&&p.p===u.p&&t.h){{q(t.h)}}}}return d};const q=t=>{Ft.v|=1;const e=t.closest(s.toLowerCase());if(e!=null){const n=Array.from(e.childNodes).find((t=>t["s-cr"]));const s=Array.from(t.childNodes);for(const t of n?s.reverse():s){if(t["s-sh"]!=null){e.insertBefore(t,n!==null&&n!==void 0?n:null);t["s-sh"]=undefined;i=true}}}Ft.v&=~1};const H=(t,e)=>{Ft.v|=1;const n=t.childNodes;for(let t=n.length-1;t>=0;t--){const l=n[t];if(l["s-hn"]!==s&&l["s-ol"]){G(l).insertBefore(l,B(l));l["s-ol"].remove();l["s-ol"]=undefined;l["s-sh"]=undefined;i=true}if(e){H(l,e)}}Ft.v&=~1};const I=(t,e,n,l,o,i)=>{let f=t["s-cr"]&&t["s-cr"].parentNode||t;let c;if(f.shadowRoot&&f.tagName===s){f=f.shadowRoot}for(;o<=i;++o){if(l[o]){c=F(null,n,o,t);if(c){l[o].h=c;f.insertBefore(c,B(e))}}}};const V=(t,e,n)=>{for(let s=e;s<=n;++s){const e=t[s];if(e){const t=e.h;Z(e);if(t){{o=true;if(t["s-ol"]){t["s-ol"].remove()}else{H(t,true)}}t.remove()}}}};const _=(t,e,n,s,l=false)=>{let o=0;let i=0;let f=0;let c=0;let r=e.length-1;let u=e[0];let a=e[r];let d=s.length-1;let v=s[0];let p=s[d];let y;let h;while(o<=r&&i<=d){if(u==null){u=e[++o]}else if(a==null){a=e[--r]}else if(v==null){v=s[++i]}else if(p==null){p=s[--d]}else if(z(u,v,l)){J(u,v,l);u=e[++o];v=s[++i]}else if(z(a,p,l)){J(a,p,l);a=e[--r];p=s[--d]}else if(z(u,p,l)){if(u.p==="slot"||p.p==="slot"){H(u.h.parentNode,false)}J(u,p,l);t.insertBefore(u.h,a.h.nextSibling);u=e[++o];p=s[--d]}else if(z(a,v,l)){if(u.p==="slot"||p.p==="slot"){H(a.h.parentNode,false)}J(a,v,l);t.insertBefore(a.h,u.h);a=e[--r];v=s[++i]}else{f=-1;{for(c=o;c<=r;++c){if(e[c]&&e[c].i!==null&&e[c].i===v.i){f=c;break}}}if(f>=0){h=e[f];if(h.p!==v.p){y=F(e&&e[i],n,f,t)}else{J(h,v,l);e[f]=undefined;y=h.h}v=s[++i]}else{y=F(e&&e[i],n,i,t);v=s[++i]}if(y){{G(u.h).insertBefore(y,B(u.h))}}}}if(o>r){I(t,s[d+1]==null?null:s[d+1].h,n,s,i,d)}else if(i>d){V(e,o,r)}};const z=(t,e,n=false)=>{if(t.p===e.p){if(t.p==="slot"){return t.u===e.u}if(!n){return t.i===e.i}return true}return false};const B=t=>t&&t["s-ol"]||t;const G=t=>(t["s-ol"]?t["s-ol"]:t).parentNode;const J=(t,e,n=false)=>{const s=e.h=t.h;const o=t.o;const i=e.o;const c=e.p;const r=e.t;let u;if(r===null){{f=c==="svg"?true:c==="foreignObject"?false:f}{if(c==="slot"&&!l){if(t.u!==e.u){e.h["s-sn"]=e.u||"";q(e.h.parentElement)}}else{D(t,e,f)}}if(o!==null&&i!==null){_(s,o,e,i,n)}else if(i!==null){if(t.t!==null){s.textContent=""}I(s,null,e,i,0,i.length-1)}else if(o!==null){V(o,0,o.length-1)}if(f&&c==="svg"){f=false}}else if(u=s["s-cr"]){u.parentNode.textContent=r}else if(t.t!==r){s.data=r}};const K=t=>{const e=t.childNodes;for(const t of e){if(t.nodeType===1){if(t["s-sr"]){const n=t["s-sn"];t.hidden=false;for(const s of e){if(s!==t){if(s["s-hn"]!==t["s-hn"]||n!==""){if(s.nodeType===1&&(n===s.getAttribute("slot")||n===s["s-sn"])){t.hidden=true;break}}else{if(s.nodeType===1||s.nodeType===3&&s.textContent.trim()!==""){t.hidden=true;break}}}}}K(t)}}};const Q=[];const X=t=>{let e;let n;let s;for(const l of t.childNodes){if(l["s-sr"]&&(e=l["s-cr"])&&e.parentNode){n=e.parentNode.childNodes;const t=l["s-sn"];for(s=n.length-1;s>=0;s--){e=n[s];if(!e["s-cn"]&&!e["s-nr"]&&e["s-hn"]!==l["s-hn"]&&(!e["s-sh"]||e["s-sh"]!==l["s-hn"])){if(Y(e,t)){let n=Q.find((t=>t.j===e));o=true;e["s-sn"]=e["s-sn"]||t;if(n){n.j["s-sh"]=l["s-hn"];n.k=l}else{e["s-sh"]=l["s-hn"];Q.push({k:l,j:e})}if(e["s-sr"]){Q.map((t=>{if(Y(t.j,e["s-sn"])){n=Q.find((t=>t.j===e));if(n&&!t.k){t.k=n.k}}}))}}else if(!Q.some((t=>t.j===e))){Q.push({j:e})}}}}if(l.nodeType===1){X(l)}}};const Y=(t,e)=>{if(t.nodeType===1){if(t.getAttribute("slot")===null&&e===""){return true}if(t.getAttribute("slot")===e){return true}return false}if(t["s-sn"]===e){return true}return e===""};const Z=t=>{{t.l&&t.l.ref&&t.l.ref(null);t.o&&t.o.map(Z)}};const tt=(t,f,c=false)=>{var r,u,a,d;const v=t.$hostElement$;const p=t.m;const y=t.O||g(null,null);const h=j(f)?f:w(null,null,f);s=v.tagName;if(p.C){h.l=h.l||{};p.C.map((([t,e])=>h.l[e]=v[t]))}if(c&&h.l){for(const t of Object.keys(h.l)){if(v.hasAttribute(t)&&!["key","ref","style","class"].includes(t)){h.l[t]=v[t]}}}h.p=null;h.v|=4;t.O=h;h.h=y.h=v.shadowRoot||v;{e=v["s-sc"]}l=(p.v&1)!==0;{n=v["s-cr"];o=false}J(y,h,c);{Ft.v|=1;if(i){X(h.h);for(const t of Q){const e=t.j;if(!e["s-ol"]){const t=Wt.createTextNode("");t["s-nr"]=e;e.parentNode.insertBefore(e["s-ol"]=t,e)}}for(const t of Q){const e=t.j;const n=t.k;if(n){const t=n.parentNode;let s=n.nextSibling;if(s&&s.nodeType===1){let n=(r=e["s-ol"])===null||r===void 0?void 0:r.previousSibling;while(n){let l=(u=n["s-nr"])!==null&&u!==void 0?u:null;if(l&&l["s-sn"]===e["s-sn"]&&t===l.parentNode){l=l.nextSibling;if(!l||!l["s-nr"]){s=l;break}}n=n.previousSibling}}if(!s&&t!==e.parentNode||e.nextSibling!==s){if(e!==s){t.insertBefore(e,s);if(e.nodeType===1){e.hidden=(a=e["s-ih"])!==null&&a!==void 0?a:false}}}}else{if(e.nodeType===1){if(c){e["s-ih"]=(d=e.hidden)!==null&&d!==void 0?d:false}e.hidden=true}}}}if(o){K(h.h)}Ft.v&=~1;Q.length=0}n=undefined};const et=(t,e)=>{if(e&&!t.M&&e["s-p"]){e["s-p"].push(new Promise((e=>t.M=e)))}};const nt=(t,e)=>{{t.v|=16}if(t.v&4){t.v|=512;return}et(t,t.R);const n=()=>st(t,e);return Kt(n)};const st=(t,e)=>{const n=r("scheduleUpdate",t.m.S);const s=t.P;let l;if(e){{t.v|=256;if(t.A){t.A.map((([t,e])=>ut(s,t,e)));t.A=undefined}}{l=ut(s,"componentWillLoad")}}{l=lt(l,(()=>ut(s,"componentWillRender")))}n();return lt(l,(()=>it(t,s,e)))};const lt=(t,e)=>ot(t)?t.then(e):e();const ot=t=>t instanceof Promise||t&&t.then&&typeof t.then==="function";const it=async(t,e,n)=>{var s;const l=t.$hostElement$;const o=r("update",t.m.S);const i=l["s-rc"];if(n){A(t)}const f=r("render",t.m.S);{ft(t,e,l,n)}if(i){i.map((t=>t()));l["s-rc"]=undefined}f();o();{const e=(s=l["s-p"])!==null&&s!==void 0?s:[];const n=()=>ct(t);if(e.length===0){n()}else{Promise.all(e).then(n);t.v|=4;e.length=0}}};const ft=(t,e,n,s)=>{try{e=e.render();{t.v&=~16}{t.v|=2}{{{tt(t,e,s)}}}}catch(e){Tt(e,t.$hostElement$)}return null};const ct=t=>{const e=t.m.S;const n=t.$hostElement$;const s=r("postUpdate",e);const l=t.P;const o=t.R;{ut(l,"componentDidRender")}if(!(t.v&64)){t.v|=64;{at(n)}{ut(l,"componentDidLoad")}s();{t.T(n);if(!o){rt()}}}else{s()}{t.L(n)}{if(t.M){t.M();t.M=undefined}if(t.v&512){Jt((()=>nt(t,false)))}t.v&=~(4|512)}};const rt=e=>{{at(Wt.documentElement)}Jt((()=>M(Ut,"appload",{detail:{namespace:t}})))};const ut=(t,e,n)=>{if(t&&t[e]){try{return t[e](n)}catch(t){Tt(t)}}return undefined};const at=t=>t.classList.add("hydrated");const dt=(t,e)=>Rt(t).N.get(e);const vt=(t,e,n,s)=>{const l=Rt(t);const o=l.$hostElement$;const i=l.N.get(e);const f=l.v;const c=l.P;n=k(n,s.U[e][0]);const r=Number.isNaN(i)&&Number.isNaN(n);const u=n!==i&&!r;if((!(f&8)||i===undefined)&&u){l.N.set(e,n);if(c){if(s.W&&f&128){const t=s.W[e];if(t){t.map((t=>{try{c[t](n,i,e)}catch(t){Tt(t,o)}}))}}if((f&(2|16))===2){nt(l,false)}}}};const pt=(t,e,n)=>{var s;const l=t.prototype;if(e.U){if(t.watchers){e.W=t.watchers}const o=Object.entries(e.U);o.map((([t,[s]])=>{if(s&31||n&2&&s&32){Object.defineProperty(l,t,{get(){return dt(this,t)},set(n){vt(this,t,n,e)},configurable:true,enumerable:true})}else if(n&1&&s&64){Object.defineProperty(l,t,{value(...e){var n;const s=Rt(this);return(n=s===null||s===void 0?void 0:s.D)===null||n===void 0?void 0:n.then((()=>{var n;return(n=s.P)===null||n===void 0?void 0:n[t](...e)}))}})}}));if(n&1){const n=new Map;l.attributeChangedCallback=function(t,s,o){Ft.jmp((()=>{var i;const f=n.get(t);if(this.hasOwnProperty(f)){o=this[f];delete this[f]}else if(l.hasOwnProperty(f)&&typeof this[f]==="number"&&this[f]==o){return}else if(f==null){const n=Rt(this);const l=n===null||n===void 0?void 0:n.v;if(l&&!(l&8)&&l&128&&o!==s){const l=n.P;const f=(i=e.W)===null||i===void 0?void 0:i[t];f===null||f===void 0?void 0:f.forEach((e=>{if(l[e]!=null){l[e].call(l,o,s,t)}}))}return}this[f]=o===null&&typeof this[f]==="boolean"?false:o}))};t.observedAttributes=Array.from(new Set([...Object.keys((s=e.W)!==null&&s!==void 0?s:{}),...o.filter((([t,e])=>e[0]&15)).map((([t,s])=>{var l;const o=s[1]||t;n.set(o,t);if(s[0]&512){(l=e.C)===null||l===void 0?void 0:l.push([t,o])}return o}))]))}}return t};const yt=async(t,e,n,s)=>{let l;if((e.v&32)===0){e.v|=32;{l=Lt(n);if(l.then){const t=u();l=await l;t()}if(!l.isProxied){{n.W=l.watchers}pt(l,n,2);l.isProxied=true}const t=r("createInstance",n.S);{e.v|=8}try{new l(e)}catch(t){Tt(t)}{e.v&=~8}{e.v|=128}t()}if(l.style){let t=l.style;const e=T(n);if(!Nt.has(e)){const s=r("registerStyles",n.S);x(e,t,!!(n.v&1));s()}}}const o=e.R;const i=()=>nt(e,true);if(o&&o["s-rc"]){o["s-rc"].push(i)}else{i()}};const ht=t=>{};const bt=t=>{if((Ft.v&1)===0){const e=Rt(t);const n=e.m;const s=r("connectedCallback",n.S);if(!(e.v&1)){e.v|=1;{if(n.v&(4|8)){$t(t)}}{let n=t;while(n=n.parentNode||n.host){if(n["s-p"]){et(e,e.R=n);break}}}if(n.U){Object.entries(n.U).map((([e,[n]])=>{if(n&31&&t.hasOwnProperty(e)){const n=t[e];delete t[e];t[e]=n}}))}{yt(t,e,n)}}else{St(t,e,n.F);if(e===null||e===void 0?void 0:e.P);else if(e===null||e===void 0?void 0:e.q){e.q.then((()=>ht()))}}s()}};const $t=t=>{const e=t["s-cr"]=Wt.createComment("");e["s-cn"]=true;t.insertBefore(e,t.firstChild)};const mt=t=>{};const wt=async t=>{if((Ft.v&1)===0){const e=Rt(t);{if(e.H){e.H.map((t=>t()));e.H=undefined}}if(e===null||e===void 0?void 0:e.P);else if(e===null||e===void 0?void 0:e.q){e.q.then((()=>mt()))}}};const gt=(t,e={})=>{var n;const s=r();const l=[];const o=e.exclude||[];const i=Ut.customElements;const f=Wt.head;const c=f.querySelector("meta[charset]");const u=Wt.createElement("style");const v=[];let p;let y=true;Object.assign(Ft,e);Ft.I=new URL(e.resourcesUrl||"./",Wt.baseURI).href;let h=false;t.map((t=>{t[1].map((e=>{var n;const s={v:e[0],S:e[1],U:e[2],F:e[3]};if(s.v&4){h=true}{s.U=e[2]}{s.F=e[3]}{s.C=[]}{s.W=(n=e[4])!==null&&n!==void 0?n:{}}const f=s.S;const c=class extends HTMLElement{constructor(t){super(t);t=this;Pt(t,s);if(s.v&1){{{t.attachShadow({mode:"open"})}}}}connectedCallback(){if(p){clearTimeout(p);p=null}if(y){v.push(this)}else{Ft.jmp((()=>bt(this)))}}disconnectedCallback(){Ft.jmp((()=>wt(this)))}componentOnReady(){return Rt(this).q}};s.V=t[0];if(!o.includes(f)&&!i.get(f)){l.push(f);i.define(f,pt(c,s,1))}}))}));if(l.length>0){if(h){u.textContent+=d}{u.textContent+=l+a}if(u.innerHTML.length){u.setAttribute("data-styles","");const t=(n=Ft.$)!==null&&n!==void 0?n:m(Wt);if(t!=null){u.setAttribute("nonce",t)}f.insertBefore(u,c?c.nextSibling:f.firstChild)}}y=false;if(v.length){v.map((t=>t.connectedCallback()))}else{{Ft.jmp((()=>p=setTimeout(rt,30)))}}s()};const St=(t,e,n,s)=>{if(n){n.map((([n,s,l])=>{const o=kt(t,n);const i=jt(e,l);const f=Ot(n);Ft.ael(o,s,i,f);(e.H=e.H||[]).push((()=>Ft.rel(o,s,i,f)))}))}};const jt=(t,e)=>n=>{try{{if(t.v&256){t.P[e](n)}else{(t.A=t.A||[]).push([e,n])}}}catch(t){Tt(t)}};const kt=(t,e)=>{if(e&8)return Ut;if(e&16)return Wt.body;return t};const Ot=t=>qt?{passive:(t&1)!==0,capture:(t&2)!==0}:(t&2)!==0;const Ct=t=>Ft.$=t;const Mt=new WeakMap;const Rt=t=>Mt.get(t);const xt=(t,e)=>Mt.set(e.P=t,e);const Pt=(t,e)=>{const n={v:0,$hostElement$:t,m:e,N:new Map};{n.D=new Promise((t=>n.L=t))}{n.q=new Promise((t=>n.T=t));t["s-p"]=[];t["s-rc"]=[]}St(t,n,e.F);return Mt.set(t,n)};const At=(t,e)=>e in t;const Tt=(t,e)=>(0,console.error)(t,e);const Et=new Map;const Lt=(t,e,n)=>{const s=t.S.replace(/-/g,"_");const l=t.V;const o=Et.get(l);if(o){return o[s]}
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/return import(`./${l}.entry.js${""}`).then((t=>{{Et.set(l,t)}return t[s]}),Tt)};const Nt=new Map;const Ut=typeof window!=="undefined"?window:{};const Wt=Ut.document||{head:{}};const Dt=Ut.HTMLElement||class{};const Ft={v:0,I:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,s)=>t.addEventListener(e,n,s),rel:(t,e,n,s)=>t.removeEventListener(e,n,s),ce:(t,e)=>new CustomEvent(t,e)};const qt=(()=>{let t=false;try{Wt.addEventListener("e",null,Object.defineProperty({},"passive",{get(){t=true}}))}catch(t){}return t})();const Ht=t=>Promise.resolve(t);const It=(()=>{try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replaceSync==="function"}catch(t){}return false})();const Vt=[];const _t=[];const zt=(t,e)=>n=>{t.push(n);if(!c){c=true;if(e&&Ft.v&4){Jt(Gt)}else{Ft.raf(Gt)}}};const Bt=t=>{for(let e=0;e<t.length;e++){try{t[e](performance.now())}catch(t){Tt(t)}}t.length=0};const Gt=()=>{Bt(Vt);{Bt(_t);if(c=Vt.length>0){Ft.raf(Gt)}}};const Jt=t=>Ht().then(t);const Kt=zt(_t,true);export{Dt as H,S as a,gt as b,C as c,O as g,w as h,Ht as p,xt as r,Ct as s};
//# sourceMappingURL=p-e8f90371.js.map