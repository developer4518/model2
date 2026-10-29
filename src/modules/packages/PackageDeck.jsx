import React,{useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ChevronLeft,ChevronRight,MapPin,CalendarDays,Check} from 'lucide-react';
import './packages-page.css';

export default function PackageDeck({items,resetKey,enquire,onZoom}){
 const swipe=useRef(null),swiped=useRef(false),slideTimer=useRef(null);
 const [activeCard,setActiveCard]=useState(0);
 const [dragX,setDragX]=useState(0),[slide,setSlide]=useState(null);
 const [mobile,setMobile]=useState(()=>matchMedia('(max-width: 760px)').matches);
 useEffect(()=>{const media=matchMedia('(max-width: 760px)');const update=()=>setMobile(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{clearTimeout(slideTimer.current);setActiveCard(0);setDragX(0);setSlide(null);swipe.current=null;swiped.current=false},[resetKey,mobile]);
 useEffect(()=>()=>clearTimeout(slideTimer.current),[]);
 function goToCard(index){
  if(!items.length||slide)return;
  const next=(index+items.length)%items.length;
  if(next===activeCard){setDragX(0);return}
  if(!mobile){setActiveCard(next);return}
  setSlide({direction:index<activeCard?1:-1});
  slideTimer.current=setTimeout(()=>{setActiveCard(next);setDragX(0);setSlide(null);swiped.current=false},matchMedia('(prefers-reduced-motion: reduce)').matches?0:280);
 }
 function startSwipe(event){if(!mobile||!event.isPrimary||slide||event.button!==0)return;swiped.current=false;swipe.current={x:event.clientX,y:event.clientY,horizontal:false}}
 function moveSwipe(event){
  const start=swipe.current;if(!start)return;
  const dx=event.clientX-start.x,dy=event.clientY-start.y;
  if(!start.horizontal&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)){start.horizontal=true;swiped.current=true;event.currentTarget.setPointerCapture(event.pointerId)}
  if(start.horizontal)setDragX(dx);
 }
 function cancelSwipe(){swipe.current=null;setDragX(0)}
 function endSwipe(event){
  const start=swipe.current;swipe.current=null;
  if(!mobile||!start)return;
  const dx=event.clientX-start.x,dy=event.clientY-start.y;
  if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){swiped.current=true;goToCard(activeCard+(dx<0?1:-1))}
  else setDragX(0);
 }
 function cardOffset(index){const offset=(index-activeCard+items.length)%items.length;return offset>items.length/2?offset-items.length:offset}
 return <>
 <div className={"pkg-grid package-deck " + (dragX&&!slide?"pkg-dragging":"")} role="group" aria-label="Holiday packages" tabIndex={mobile&&items.length>1?0:undefined} style={{'--drag-x':`${dragX}px`,'--slide-direction':slide?.direction||0}} onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={endSwipe} onPointerCancel={cancelSwipe} onClickCapture={e=>{if(swiped.current||slide){e.preventDefault();e.stopPropagation();swiped.current=false}}} onKeyDown={e=>{if(mobile&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();goToCard(activeCard+(e.key==='ArrowRight'?1:-1))}}}>{items.map((p,i)=><article className={"pkg-card " + (activeCard===i?"pkg-card-active " + (slide?"pkg-card-exiting":""):"")} key={p.name} onClick={e=>{if(mobile&&!e.target.closest('button,a'))enquire(`${p.name} · ${p.days}`)}} data-reveal inert={mobile&&activeCard!==i} aria-hidden={mobile&&activeCard!==i} style={{'--delay':`${i%2*90}ms`,'--fan':cardOffset(i),'--depth':Math.abs(cardOffset(i))}}><div className="pkg-card-image"><button onClick={()=>onZoom(p)} aria-label={`View ${p.name} photo`}><img loading="lazy" src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=850&q=85`} alt={p.name}/><span className="pkg-view">View photo +</span></button><span className="pkg-category">{p.category}</span><span className="pkg-tag">{p.tag}</span></div><div className="pkg-card-copy"><div className="pkg-meta"><span>{p.country}</span><span><CalendarDays size={13}/>{p.days}</span></div><h3>{p.name}</h3><p className="pkg-route"><MapPin size={14}/>{p.route}</p><ul>{p.includes.map(item=><li key={item}><Check size={13}/>{item}</li>)}</ul><div className="pkg-bottom"><div><small>Sample price from</small><strong>₹{p.price}</strong><span> / person</span></div><button className="button" onClick={()=>enquire(`${p.name} · ${p.days}`)}>Plan this trip <ArrowUpRight size={16}/></button></div></div></article>)}</div>
 {items.length>1&&<div className="pkg-carousel-controls"><button className="pkg-deck-arrow" onClick={()=>goToCard(activeCard-1)} aria-label="Previous package"><ChevronLeft size={17}/></button><div className="pkg-carousel-dots" role="group" aria-label="Choose a package">{items.map((p,i)=><button key={p.name} className={activeCard===i?'selected':''} aria-label={`Show ${p.name}`} aria-current={activeCard===i?'true':undefined} onClick={()=>goToCard(i)}/>)}</div><button className="pkg-deck-arrow" onClick={()=>goToCard(activeCard+1)} aria-label="Next package"><ChevronRight size={17}/></button><span aria-live="polite">{activeCard+1} / {items.length}</span></div>}
 {items.length>1&&<p className="pkg-swipe-hint">Swipe to find your next escape</p>}
 </>;
}
