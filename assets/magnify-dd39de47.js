function y(e){return overlay=document.createElement("div"),overlay.setAttribute("class","image-magnify-full-size"),overlay.setAttribute("aria-hidden","true"),overlay.style.backgroundImage=`url('${e.src}')`,e.parentElement.insertBefore(overlay,e),overlay}function c(e,o,t){const n=e.height/e.width,r=o.target.getBoundingClientRect(),l=o.clientX-r.left,i=o.clientY-r.top,a=`${l/(overlay.clientWidth/100)}%`,s=`${i/(overlay.clientWidth*n/100)}%`;overlay.style.backgroundPosition=`${a} ${s}`,overlay.style.backgroundSize=`${e.width*t}px`}function u(e,o){const t=y(e);t.onclick=()=>t.remove(),t.onmousemove=n=>c(e,n,o),t.onmouseleave=()=>t.remove()}function v(e){document.querySelectorAll(".image-magnify-hover").forEach(t=>{t.onclick=n=>{u(t,e),c(t,n,e)}})}v(2);
