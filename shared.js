/* Builds the shared scene, header, footer and shoji page transition */
(function(){
const here=document.body.dataset.page||"";
const nav=[["index.html","Home"],["events.html","Events"],["register.html","Register"],["help.html","Help"]];
let p="",cx=250,y=400;p+=`<rect x="${cx-46}" y="${y-14}" width="92" height="14"/>`;y-=14;
[[58,34],[52,32],[46,30],[40,28],[34,26]].forEach(([w,h])=>{p+=`<rect x="${cx-w*.55}" y="${y-h}" width="${w*1.1}" height="${h}"/>`;const R=w+22;p+=`<path d="M${cx-R} ${y-h+9} Q${cx-R+14} ${y-h+5} ${cx-R+34} ${y-h-8} L${cx+R-34} ${y-h-8} Q${cx+R-14} ${y-h+5} ${cx+R} ${y-h+9} Q${cx} ${y-h+2} ${cx-R} ${y-h+9}Z"/>`;y-=h+6});
p+=`<rect x="${cx-1.5}" y="${y-44}" width="3" height="46"/>`;
const leaf=(l,x,d,w)=>`<svg class="leaf" style="left:${l}%;--x:${x}px;--d:${d}s;--w:-${w}s" viewBox="0 0 10 10"><path d="M5 0l1.2 2.6L9 2 7.6 4.6 10 6 7 6.4 6 10 5 7.6 4 10 3 6.4 0 6l2.4-1.4L1 2l2.8.6z"/></svg>`;
document.body.insertAdjacentHTML("afterbegin",`
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="4"/><feDisplacementMap in="SourceGraphic" scale="9"/></filter></svg>
<div class="scene" aria-hidden="true"><div class="moon"></div>
<svg class="land" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a252c" stop-opacity="0"/><stop offset=".6" stop-color="#1d2a31" stop-opacity=".75"/><stop offset="1" stop-color="#1d2a31" stop-opacity="0"/></linearGradient></defs>
<path d="M0 330 Q150 250 320 300 T640 285 T960 290 T1200 270 V400 H0Z" fill="#101a20"/><g fill="#0a0e11">${p}</g>
<rect class="fog" x="-100" y="240" width="1400" height="130" fill="url(#fg)"/><path d="M0 360 Q200 340 420 356 T900 350 T1200 352 V400 H0Z" fill="#06090b"/></svg>
${leaf(12,60,19,4)}${leaf(34,-80,26,12)}${leaf(58,90,22,8)}${leaf(77,-50,30,20)}${leaf(90,-100,24,1)}</div>
<div class="vignette"></div><div class="grain"></div><div class="shoji shut" id="shoji" aria-hidden="true"><div class="l"></div><div class="r"></div></div>`);
const app=document.querySelector(".app");
app.insertAdjacentHTML("afterbegin",`<header class="top"><a class="brand" href="index.html" aria-label="XENESIS 4.0 home"><img src="assets/xenesis-logo.png" alt="" width="750" height="603" decoding="async"><span>Xenesis 4.0<small>祭</small></span></a><nav class="nav" aria-label="Main">${nav.map(([h,t])=>`<a href="${h}"${h.startsWith(here)&&here?' aria-current="page"':""}>${t}</a>`).join("")}</nav></header>`);
app.insertAdjacentHTML("beforeend",`<footer class="foot">Designed with ❤️ by CSE, GCE KJR</footer>`);
if(here!=="help.html")document.body.insertAdjacentHTML("beforeend",`<a class="helpfab" href="help.html" data-tip="Help" aria-label="Help desk and live chat" data-cursor><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12z"/><path d="M9.5 10.5h5M9.5 13.5h3"/></svg></a>`);
const s=document.getElementById("shoji");
requestAnimationFrame(()=>requestAnimationFrame(()=>s.classList.remove("shut")));
addEventListener("pageshow",e=>{if(e.persisted)s.classList.remove("shut")});
document.addEventListener("click",e=>{const a=e.target.closest("a[href]");
 if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey||a.origin!==location.origin||a.getAttribute("href").startsWith("#")||a.hasAttribute("aria-disabled"))return;
 if(a.pathname===location.pathname&&a.search===location.search)return;
 e.preventDefault();s.classList.add("shut");setTimeout(()=>location.href=a.href,440)});
})();
