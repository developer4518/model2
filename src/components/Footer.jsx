import React, {useRef,useState} from 'react';
import {ArrowUpRight,Plane,X,MapPin,Mail,Phone} from 'lucide-react';
export default function Footer({enquire}){
 const infoDialog=useRef(null),[info,setInfo]=useState('');
 function showInfo(title){setInfo(title);infoDialog.current.showModal()}
 return <footer><div className="wrap footer-top detailed-footer">
 <div className="footer-about"><a className="brand" href="/"><span className="brand-icon"><Plane/></span><span>flyinglyte.<small>GO PLACES. FEEL MORE.</small></span></a><p>Great journeys start with a little curiosity.</p><p>FlyingLyte helps you book flights, hotels, and holiday packages at the best prices with a fast and secure experience.</p></div>
 <div className="footer-explore"><span>EXPLORE</span><a href="/packages">Packages <ArrowUpRight size={12}/></a><a href="/flights">Flights <ArrowUpRight size={12}/></a><a href="/hotels">Hotels <ArrowUpRight size={12}/></a><button onClick={()=>enquire('Customise a package')}>Customize a package <ArrowUpRight size={12}/></button></div>
 <div><span>GOOD TO KNOW</span><a href="/about">About Us</a><button onClick={()=>document.getElementById('footer-contact').scrollIntoView({behavior:'smooth'})}>Contact Us</button><a href="/#faqs">FAQs</a>{['Cancellation Policy','Privacy Policy','Terms & Conditions','Refund Policy'].map(title=><button key={title} onClick={()=>showInfo(title)}>{title}</button>)}</div>
 <div className="footer-contact" id="footer-contact"><span>LET’S TALK TRAVEL</span><a href="mailto:info@flyinglyte.com"><Mail size={15}/> info@flyinglyte.com</a><a href="tel:+919667455591"><Phone size={15}/> +91 9667455591</a><p><MapPin size={16}/><span>316, Gagan Vihar,<br/>Nearest Metro: Preet Vihar<br/>Delhi-110051</span></p><small>GSTIN: 07AALFF0579Q1ZP</small></div>
 </div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} FlyingLyte Travels. Made for the wayfarer in you.</span><span>Dream a little. Travel a little further.</span><a href="#">Back to top ↑</a></div>
 <dialog ref={infoDialog} className="policy-dialog" aria-labelledby="policy-title" onClick={e=>{if(e.target===infoDialog.current)infoDialog.current.close()}}><button className="dialog-close" aria-label="Close information" onClick={()=>infoDialog.current.close()}><X/></button><div className="eyebrow">GOOD TO KNOW</div><h2 id="policy-title">{info}</h2><p>Policy information preview. Please contact the FlyingLyte team for the final {info.toLowerCase()} and applicable booking conditions before confirming your trip.</p><p><a href="tel:+919667455591">+91 9667455591</a><br/><a href="mailto:info@flyinglyte.com">info@flyinglyte.com</a></p></dialog>
 </footer>
}
