import React, {useEffect,useRef,useState} from 'react';

export default function HangingTag({ready}){
 const tag=useRef(null),[arrived,setArrived]=useState(false);
 useEffect(()=>{
  if(!ready)return;
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){setArrived(true);return}
  // Observe the photograph, so the hidden tag's starting position cannot trigger it early.
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){setArrived(true);observer.disconnect()}
  },{threshold:.4});
  observer.observe(tag.current.parentElement);
  return()=>observer.disconnect();
 },[ready]);
 return <div ref={tag} className={`about-label${arrived?' tag-arrived':''}`}>Collect moments.<br/><em>Not just miles.</em><span>THE FLYINGLYTE WAY</span></div>;
}
