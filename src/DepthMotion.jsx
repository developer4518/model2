import React,{useEffect,useRef,useState} from 'react';
import {Plane,MapPin} from 'lucide-react';
import './depth.css';

function useVisible(){
 const ref=useRef(null),[visible,setVisible]=useState(false);
 useEffect(()=>{if(!('IntersectionObserver' in window)){setVisible(true);return}const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.12});observer.observe(ref.current);return()=>observer.disconnect()},[]);
 return [ref,visible];
}
export function MotionCard({children,index,...props}){
 const [ref,visible]=useVisible();
 return <article {...props} ref={ref} className={`trip-card depth-card${visible?' motion-visible':''}`} style={{'--motion-offset':`${index*-.9}s`}}>{children}</article>;
}
export function EscapeArtwork(){
 const [ref,visible]=useVisible();
 return <div ref={ref} className={`escape-artwork${visible?' motion-visible':''}`} aria-label="Floating travel photographs of Bali, the Maldives and the mountains">
 <div className="escape-orbit" aria-hidden="true"/><div className="escape-plane" aria-hidden="true"><Plane size={29}/></div>
 {[['mountains','photo-1464822759023-fed622ff2c3b','Mountain peaks in warm sunlight','THE SCENIC ROUTE'],['island','photo-1514282401047-d79a71a590e8','Turquoise waters in the Maldives','A LITTLE ISLAND TIME'],['bali','photo-1537996194471-e657df975ab4','A Balinese temple beside the water','SOMEWHERE BEAUTIFUL']].map(([name,id,alt,caption])=><figure key={name} className={`escape-postcard postcard-${name}`}><img loading="lazy" src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=650&q=85`} alt={alt}/><figcaption><MapPin size={10}/>{caption}</figcaption></figure>)}
 <span className="escape-art-caption">More sunsets. Fewer “somedays.”</span>
 </div>;
}
