import React from 'react';
import {ArrowUpRight} from 'lucide-react';
export default function StepsSection({}){
 return (<section className="section wrap how"><div><div className="eyebrow">LESS PLANNING. MORE LIVING.</div><h2>From “what if”<br/>to <em>“we’re here.”</em></h2></div>{[['01','Tell us your daydream','A destination, a feeling, a long weekend. We’ll start wherever you are.'],['02','Make it your own','We’ll shape the route, the stays and the little extras together.'],['03','Go make memories','With the details in place, all that’s left is to enjoy the journey.']].map(([n,title,text])=><div className="step" key={n}><span>{n} <ArrowUpRight size={20}/></span><h3>{title}</h3><p>{text}</p></div>)}</section>);
}
