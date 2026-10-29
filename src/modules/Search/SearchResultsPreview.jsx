import React from 'react';
import {ArrowUpRight} from 'lucide-react';
export default function SearchResultsPreview({search,isFlights,page,enquire}){
 return (<>{search&&<section className="search-results wrap" id="results" aria-live="polite"><div><span className="eyebrow">YOUR JOURNEY, TAKING SHAPE</span><h2>{isFlights?`${search.from} → `:''}{search.destination}</h2><p>{search.date} · {search.travellers}. {isFlights?'Flight availability and fares need to be confirmed by our team.':'Let’s tailor the dates, stays and details to you.'}</p><small>Planning preview · No live availability or booking is connected.</small></div><button className="button" onClick={()=>enquire(`${page} enquiry: ${search.from?search.from+' to ':''}${search.destination}, ${search.date}, ${search.travellers}`)}>Get a personalised quote <ArrowUpRight size={18}/></button></section>}</>);
}
