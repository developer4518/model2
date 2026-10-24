import React from 'react';
import {ArrowUpRight} from 'lucide-react';
import {EscapeArtwork} from '../DepthMotion';
export default function EscapeSection({enquire}){
 return (<section className="escape-banner wrap"><div><div className="eyebrow">THE BEST PLANS START WITH A CONVERSATION</div><h2>Your out-of-office<br/>is <em>calling.</em></h2><button className="button coral" onClick={()=>enquire('Help me plan my escape')}>Let’s make a little escape <ArrowUpRight size={19}/></button></div><EscapeArtwork/></section>);
}
