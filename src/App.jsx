import React, {useEffect,useRef,useState} from 'react';
import {ArrowUpRight,ArrowRight,Plane} from 'lucide-react';
import './motion.css';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import HotelsPage from './pages/HotelsPage';
import AboutPage from './pages/AboutPage';
import PackagesPage from './pages/PackagesPage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import EnquiryModal from './components/EnquiryModal';
import PackageImageZoom from './components/PackageImageZoom';
import SocialRail from './components/SocialRail';
import useTheme from './hooks/useTheme';
import useSmoothScroll from './hooks/useSmoothScroll';
export default function App(){
 const [pathname,setPathname]=useState(location.pathname),[intro,setIntro]=useState(true),[transition,setTransition]=useState(false),[zoom,setZoom]=useState(null);
 const navigationTimer=useRef(null);
 const page=pathname.replace(/\/$/,'')==='/packages'?'Packages':pathname.replace(/\/$/,'')==='/about'?'About Us':pathname.replace(/\/$/,'')==='/flights'?'Flights':pathname.replace(/\/$/,'')==='/hotels'?'Hotels':'Home';
 const [theme,setTheme]=useTheme();
 const [menu,setMenu]=useState(false),[filter,setFilter]=useState('All escapes'),[modal,setModal]=useState(null),[sent,setSent]=useState(false),[search,setSearch]=useState(null),[saved,setSaved]=useState([]),[faq,setFaq]=useState(0);
 const dialog=useRef(null);
 useSmoothScroll(page,intro||transition||Boolean(modal)||Boolean(zoom));
 useEffect(()=>{document.title=`${page} | Flyinglyte - Find your kind of somewhere`},[page]);
 useEffect(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const timer=setTimeout(()=>setIntro(false),reduced?100:2350);return()=>clearTimeout(timer)},[]);
 useEffect(()=>{if(!intro)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[intro]);
 useEffect(()=>{
  function move(url,push){
   clearTimeout(navigationTimer.current);setTransition(true);setMenu(false);
   navigationTimer.current=setTimeout(()=>{if(push)history.pushState({},'',url);setPathname(url.pathname);setSearch(null);setFilter('All escapes');setFaq(0);setModal(null);setZoom(null);requestAnimationFrame(()=>{const target=url.hash&&document.getElementById(url.hash.slice(1));if(target)target.scrollIntoView({behavior:'instant'});else window.scrollTo({top:0,behavior:'instant'});setTransition(false)})},matchMedia('(prefers-reduced-motion: reduce)').matches?0:260);
  }
  const click=e=>{const a=e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||!['/','/packages','/flights','/hotels','/about'].includes(url.pathname.replace(/\/$/,'')||'/'))return;e.preventDefault();if((url.pathname.replace(/\/$/,'')||'/')===(location.pathname.replace(/\/$/,'')||'/')){setMenu(false);if(url.hash){history.pushState({},'',url);document.getElementById(url.hash.slice(1))?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}else window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return}move(url,true)};
  const pop=()=>move(new URL(location.href),false);
  document.addEventListener('click',click);window.addEventListener('popstate',pop);
  return()=>{document.removeEventListener('click',click);window.removeEventListener('popstate',pop);clearTimeout(navigationTimer.current)};
 },[]);

 useEffect(()=>{if(!modal)return;const previous=document.activeElement;dialog.current.showModal();return()=>previous?.focus()},[modal]);
 function enquire(subject){setSent(false);setModal(subject)}
 useEffect(()=>{if(search)document.getElementById('results')?.scrollIntoView({behavior:'smooth',block:'start'})},[search]);
 function find(e){e.preventDefault();const values=Object.fromEntries(new FormData(e.currentTarget));setSearch(values)}
 const isHome=page==='Home',isFlights=page==='Flights';
 const Page=page==='Packages'?PackagesPage:isHome?HomePage:isFlights?FlightsPage:HotelsPage;
 return <>
 {intro&&<div className="brand-intro" role="status" aria-label="Welcome to Flyinglyte"><div className="intro-orbit"><Plane size={28}/></div><div className="intro-word" aria-hidden="true">{'Flyinglyte'.split('').map((letter,i)=><span key={i} style={{'--letter':i}}>{letter}</span>)}<span className="intro-dot">.</span></div><p>GO PLACES. FEEL MORE.</p><button onClick={()=>setIntro(false)}>Skip intro <ArrowRight size={14}/></button></div>}
 <div className={`site-shell ${intro?'awaiting-intro':''} ${transition?'page-leaving':''}`} inert={intro||transition} aria-busy={transition}>
 <SocialRail page={page} ready={!intro&&!transition}/>
 <div className="announcement">A little less ordinary. A lot more you. <a href="/#packages">Discover your next escape <ArrowUpRight size={12}/></a></div>
 <Navbar page={page} menu={menu} setMenu={setMenu} theme={theme} setTheme={setTheme} enquire={enquire}/>
 <main key={page} className="page-stage">{page==='About Us'?<AboutPage enquire={enquire} ready={!intro}/>:<Page isHome={isHome} isFlights={isFlights} page={page} intro={intro} find={find} search={search} enquire={enquire} filter={filter} setFilter={setFilter} saved={saved} setSaved={setSaved} setZoom={setZoom} faq={faq} setFaq={setFaq}/>}</main><Footer enquire={enquire}/>
 <EnquiryModal modal={modal} setModal={setModal} sent={sent} setSent={setSent} dialog={dialog}/>
 </div>{zoom&&<PackageImageZoom place={zoom} onClose={()=>setZoom(null)}/>}
 </>;
}
