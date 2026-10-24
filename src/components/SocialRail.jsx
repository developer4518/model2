import React, {useRef,useState} from 'react';
import {Instagram,Facebook,Youtube,Linkedin,MessageCircle,X} from 'lucide-react';
import './social.css';

// All social buttons are intentionally local demo previews.
const networks=[{name:'WhatsApp',Icon:MessageCircle,url:null,color:'#228557'},{name:'Instagram',Icon:Instagram,url:null,color:'#b44479'},{name:'Facebook',Icon:Facebook,url:null,color:'#2865b6'},{name:'YouTube',Icon:Youtube,url:null,color:'#c33f39'},{name:'LinkedIn',Icon:Linkedin,url:null,color:'#27739b'},{name:'X',Icon:()=> <span className="social-x" aria-hidden="true">𝕏</span>,url:null,color:'#394b43'}];
export default function SocialRail(){
 const dialog=useRef(null),[network,setNetwork]=useState('');
 function show(name){setNetwork(name);dialog.current.showModal()}
 return <><aside className="social-rail" aria-label="Follow Flyinglyte on social media">{networks.map(({name,Icon,url,color})=>url?<a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`Flyinglyte on ${name}`} style={{'--social-color':color}}><Icon size={18}/><span className="social-tooltip">{name}</span></a>:<button key={name} aria-label={`${name} information`} onClick={()=>show(name)} style={{'--social-color':color}}><Icon size={18}/><span className="social-tooltip">{name}</span></button>)}</aside>
 <dialog ref={dialog} className="social-dialog" aria-labelledby="social-title" onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><button autoFocus className="dialog-close" aria-label="Close social information" onClick={()=>dialog.current.close()}><X/></button><div className="eyebrow">LET’S STAY CONNECTED</div><h2 id="social-title">Flyinglyte on {network}</h2><p>This is a demo {network} button. No profile or chat has been opened, and no message has been sent.</p><button className="button" onClick={()=>dialog.current.close()}>Keep exploring</button></dialog></>;
}
