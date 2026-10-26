import {useEffect} from 'react';

// Keep native touch scrolling and smooth mouse-wheel movement across every page.
export default function useSmoothScroll(page, blocked){
 useEffect(()=>{
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0, target=window.scrollY, lastTime=0;
  const stop=()=>{cancelAnimationFrame(frame);frame=0;lastTime=0;target=window.scrollY};
  const maximum=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
  const animate=time=>{
   const elapsed=lastTime?Math.min(time-lastTime,64):16;
   lastTime=time;
   target=Math.max(0,Math.min(target,maximum()));
   const next=window.scrollY+(target-window.scrollY)*(1-Math.exp(-elapsed/85));
   window.scrollTo({top:Math.abs(target-next)<.75?target:next,behavior:'instant'});
   if(Math.abs(target-window.scrollY)>.75)frame=requestAnimationFrame(animate);
   else{frame=0;lastTime=0}
  };
  const wheel=event=>{
   if(blocked||preference.matches||event.defaultPrevented||event.ctrlKey||event.metaKey||Math.abs(event.deltaX)>Math.abs(event.deltaY))return;
   if(getComputedStyle(document.body).overflow==='hidden'||document.querySelector('dialog[open]'))return;
   // Let forms, dialogs and nested scroll areas handle their own wheel events.
   for(let element=event.target instanceof Element?event.target:null;element&&element!==document.body&&element!==document.documentElement;element=element.parentElement){
    if(element.matches('input,textarea,select,[contenteditable="true"]'))return;
    if(/auto|scroll/.test(getComputedStyle(element).overflowY)&&element.scrollHeight>element.clientHeight)return;
   }
   const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?window.innerHeight:1);
   if(!delta||!event.cancelable)return;
   if(!frame)target=window.scrollY;
   target=Math.max(0,Math.min(target+delta,maximum()));
   if(!frame&&target===window.scrollY)return;
   event.preventDefault();
   if(!frame)frame=requestAnimationFrame(animate);
  };
  window.addEventListener('wheel',wheel,{passive:false});
  window.addEventListener('pointerdown',stop);
  window.addEventListener('keydown',stop);
  window.addEventListener('touchstart',stop,{passive:true});
  window.addEventListener('resize',stop);
  preference.addEventListener('change',stop);
  return()=>{
   stop();
   window.removeEventListener('wheel',wheel);
   window.removeEventListener('pointerdown',stop);
   window.removeEventListener('keydown',stop);
   window.removeEventListener('touchstart',stop);
   window.removeEventListener('resize',stop);
   preference.removeEventListener('change',stop);
  };
 },[page,blocked]);
}
