import React,{useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Plane,ChevronLeft,ChevronRight,Search,MapPin,CalendarDays,Check,Compass,HeartHandshake,ShieldCheck} from 'lucide-react';
import {packages} from '../data/packages';
import EscapeSection from '../components/home/EscapeSection';
import './packages-page.css';
import packagesHero from '../assets/domestic-international-hero.png';
export default function PackagesPage({enquire,setZoom}){
 const [category,setCategory]=useState('All packages'),[query,setQuery]=useState(''),[sort,setSort]=useState('recommended');
 const root=useRef(null),swipe=useRef(null),swiped=useRef(false);
 const [activeCard,setActiveCard]=useState(0);
 const [dragX,setDragX]=useState(0),[slide,setSlide]=useState(null);
 const slideTimer=useRef(null);
 const [mobile,setMobile]=useState(()=>matchMedia('(max-width: 760px)').matches);
 useEffect(()=>{const media=matchMedia('(max-width: 760px)');const update=()=>setMobile(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{clearTimeout(slideTimer.current);setActiveCard(0);setDragX(0);setSlide(null);swipe.current=null},[category,query,sort,mobile]);
 useEffect(()=>()=>clearTimeout(slideTimer.current),[]);
 function goToCard(index){
  if(!visible.length||slide)return;
  const next=(index+visible.length)%visible.length;
  if(next===activeCard){setDragX(0);return}
  if(!mobile){setActiveCard(next);return}
  setSlide({direction:index<activeCard?1:-1});
  slideTimer.current=setTimeout(()=>{setActiveCard(next);setDragX(0);setSlide(null)},matchMedia('(prefers-reduced-motion: reduce)').matches?0:280);
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
 function cardOffset(index){const offset=(index-activeCard+visible.length)%visible.length;return offset>visible.length/2?offset-visible.length:offset}
 useEffect(()=>{
  if(!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.08});
  root.current.querySelectorAll('[data-reveal]').forEach(element=>{element.classList.add('reveal-ready');observer.observe(element)});
  return()=>observer.disconnect();
 },[category,query,sort]);
 const visible=packages.filter(p=>(category==='All packages'||p.category===category)&&`${p.name} ${p.country} ${p.route}`.toLowerCase().includes(query.trim().toLowerCase()));
 const price=p=>Number(p.price.replaceAll(',',''));
 if(sort!=='recommended')visible.sort((a,b)=>sort==='low'?price(a)-price(b):price(b)-price(a));
 return <div className="packages-page" ref={root}>
 <section className="pkg-top-search wrap" aria-label="Find your holiday"><form className="pkg-hero-search" role="search" onSubmit={e=>{e.preventDefault();document.getElementById('collection')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}}><label htmlFor="hero-package-search">Where would you like to go?</label><div className="pkg-hero-search-row"><Search size={18}/><input id="hero-package-search" type="search" placeholder="Try Kashmir, Bali or Switzerland" value={query} onChange={e=>setQuery(e.target.value)}/><button className="button" type="submit">Search <ArrowUpRight size={16}/></button></div><div className="pkg-quick-search"><span>Explore:</span>{[['All packages','All escapes'],['India','Domestic'],['International','International']].map(([value,label])=><button key={value} type="button" aria-pressed={category===value} className={category===value?'selected':''} onClick={()=>setCategory(value)}>{label}</button>)}</div></form></section>
 <section className="pkg-hero wrap" aria-labelledby="packages-title"><div className="pkg-hero-copy"><div className="eyebrow"><span/> DOMESTIC & INTERNATIONAL HOLIDAYS</div><h1 id="packages-title">Across India.<br/>Around the world.<br/><em>Your kind of escape.</em></h1><p>Explore domestic and international holiday packages, from India's mountains and royal cities to tropical islands and European adventures.</p><div className="pkg-note" aria-live="polite">{visible.length} matching {visible.length===1?'package':'packages'} / Personalised to your travel style</div></div><div className="pkg-hero-art"><img src={packagesHero} alt="Travel collage with the Taj Mahal, Rajasthan palace, Himalayan mountains, Eiffel Tower, Swiss Alps and tropical islands" fetchPriority="high"/><span className="pkg-location"><MapPin size={13}/> India & beyond</span><div className="pkg-postcard pkg-travel-pass"><div className="pkg-pass-top"><span>YOUR NEXT ADVENTURE</span><Plane size={17} aria-hidden="true"/></div><div className="pkg-pass-photos"><figure><img src={packagesHero} alt="Indian landmarks including the Taj Mahal" loading="lazy"/><figcaption>INDIA</figcaption></figure><figure><img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80" alt="Alpine mountain landscape" loading="lazy"/><figcaption>THE WORLD</figcaption></figure><span className="pkg-pass-connector" aria-hidden="true"><Plane size={14}/></span></div><strong>Near or far.<br/><em>Go somewhere new.</em></strong><div className="pkg-pass-bottom"><span>DOMESTIC + INTERNATIONAL</span><span className="pkg-pass-stamp"><Compass size={17} aria-hidden="true"/></span></div></div></div></section>
 <div className="pkg-promises wrap">{[[Compass,'Thoughtful itineraries','The highlights, with room to wander.'],[HeartHandshake,'Made personal','Your pace. Your kind of holiday.'],[ShieldCheck,'Clear inclusions','Know what goes into your escape.']].map(([Icon,title,copy])=><div key={title}><Icon size={24}/><div><strong>{title}</strong><span>{copy}</span></div></div>)}</div>
 <section className="pkg-collection" id="collection" aria-labelledby="collection-title"><div className="wrap"><div className="section-heading" data-reveal><div><div className="eyebrow">01 / THE COLLECTION</div><h2 id="collection-title">Pick a place.<br/><em>Make it your story.</em></h2></div><p>A few of our favourite escapes. Every itinerary is a starting point, ready to be shaped around you.</p></div><div className="pkg-toolbar"><div className="pkg-tabs" role="group" aria-label="Package category">{['All packages','India','International','Honeymoon'].map(item=><button key={item} aria-pressed={category===item} className={category===item?'selected':''} onClick={()=>setCategory(item)}>{item}<span>{item==='All packages'?packages.length:packages.filter(p=>p.category===item).length}</span></button>)}</div></div><div className="pkg-results"><span aria-live="polite">{visible.length} {visible.length===1?'escape':'escapes'} to inspire you</span><select aria-label="Sort packages" value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">Recommended</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
 <div className={"pkg-grid " + (dragX&&!slide?"pkg-dragging":"")} style={{'--drag-x':`${dragX}px`,'--slide-direction':slide?.direction||0}} onPointerDown={startSwipe} onPointerMove={moveSwipe} onPointerUp={endSwipe} onPointerCancel={cancelSwipe} onClickCapture={e=>{if(swiped.current||slide){e.preventDefault();e.stopPropagation();swiped.current=false}}} onKeyDown={e=>{if(mobile&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();goToCard(activeCard+(e.key==='ArrowRight'?1:-1))}}}>{visible.map((p,i)=><article className={"pkg-card " + (activeCard===i?"pkg-card-active " + (slide?"pkg-card-exiting":""):"")} key={p.name} onClick={e=>{if(mobile&&!e.target.closest('button,a'))enquire(`${p.name} · ${p.days}`)}} data-reveal inert={mobile&&activeCard!==i} aria-hidden={mobile&&activeCard!==i} style={{'--delay':`${i%2*90}ms`,'--fan':cardOffset(i),'--depth':Math.abs(cardOffset(i))}}><div className="pkg-card-image"><button onClick={()=>setZoom(p)} aria-label={`View ${p.name} photo`}><img loading="lazy" src={`https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=850&q=85`} alt={p.name}/><span className="pkg-view">View photo +</span></button><span className="pkg-category">{p.category}</span><span className="pkg-tag">{p.tag}</span></div><div className="pkg-card-copy"><div className="pkg-meta"><span>{p.country}</span><span><CalendarDays size={13}/>{p.days}</span></div><h3>{p.name}</h3><p className="pkg-route"><MapPin size={14}/>{p.route}</p><ul>{p.includes.map(item=><li key={item}><Check size={13}/>{item}</li>)}</ul><div className="pkg-bottom"><div><small>Sample price from</small><strong>₹{p.price}</strong><span> / person</span></div><button className="button" onClick={()=>enquire(`${p.name} · ${p.days}`)}>Plan this trip <ArrowUpRight size={16}/></button></div></div></article>)}</div>
 {visible.length>1&&<div className="pkg-carousel-controls"><button className="pkg-deck-arrow" onClick={()=>goToCard(activeCard-1)} aria-label="Previous package"><ChevronLeft size={17}/></button><div className="pkg-carousel-dots" role="group" aria-label="Choose a package">{visible.map((p,i)=><button key={p.name} className={activeCard===i?'selected':''} aria-label={`Show ${p.name}`} aria-current={activeCard===i?'true':undefined} onClick={()=>goToCard(i)}/>)}</div><button className="pkg-deck-arrow" onClick={()=>goToCard(activeCard+1)} aria-label="Next package"><ChevronRight size={17}/></button><span aria-live="polite">{activeCard+1} / {visible.length}</span></div>}
 <p className="pkg-swipe-hint">Swipe to find your next escape</p>
 {!visible.length&&<div className="pkg-empty"><Compass size={32}/><h3>A different adventure?</h3><p>Try another destination or explore the full collection.</p><button className="button" onClick={()=>{setQuery('');setCategory('All packages')}}>Show all packages</button></div>}<p className="pkg-disclaimer">Sample prices are per person. Final pricing, inclusions and availability are confirmed with your personalised quote.</p></div></section>
 <section className="pkg-process wrap section" data-reveal><div><div className="eyebrow">02 / FROM SAVED TO BOOKED</div><h2>A great escape.<br/><em>A simple beginning.</em></h2><p>We take care of the details, so you can look forward to the journey.</p></div><div className="pkg-steps">{[['01','Find your kind of somewhere','Choose a package that feels like you.'],['02','Make it your own','Tell us your dates, travel style and wish list.'],['03','Let us connect the dots','We confirm your itinerary and personalised quote.']].map(([n,title,copy])=><div key={n}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></section><div className="pkg-final" data-reveal><EscapeSection enquire={enquire}/></div></div>;
}
