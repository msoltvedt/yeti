const t="yeti";let e;let n;let s;let o=false;let l=false;let i=false;let c=false;let f=false;const r=(t,e="")=>{{return()=>{}}};const u=(t,e)=>{{return()=>{}}};const a="{visibility:hidden}.hydrated{visibility:inherit}";const d="http://www.w3.org/1999/xlink";const h={};const p="http://www.w3.org/2000/svg";const y="http://www.w3.org/1999/xhtml";const b=t=>t!=null;const m=t=>{t=typeof t;return t==="object"||t==="function"};function w(t){var e,n,s;return(s=(n=(e=t.head)===null||e===void 0?void 0:e.querySelector('meta[name="csp-nonce"]'))===null||n===void 0?void 0:n.getAttribute("content"))!==null&&s!==void 0?s:undefined}const $=(t,e,...n)=>{let s=null;let o=null;let l=null;let i=false;let c=false;const f=[];const r=e=>{for(let n=0;n<e.length;n++){s=e[n];if(Array.isArray(s)){r(s)}else if(s!=null&&typeof s!=="boolean"){if(i=typeof t!=="function"&&!m(s)){s=String(s)}if(i&&c){f[f.length-1].t+=s}else{f.push(i?v(null,s):s)}c=i}}};r(n);if(e){if(e.key){o=e.key}if(e.name){l=e.name}{const t=e.className||e.class;if(t){e.class=typeof t!=="object"?t:Object.keys(t).filter((e=>t[e])).join(" ")}}}const u=v(t,null);u.o=e;if(f.length>0){u.l=f}{u.i=o}{u.u=l}return u};const v=(t,e)=>{const n={h:0,p:t,t:e,m:null,l:null};{n.o=null}{n.i=null}{n.u=null}return n};const g={};const j=t=>t&&t.p===g;const S=(t,e)=>{if(t!=null&&!m(t)){if(e&4){return t==="false"?false:t===""||!!t}if(e&2){return parseFloat(t)}if(e&1){return String(t)}return t}return t};const k=t=>Nt(t).$hostElement$;const O=(t,e,n)=>{const s=k(t);return{emit:t=>C(s,e,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:t})}};const C=(t,e,n)=>{const s=Ht.ce(e,n);t.dispatchEvent(s);return s};const M=new WeakMap;const x=(t,e,n)=>{let s=Wt.get(t);if(_t&&n){s=s||new CSSStyleSheet;if(typeof s==="string"){s=e}else{s.replaceSync(e)}}else{s=e}Wt.set(t,s)};const R=(t,e,n)=>{var s;const o=P(e);const l=Wt.get(o);t=t.nodeType===11?t:Ft;if(l){if(typeof l==="string"){t=t.head||t;let e=M.get(t);let n;if(!e){M.set(t,e=new Set)}if(!e.has(o)){{n=Ft.createElement("style");n.innerHTML=l;const e=(s=Ht.$)!==null&&s!==void 0?s:w(Ft);if(e!=null){n.setAttribute("nonce",e)}t.insertBefore(n,t.querySelector("link"))}if(e){e.add(o)}}}else if(!t.adoptedStyleSheets.includes(l)){t.adoptedStyleSheets=[...t.adoptedStyleSheets,l]}}return o};const N=t=>{const e=t.v;const n=t.$hostElement$;const s=e.h;const o=r("attachStyles",e.j);const l=R(n.shadowRoot?n.shadowRoot:n.getRootNode(),e);if(s&10){n["s-sc"]=l;n.classList.add(l+"-h")}o()};const P=(t,e)=>"sc-"+t.j;const T=(t,e,n,s,o,l)=>{if(n!==s){let i=At(t,e);let c=e.toLowerCase();if(e==="class"){const e=t.classList;const o=E(n);const l=E(s);e.remove(...o.filter((t=>t&&!l.includes(t))));e.add(...l.filter((t=>t&&!o.includes(t))))}else if(e==="style"){{for(const e in n){if(!s||s[e]==null){if(e.includes("-")){t.style.removeProperty(e)}else{t.style[e]=""}}}}for(const e in s){if(!n||s[e]!==n[e]){if(e.includes("-")){t.style.setProperty(e,s[e])}else{t.style[e]=s[e]}}}}else if(e==="key");else if(e==="ref"){if(s){s(t)}}else if(!i&&e[0]==="o"&&e[1]==="n"){if(e[2]==="-"){e=e.slice(3)}else if(At(Dt,c)){e=c.slice(2)}else{e=c[2]+e.slice(3)}if(n){Ht.rel(t,e,n,false)}if(s){Ht.ael(t,e,s,false)}}else{const f=m(s);if((i||f&&s!==null)&&!o){try{if(!t.tagName.includes("-")){const o=s==null?"":s;if(e==="list"){i=false}else if(n==null||t[e]!=o){t[e]=o}}else{t[e]=s}}catch(t){}}let r=false;{if(c!==(c=c.replace(/^xlink\:?/,""))){e=c;r=true}}if(s==null||s===false){if(s!==false||t.getAttribute(e)===""){if(r){t.removeAttributeNS(d,e)}else{t.removeAttribute(e)}}}else if((!i||l&4||o)&&!f){s=s===true?"":s;if(r){t.setAttributeNS(d,e,s)}else{t.setAttribute(e,s)}}}}};const A=/\s/;const E=t=>!t?[]:t.split(A);const L=(t,e,n,s)=>{const o=e.m.nodeType===11&&e.m.host?e.m.host:e.m;const l=t&&t.o||h;const i=e.o||h;{for(s in l){if(!(s in i)){T(o,s,l[s],undefined,n,e.h)}}}for(s in i){T(o,s,l[s],i[s],n,e.h)}};const U=(t,l,f,r)=>{const u=l.l[f];let a=0;let d;let h;let m;if(!o){i=true;if(u.p==="slot"){if(e){r.classList.add(e+"-s")}u.h|=u.l?2:1}}if(u.t!==null){d=u.m=Ft.createTextNode(u.t)}else if(u.h&1){d=u.m=Ft.createTextNode("")}else{if(!c){c=u.p==="svg"}d=u.m=Ft.createElementNS(c?p:y,u.h&2?"slot-fb":u.p);if(c&&u.p==="foreignObject"){c=false}{L(null,u,c)}if(b(e)&&d["s-si"]!==e){d.classList.add(d["s-si"]=e)}if(u.l){for(a=0;a<u.l.length;++a){h=U(t,u,a,d);if(h){d.appendChild(h)}}}{if(u.p==="svg"){c=false}else if(d.tagName==="foreignObject"){c=true}}}{d["s-hn"]=s;if(u.h&(2|1)){d["s-sr"]=true;d["s-cr"]=n;d["s-sn"]=u.u||"";m=t&&t.l&&t.l[f];if(m&&m.p===u.p&&t.m){W(t.m,false)}}}return d};const W=(t,e)=>{Ht.h|=1;const n=t.childNodes;for(let t=n.length-1;t>=0;t--){const o=n[t];if(o["s-hn"]!==s&&o["s-ol"]){V(o).insertBefore(o,I(o));o["s-ol"].remove();o["s-ol"]=undefined;i=true}if(e){W(o,e)}}Ht.h&=~1};const D=(t,e,n,o,l,i)=>{let c=t["s-cr"]&&t["s-cr"].parentNode||t;let f;if(c.shadowRoot&&c.tagName===s){c=c.shadowRoot}for(;l<=i;++l){if(o[l]){f=U(null,n,l,t);if(f){o[l].m=f;c.insertBefore(f,I(e))}}}};const F=(t,e,n)=>{for(let s=e;s<=n;++s){const e=t[s];if(e){const t=e.m;K(e);if(t){{l=true;if(t["s-ol"]){t["s-ol"].remove()}else{W(t,true)}}t.remove()}}}};const q=(t,e,n,s)=>{let o=0;let l=0;let i=0;let c=0;let f=e.length-1;let r=e[0];let u=e[f];let a=s.length-1;let d=s[0];let h=s[a];let p;let y;while(o<=f&&l<=a){if(r==null){r=e[++o]}else if(u==null){u=e[--f]}else if(d==null){d=s[++l]}else if(h==null){h=s[--a]}else if(H(r,d)){_(r,d);r=e[++o];d=s[++l]}else if(H(u,h)){_(u,h);u=e[--f];h=s[--a]}else if(H(r,h)){if(r.p==="slot"||h.p==="slot"){W(r.m.parentNode,false)}_(r,h);t.insertBefore(r.m,u.m.nextSibling);r=e[++o];h=s[--a]}else if(H(u,d)){if(r.p==="slot"||h.p==="slot"){W(u.m.parentNode,false)}_(u,d);t.insertBefore(u.m,r.m);u=e[--f];d=s[++l]}else{i=-1;{for(c=o;c<=f;++c){if(e[c]&&e[c].i!==null&&e[c].i===d.i){i=c;break}}}if(i>=0){y=e[i];if(y.p!==d.p){p=U(e&&e[l],n,i,t)}else{_(y,d);e[i]=undefined;p=y.m}d=s[++l]}else{p=U(e&&e[l],n,l,t);d=s[++l]}if(p){{V(r.m).insertBefore(p,I(r.m))}}}}if(o>f){D(t,s[a+1]==null?null:s[a+1].m,n,s,l,a)}else if(l>a){F(e,o,f)}};const H=(t,e)=>{if(t.p===e.p){if(t.p==="slot"){return t.u===e.u}{return t.i===e.i}}return false};const I=t=>t&&t["s-ol"]||t;const V=t=>(t["s-ol"]?t["s-ol"]:t).parentNode;const _=(t,e)=>{const n=e.m=t.m;const s=t.l;const o=e.l;const l=e.p;const i=e.t;let f;if(i===null){{c=l==="svg"?true:l==="foreignObject"?false:c}{if(l==="slot");else{L(t,e,c)}}if(s!==null&&o!==null){q(n,s,e,o)}else if(o!==null){if(t.t!==null){n.textContent=""}D(n,null,e,o,0,o.length-1)}else if(s!==null){F(s,0,s.length-1)}if(c&&l==="svg"){c=false}}else if(f=n["s-cr"]){f.parentNode.textContent=i}else if(t.t!==i){n.data=i}};const z=t=>{const e=t.childNodes;for(const t of e){if(t.nodeType===1){if(t["s-sr"]){const n=t["s-sn"];t.hidden=false;for(const s of e){if(s["s-hn"]!==t["s-hn"]||n!==""){if(s.nodeType===1&&n===s.getAttribute("slot")){t.hidden=true;break}}else{if(s.nodeType===1||s.nodeType===3&&s.textContent.trim()!==""){t.hidden=true;break}}}}z(t)}}};const B=[];const G=t=>{let e;let n;let s;for(const o of t.childNodes){if(o["s-sr"]&&(e=o["s-cr"])&&e.parentNode){n=e.parentNode.childNodes;const t=o["s-sn"];for(s=n.length-1;s>=0;s--){e=n[s];if(!e["s-cn"]&&!e["s-nr"]&&e["s-hn"]!==o["s-hn"]){if(J(e,t)){let n=B.find((t=>t.S===e));l=true;e["s-sn"]=e["s-sn"]||t;if(n){n.k=o}else{B.push({k:o,S:e})}if(e["s-sr"]){B.map((t=>{if(J(t.S,e["s-sn"])){n=B.find((t=>t.S===e));if(n&&!t.k){t.k=n.k}}}))}}else if(!B.some((t=>t.S===e))){B.push({S:e})}}}}if(o.nodeType===1){G(o)}}};const J=(t,e)=>{if(t.nodeType===1){if(t.getAttribute("slot")===null&&e===""){return true}if(t.getAttribute("slot")===e){return true}return false}if(t["s-sn"]===e){return true}return e===""};const K=t=>{{t.o&&t.o.ref&&t.o.ref(null);t.l&&t.l.map(K)}};const Q=(t,c,f=false)=>{const r=t.$hostElement$;const u=t.v;const a=t.O||v(null,null);const d=j(c)?c:$(null,null,c);s=r.tagName;if(u.C){d.o=d.o||{};u.C.map((([t,e])=>d.o[e]=r[t]))}if(f&&d.o){for(const t of Object.keys(d.o)){if(r.hasAttribute(t)&&!["key","ref","style","class"].includes(t)){d.o[t]=r[t]}}}d.p=null;d.h|=4;t.O=d;d.m=a.m=r.shadowRoot||r;{e=r["s-sc"]}{n=r["s-cr"];o=(u.h&1)!==0;l=false}_(a,d);{Ht.h|=1;if(i){G(d.m);let t;let e;let n;let s;let o;let l;let i=0;for(;i<B.length;i++){t=B[i];e=t.S;if(!e["s-ol"]){n=Ft.createTextNode("");n["s-nr"]=e;e.parentNode.insertBefore(e["s-ol"]=n,e)}}for(i=0;i<B.length;i++){t=B[i];e=t.S;if(t.k){s=t.k.parentNode;o=t.k.nextSibling;n=e["s-ol"];while(n=n.previousSibling){l=n["s-nr"];if(l&&l["s-sn"]===e["s-sn"]&&s===l.parentNode){l=l.nextSibling;if(!l||!l["s-nr"]){o=l;break}}}if(!o&&s!==e.parentNode||e.nextSibling!==o){if(e!==o){if(!e["s-hn"]&&e["s-ol"]){e["s-hn"]=e["s-ol"].parentNode.nodeName}s.insertBefore(e,o)}}}else{if(e.nodeType===1){e.hidden=true}}}}if(l){z(d.m)}Ht.h&=~1;B.length=0}};const X=(t,e)=>{if(e&&!t.M&&e["s-p"]){e["s-p"].push(new Promise((e=>t.M=e)))}};const Y=(t,e)=>{{t.h|=16}if(t.h&4){t.h|=512;return}X(t,t.R);const n=()=>Z(t,e);return Xt(n)};const Z=(t,e)=>{const n=r("scheduleUpdate",t.v.j);const s=t.N;let o;if(e){{t.h|=256;if(t.P){t.P.map((([t,e])=>it(s,t,e)));t.P=undefined}}{o=it(s,"componentWillLoad")}}{o=tt(o,(()=>it(s,"componentWillRender")))}n();return tt(o,(()=>nt(t,s,e)))};const tt=(t,e)=>et(t)?t.then(e):e();const et=t=>t instanceof Promise||t&&t.then&&typeof t.then==="function";const nt=async(t,e,n)=>{var s;const o=t.$hostElement$;const l=r("update",t.v.j);const i=o["s-rc"];if(n){N(t)}const c=r("render",t.v.j);{st(t,e,o,n)}if(i){i.map((t=>t()));o["s-rc"]=undefined}c();l();{const e=(s=o["s-p"])!==null&&s!==void 0?s:[];const n=()=>ot(t);if(e.length===0){n()}else{Promise.all(e).then(n);t.h|=4;e.length=0}}};const st=(t,e,n,s)=>{try{e=e.render();{t.h&=~16}{t.h|=2}{{{Q(t,e,s)}}}}catch(e){Et(e,t.$hostElement$)}return null};const ot=t=>{const e=t.v.j;const n=t.$hostElement$;const s=r("postUpdate",e);const o=t.N;const l=t.R;{it(o,"componentDidRender")}if(!(t.h&64)){t.h|=64;{ct(n)}{it(o,"componentDidLoad")}s();{t.T(n);if(!l){lt()}}}else{s()}{t.A(n)}{if(t.M){t.M();t.M=undefined}if(t.h&512){Qt((()=>Y(t,false)))}t.h&=~(4|512)}};const lt=e=>{{ct(Ft.documentElement)}Qt((()=>C(Dt,"appload",{detail:{namespace:t}})))};const it=(t,e,n)=>{if(t&&t[e]){try{return t[e](n)}catch(t){Et(t)}}return undefined};const ct=t=>t.classList.add("hydrated");const ft=(t,e)=>Nt(t).L.get(e);const rt=(t,e,n,s)=>{const o=Nt(t);const l=o.$hostElement$;const i=o.L.get(e);const c=o.h;const f=o.N;n=S(n,s.U[e][0]);const r=Number.isNaN(i)&&Number.isNaN(n);const u=n!==i&&!r;if((!(c&8)||i===undefined)&&u){o.L.set(e,n);if(f){if(s.W&&c&128){const t=s.W[e];if(t){t.map((t=>{try{f[t](n,i,e)}catch(t){Et(t,l)}}))}}if((c&(2|16))===2){Y(o,false)}}}};const ut=(t,e,n)=>{var s;if(e.U){if(t.watchers){e.W=t.watchers}const o=Object.entries(e.U);const l=t.prototype;o.map((([t,[s]])=>{if(s&31||n&2&&s&32){Object.defineProperty(l,t,{get(){return ft(this,t)},set(n){rt(this,t,n,e)},configurable:true,enumerable:true})}else if(n&1&&s&64){Object.defineProperty(l,t,{value(...e){const n=Nt(this);return n.D.then((()=>n.N[t](...e)))}})}}));if(n&1){const n=new Map;l.attributeChangedCallback=function(t,s,o){Ht.jmp((()=>{const i=n.get(t);if(this.hasOwnProperty(i)){o=this[i];delete this[i]}else if(l.hasOwnProperty(i)&&typeof this[i]==="number"&&this[i]==o){return}else if(i==null){const n=Nt(this);const l=n===null||n===void 0?void 0:n.h;if(!(l&8)&&l&128&&o!==s){const l=n.N;const i=e.W[t];i===null||i===void 0?void 0:i.forEach((e=>{if(l[e]!=null){l[e].call(l,o,s,t)}}))}return}this[i]=o===null&&typeof this[i]==="boolean"?false:o}))};t.observedAttributes=Array.from(new Set([...Object.keys((s=e.W)!==null&&s!==void 0?s:{}),...o.filter((([t,e])=>e[0]&15)).map((([t,s])=>{const o=s[1]||t;n.set(o,t);if(s[0]&512){e.C.push([t,o])}return o}))]))}}return t};const at=async(t,e,n,s)=>{let o;if((e.h&32)===0){e.h|=32;{o=Ut(n);if(o.then){const t=u();o=await o;t()}if(!o.isProxied){{n.W=o.watchers}ut(o,n,2);o.isProxied=true}const t=r("createInstance",n.j);{e.h|=8}try{new o(e)}catch(t){Et(t)}{e.h&=~8}{e.h|=128}t()}if(o.style){let t=o.style;const e=P(n);if(!Wt.has(e)){const s=r("registerStyles",n.j);x(e,t,!!(n.h&1));s()}}}const l=e.R;const i=()=>Y(e,true);if(l&&l["s-rc"]){l["s-rc"].push(i)}else{i()}};const dt=t=>{};const ht=t=>{if((Ht.h&1)===0){const e=Nt(t);const n=e.v;const s=r("connectedCallback",n.j);if(!(e.h&1)){e.h|=1;{if(n.h&(4|8)){pt(t)}}{let n=t;while(n=n.parentNode||n.host){if(n["s-p"]){X(e,e.R=n);break}}}if(n.U){Object.entries(n.U).map((([e,[n]])=>{if(n&31&&t.hasOwnProperty(e)){const n=t[e];delete t[e];t[e]=n}}))}{at(t,e,n)}}else{kt(t,e,n.F);if(e===null||e===void 0?void 0:e.N);else if(e===null||e===void 0?void 0:e.q){e.q.then((()=>dt()))}}s()}};const pt=t=>{const e=t["s-cr"]=Ft.createComment("");e["s-cn"]=true;t.insertBefore(e,t.firstChild)};const yt=t=>{};const bt=async t=>{if((Ht.h&1)===0){const e=Nt(t);{if(e.H){e.H.map((t=>t()));e.H=undefined}}if(e===null||e===void 0?void 0:e.N);else if(e===null||e===void 0?void 0:e.q){e.q.then((()=>yt()))}}};const mt=t=>{const e=t.cloneNode;t.cloneNode=function(t){const n=this;const s=n.shadowRoot&&It;const o=e.call(n,s?t:false);if(!s&&t){let t=0;let e,s;const l=["s-id","s-cr","s-lr","s-rc","s-sc","s-p","s-cn","s-sr","s-sn","s-hn","s-ol","s-nr","s-si"];for(;t<n.childNodes.length;t++){e=n.childNodes[t]["s-nr"];s=l.every((e=>!n.childNodes[t][e]));if(e){if(o.__appendChild){o.__appendChild(e.cloneNode(true))}else{o.appendChild(e.cloneNode(true))}}if(s){o.appendChild(n.childNodes[t].cloneNode(true))}}}return o}};const wt=t=>{t.__appendChild=t.appendChild;t.appendChild=function(t){const e=t["s-sn"]=vt(t);const n=gt(this.childNodes,e);if(n){const s=jt(n,e);const o=s[s.length-1];return o.parentNode.insertBefore(t,o.nextSibling)}return this.__appendChild(t)}};const $t=(t,e)=>{class n extends Array{item(t){return this[t]}}if(e.h&8){const e=t.__lookupGetter__("childNodes");Object.defineProperty(t,"children",{get(){return this.childNodes.map((t=>t.nodeType===1))}});Object.defineProperty(t,"childElementCount",{get(){return t.children.length}});Object.defineProperty(t,"childNodes",{get(){const t=e.call(this);if((Ht.h&1)===0&&Nt(this).h&2){const e=new n;for(let n=0;n<t.length;n++){const s=t[n]["s-nr"];if(s){e.push(s)}}return e}return n.from(t)}})}};const vt=t=>t["s-sn"]||t.nodeType===1&&t.getAttribute("slot")||"";const gt=(t,e)=>{let n=0;let s;for(;n<t.length;n++){s=t[n];if(s["s-sr"]&&s["s-sn"]===e){return s}s=gt(s.childNodes,e);if(s){return s}}return null};const jt=(t,e)=>{const n=[t];while((t=t.nextSibling)&&t["s-sn"]===e){n.push(t)}return n};const St=(t,e={})=>{var n;const s=r();const o=[];const l=e.exclude||[];const i=Dt.customElements;const c=Ft.head;const f=c.querySelector("meta[charset]");const u=Ft.createElement("style");const d=[];let h;let p=true;Object.assign(Ht,e);Ht.I=new URL(e.resourcesUrl||"./",Ft.baseURI).href;t.map((t=>{t[1].map((e=>{var n;const s={h:e[0],j:e[1],U:e[2],F:e[3]};{s.U=e[2]}{s.F=e[3]}{s.C=[]}{s.W=(n=e[4])!==null&&n!==void 0?n:{}}const c=s.j;const f=class extends HTMLElement{constructor(t){super(t);t=this;Tt(t,s);if(s.h&1){{{t.attachShadow({mode:"open"})}}}}connectedCallback(){if(h){clearTimeout(h);h=null}if(p){d.push(this)}else{Ht.jmp((()=>ht(this)))}}disconnectedCallback(){Ht.jmp((()=>bt(this)))}componentOnReady(){return Nt(this).q}};{{$t(f.prototype,s)}{mt(f.prototype)}{wt(f.prototype)}}s.V=t[0];if(!l.includes(c)&&!i.get(c)){o.push(c);i.define(c,ut(f,s,1))}}))}));{u.innerHTML=o+a;u.setAttribute("data-styles","");const t=(n=Ht.$)!==null&&n!==void 0?n:w(Ft);if(t!=null){u.setAttribute("nonce",t)}c.insertBefore(u,f?f.nextSibling:c.firstChild)}p=false;if(d.length){d.map((t=>t.connectedCallback()))}else{{Ht.jmp((()=>h=setTimeout(lt,30)))}}s()};const kt=(t,e,n,s)=>{if(n){n.map((([n,s,o])=>{const l=Ct(t,n);const i=Ot(e,o);const c=Mt(n);Ht.ael(l,s,i,c);(e.H=e.H||[]).push((()=>Ht.rel(l,s,i,c)))}))}};const Ot=(t,e)=>n=>{try{{if(t.h&256){t.N[e](n)}else{(t.P=t.P||[]).push([e,n])}}}catch(t){Et(t)}};const Ct=(t,e)=>{if(e&8)return Dt;if(e&16)return Ft.body;return t};const Mt=t=>(t&2)!==0;const xt=t=>Ht.$=t;const Rt=new WeakMap;const Nt=t=>Rt.get(t);const Pt=(t,e)=>Rt.set(e.N=t,e);const Tt=(t,e)=>{const n={h:0,$hostElement$:t,v:e,L:new Map};{n.D=new Promise((t=>n.A=t))}{n.q=new Promise((t=>n.T=t));t["s-p"]=[];t["s-rc"]=[]}kt(t,n,e.F);return Rt.set(t,n)};const At=(t,e)=>e in t;const Et=(t,e)=>(0,console.error)(t,e);const Lt=new Map;const Ut=(t,e,n)=>{const s=t.j.replace(/-/g,"_");const o=t.V;const l=Lt.get(o);if(l){return l[s]}
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/return import(`./${o}.entry.js${""}`).then((t=>{{Lt.set(o,t)}return t[s]}),Et)};const Wt=new Map;const Dt=typeof window!=="undefined"?window:{};const Ft=Dt.document||{head:{}};const qt=Dt.HTMLElement||class{};const Ht={h:0,I:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,s)=>t.addEventListener(e,n,s),rel:(t,e,n,s)=>t.removeEventListener(e,n,s),ce:(t,e)=>new CustomEvent(t,e)};const It=true;const Vt=t=>Promise.resolve(t);const _t=(()=>{try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replaceSync==="function"}catch(t){}return false})();const zt=[];const Bt=[];const Gt=(t,e)=>n=>{t.push(n);if(!f){f=true;if(e&&Ht.h&4){Qt(Kt)}else{Ht.raf(Kt)}}};const Jt=t=>{for(let e=0;e<t.length;e++){try{t[e](performance.now())}catch(t){Et(t)}}t.length=0};const Kt=()=>{Jt(zt);{Jt(Bt);if(f=zt.length>0){Ht.raf(Kt)}}};const Qt=t=>Vt().then(t);const Xt=Gt(Bt,true);export{qt as H,g as a,St as b,O as c,k as g,$ as h,Vt as p,Pt as r,xt as s};
//# sourceMappingURL=p-e27fd7b3.js.map