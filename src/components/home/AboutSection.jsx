import React from 'react';
import {Compass,Headphones,MoveRight} from 'lucide-react';
import {photo} from '../../utils/images';
import HangingTag from '../HangingTag';
export default function AboutSection({intro,enquire}){
 return (<section className="about-section" id="about"><div className="wrap about-grid"><div className="about-art"><img loading="lazy" src={photo('photo-1464822759023-fed622ff2c3b',900)} alt="Sunlight falling across dramatic mountain peaks"/><HangingTag ready={!intro}/></div><div className="about-copy"><div className="eyebrow">A LITTLE ABOUT US</div><h2>We’re in the business<br/>of <em>“remember when?”</em></h2><p>The unplanned detour. The first glimpse of the sea. That tiny café you still talk about. That’s the kind of travel we believe in.</p><p>At Flyinglyte, we start with you — what you love, how you travel, and what you’re dreaming of. Then we bring the details together, so you can be in the moment.</p><div className="about-features"><div><Compass/><strong>Your pace. Your plans.</strong><span>Journeys shaped around you.</span></div><div><Headphones/><strong>A real person to turn to.</strong><span>Help with the little and big things.</span></div></div><button className="text-button" onClick={()=>enquire('Meet my travel planner')}>Meet your next adventure <MoveRight size={22}/></button></div></div></section>);
}
