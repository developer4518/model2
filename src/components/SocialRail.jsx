import React, {useEffect,useRef,useState} from 'react';
import {Instagram,Facebook,Youtube,Linkedin,MessageCircle,X,ChevronRight,ChevronLeft} from 'lucide-react';
import './social.css';

// All social buttons are intentionally local demo previews.
const networks=[{name:'WhatsApp',Icon:MessageCircle,url:null,color:'#25D366'},{name:'Instagram',Icon:Instagram,url:null,color:'#D300C5',background:'radial-gradient(circle at 30% 110%, #FFD600 0%, #FF7A00 30%, #FF0169 55%, #D300C5 75%, #7638FA 100%)'},{name:'Facebook',Icon:Facebook,url:null,color:'#0866FF'},{name:'YouTube',Icon:Youtube,url:null,color:'#FF0033'},{name:'LinkedIn',Icon:Linkedin,url:null,color:'#0A66C2'},{name:'X',Icon:({size=18})=><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.29 19.49h2.039L6.487 3.24H4.3l13.31 17.403Z"/></svg>,url:null,color:'#000000'}];
export default function SocialRail({page,ready=true}){
 const [mobile,setMobile]=useState(()=>window.matchMedia('(max-width: 760px)').matches);
 const [attention,setAttention]=useState(-1);
 useEffect(()=>{
  const media=window.matchMedia('(max-width: 760px)');
  const update=()=>setMobile(media.matches);
  media.addEventListener('change',update);
  return()=>media.removeEventListener('change',update);
 },[]);
 const [expanded,setExpanded]=useState(true),rail=useRef(null),autoHideTimer=useRef(null);
 useEffect(()=>{
  clearTimeout(autoHideTimer.current);
  setAttention(-1);
  setExpanded(true);
  if(!ready)return;
  const hide=()=>{
   if(rail.current?.contains(document.activeElement)){autoHideTimer.current=setTimeout(hide,1000);return}
   setAttention(-1);setExpanded(false);
  };
  const spotlight=index=>{
   if(index>=networks.length){
    setAttention(-1);
    if(mobile)autoHideTimer.current=setTimeout(hide,300);
    return;
   }
   setAttention(index);
   autoHideTimer.current=setTimeout(()=>spotlight(index+1),750);
  };
  autoHideTimer.current=setTimeout(()=>spotlight(0),1200);
  return()=>clearTimeout(autoHideTimer.current);
 },[page,ready,mobile]);
 function toggle(){setAttention(-1);clearTimeout(autoHideTimer.current);setExpanded(value=>!value)}
 function collapse(){if(!mobile)return;setAttention(-1);clearTimeout(autoHideTimer.current);setExpanded(false);toggleButton.current?.focus()}
 const toggleButton=useRef(null);
 const dialog=useRef(null),[network,setNetwork]=useState('');
 function show(name){clearTimeout(autoHideTimer.current);setAttention(-1);setNetwork(name);dialog.current.showModal()}
 return <><div className={`social-dock ${expanded?'is-expanded':'is-collapsed'} ${attention>=0?'social-attention':''}`} onKeyDown={e=>{if(e.key==='Escape')collapse()}}>{mobile&&<button ref={toggleButton} type="button" className="social-toggle" onClick={toggle} aria-controls="social-links" aria-expanded={expanded} aria-label={expanded?'Hide social links':'Show social links'} title={expanded?'Hide social links':'Show social links'}>{expanded?<ChevronLeft size={17}/>:<ChevronRight size={17}/>}</button>}<aside ref={rail} id="social-links" className="social-rail" inert={!expanded} aria-hidden={!expanded} aria-label="Follow Flyinglyte on social media">{networks.map(({name,Icon,url,color,background},index)=>url?<a key={name} className={attention===index?'social-spotlight':''} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Flyinglyte on ${name}`} data-network={name} style={{'--social-color':color,'--social-background':background||color}}><Icon size={18}/><span className="social-tooltip"><span>{name}</span></span></a>:<button key={name} className={attention===index?'social-spotlight':''} aria-label={`${name} information`} onClick={()=>show(name)} data-network={name} style={{'--social-color':color,'--social-background':background||color}}><Icon size={18}/><span className="social-tooltip"><span>{name}</span></span></button>)}</aside></div>
 <dialog ref={dialog} className="social-dialog" aria-labelledby="social-title" onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><button autoFocus className="dialog-close" aria-label="Close social information" onClick={()=>dialog.current.close()}><X/></button><div className="eyebrow">LET’S STAY CONNECTED</div><h2 id="social-title">Flyinglyte on {network}</h2><p>This is a demo {network} button. No profile or chat has been opened, and no message has been sent.</p><button className="button" onClick={()=>dialog.current.close()}>Keep exploring</button></dialog></>;
}
