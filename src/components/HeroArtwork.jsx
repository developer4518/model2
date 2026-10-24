import React, {useEffect,useRef,useState} from 'react';
import {MapPin} from 'lucide-react';
import {photo} from '../utils/images';
export default function HeroArtwork({isHome,isFlights,ready}){
 const art=useRef(null),[entered,setEntered]=useState(false);
 useEffect(()=>{
  if(!ready)return;
  let cancelled=false,visible=false,loaded=false,observer;
  const cleanups=[];
  const reveal=()=>{if(!cancelled&&visible&&loaded){setEntered(true);observer?.disconnect()}};
  const images=[...art.current.querySelectorAll('img')];
  Promise.all(images.map(img=>img.complete?Promise.resolve():new Promise(resolve=>{
   const finish=()=>{img.removeEventListener('load',finish);img.removeEventListener('error',finish);resolve()};
   img.addEventListener('load',finish);img.addEventListener('error',finish);cleanups.push(()=>{img.removeEventListener('load',finish);img.removeEventListener('error',finish)});
  }))).then(()=>{loaded=true;reveal()});
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){visible=true;reveal()}
  else{observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;reveal()},{threshold:.15});observer.observe(art.current)}
  return()=>{cancelled=true;observer?.disconnect();cleanups.forEach(cleanup=>cleanup())};
 },[ready]);
 return <div ref={art} className={`hero-art ${entered?'hero-entered':'entry-waiting'}`}><div className="image-main"><img fetchPriority="high" src={photo(isHome?'photo-1533105079780-92b9be482077':isFlights?'photo-1436491865332-7a61a109cc05':'photo-1571896349842-33c89424de2d')} alt={isHome?'Sunlit white architecture beside the blue sea in Santorini':isFlights?'Airplane wing above the clouds':'Poolside tropical resort'}/><span className="image-place"><MapPin size={14}/>{isHome?'Santorini, Greece':isFlights?'Somewhere above the clouds':'Your own slice of paradise'}</span></div><div className="image-small"><img src={photo(isHome?'photo-1510414842594-a61c69b5ae57':'photo-1514282401047-d79a71a590e8',500)} alt="Turquoise water and a peaceful tropical shoreline"/></div><div className="art-caption"><span>01 / THE ART OF GETTING AWAY</span><span>Wander a little further. ↗</span></div><svg className="doodle" viewBox="0 0 160 90" fill="none" aria-hidden="true"><path d="M5 60C90 100 147 8 84 10C18 12 87 96 153 34m-16 0 16-1-3 17" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5"/></svg></div>;
}
