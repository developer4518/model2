import React, {useState} from 'react';
import PackageDeck from './PackageDeck';
import './packages.css';
import {packages} from '../../data/demo/packages';
export default function PopularPackages({enquire,onZoom}){
 const [category,setCategory]=useState('All packages');
 return <section className="popular-section" id="popular-packages"><div className="wrap section"><div className="section-heading"><div><div className="eyebrow">INSPIRATION FOR YOUR NEXT CHAPTER</div><h2>Popular packages.<br/><em>Extraordinary memories.</em></h2></div><p>Ready-to-personalise holiday ideas, with beautiful stays, thoughtful routes and room to make them your own.</p></div><div className="filter-row" role="group" aria-label="Filter popular packages">{['All packages','India','International','Honeymoon'].map(item=><button key={item} aria-pressed={category===item} className={category===item?'selected':''} onClick={()=>setCategory(item)}>{item}</button>)}</div><PackageDeck items={packages.filter(p=>category==='All packages'||p.category===category)} resetKey={category} enquire={enquire} onZoom={onZoom}/><p className="sample-note">Illustrative packages and inclusions. Final prices, itinerary and availability are confirmed with your personalised quote.</p></div></section>;
}
