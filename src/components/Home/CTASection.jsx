import React,{useEffect,useId,useRef,useState} from 'react';
import {ArrowUpRight,Plane,Sparkles,Check,MapPin,CalendarDays,Wallet,MessageCircle} from 'lucide-react';
import './escape-planner.css';

export default function CTASection({enquire}){
 const id=useId(),section=useRef(null);
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  if(!('IntersectionObserver' in window)){setVisible(true);return}
  const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect()}},{threshold:.15});
  observer.observe(section.current);
  return()=>observer.disconnect();
 },[]);
 const [destination,setDestination]=useState(''),[budget,setBudget]=useState(''),[month,setMonth]=useState('');
 const heading=`${id}-title`;
 function startPlanning(event){
  event.preventDefault();
  const details=[destination.trim()?`Destination: ${destination.trim()}`:'Help me choose a destination',budget&&`Budget per person: ${budget}`,month&&`Travel month: ${month}`].filter(Boolean);
  enquire(`Plan my trip | ${details.join(' | ')}`);
 }
 return <section ref={section} className={`escape-banner escape-planner wrap ${visible?'planner-visible':''}`} aria-labelledby={heading}>
  <div className="planner-copy">
   <div className="eyebrow"><span className="planner-live-dot"/> YOUR HOLIDAY. YOUR WAY. <Sparkles size={13}/></div>
   <h2 id={heading}>Dreaming of a trip?<br/><em>Let's make a plan.</em></h2>
   <p className="planner-desktop-intro">Skip the endless searching. Share where you want to go and your budget to start a personalised trip enquiry.</p><p className="planner-mobile-intro">Your destination. Your budget. A trip made for you.</p>
   <div className="planner-inspiration" role="group" aria-label="Choose your travel inspiration">{[['Kashmir','Mountain moments','photo-1464822759023-fed622ff2c3b'],['Bali','Island state of mind','photo-1537996194471-e657df975ab4'],['Maldives','A little ocean time','photo-1514282401047-d79a71a590e8']].map(([place,caption,image],index)=><button type="button" key={place} className={destination===place?'is-chosen':''} aria-label={`Plan a trip to ${place}`} aria-pressed={destination===place} style={{'--postcard-index':index}} onClick={()=>setDestination(place)}><img loading="lazy" src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=320&q=80`} alt=""/><span><MapPin size={10}/>{place}</span><small>{caption}</small></button>)}<span className="planner-flight-mark" aria-hidden="true"><Plane size={25}/></span></div>
   <ul className="planner-benefits"><li><Check size={15}/> An itinerary shaped around your interests</li><li><Check size={15}/> Stay and travel options for your budget</li><li><Check size={15}/> Help choosing the right destination</li></ul>
   <div className="planner-next"><span>01 <b>Your wish list</b></span><span aria-hidden="true">→</span><span>02 <b>Your enquiry</b></span><span aria-hidden="true">→</span><span>03 <b>Plan together</b></span></div>
  </div>
  <div className="planner-panel">
   <div className="planner-panel-tag"><MessageCircle size={11}/> A GREAT TRIP STARTS HERE</div><div className="planner-panel-top"><span className="planner-panel-icon"><MapPin size={20}/></span><div><h3>Start with your wish list</h3><p>A destination in mind? Or let's find one.</p></div></div>
   <form onSubmit={startPlanning}>
    <label htmlFor={`${id}-destination`}><MapPin size={13}/> Where would you like to go?</label>
    <input id={`${id}-destination`} value={destination} onChange={event=>setDestination(event.target.value)} placeholder="e.g. Kashmir, Bali, or surprise me" maxLength={120}/>
    <div className="planner-suggestions" role="group" aria-label="Destination ideas">{['Kashmir','Bali','Maldives','Help me choose'].map(place=><button type="button" key={place} aria-pressed={destination===place} className={destination===place?'selected':''} onClick={()=>setDestination(place)}>{place}</button>)}</div>
    <div className="planner-fields"><div><label htmlFor={`${id}-budget`}><Wallet size={13}/> Budget / person</label><select id={`${id}-budget`} value={budget} onChange={event=>setBudget(event.target.value)}><option value="">Not decided yet</option><option>Under ₹25,000</option><option>₹25,000–₹50,000</option><option>₹50,000–₹1,00,000</option><option>Above ₹1,00,000</option></select></div><div><label htmlFor={`${id}-month`}><CalendarDays size={13}/> Travel month</label><input id={`${id}-month`} type="month" value={month} onChange={event=>setMonth(event.target.value)}/></div></div>
    <button type="submit" className="button coral planner-submit">Plan my trip <ArrowUpRight size={19}/></button>
    <p className="planner-reassurance">Next: add your contact details. No booking or payment required.</p>
   </form>
  </div>
 </section>;
}
