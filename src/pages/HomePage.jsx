import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BookingSection from '../components/home/BookingSection';
import ValuesSection from '../components/home/ValuesSection';
import SearchResultsSection from '../components/home/SearchResultsSection';
import DestinationsSection from '../components/home/DestinationsSection';
import AboutSection from '../components/home/AboutSection';
import StepsSection from '../components/home/StepsSection';
import EscapeSection from '../components/home/EscapeSection';
import FaqSection from '../components/home/FaqSection';
import PopularPackages from '../components/PopularPackages';
import {tiltCard,resetTilt} from '../utils/motion';
export default function HomePage({isHome,isFlights,page,intro,find,search,enquire,filter,setFilter,saved,setSaved,setZoom,faq,setFaq}){
 return <>
<HeroSection isHome={isHome} isFlights={isFlights} page={page} intro={intro}/>
<BookingSection page={page} isFlights={isFlights} find={find}/>
<ValuesSection />
<SearchResultsSection search={search} isFlights={isFlights} page={page} enquire={enquire}/>
<DestinationsSection page={page} filter={filter} setFilter={setFilter} saved={saved} setSaved={setSaved} setZoom={setZoom} enquire={enquire}/>
{isHome&&<PopularPackages enquire={enquire} onZoom={setZoom} onTilt={tiltCard} onLeave={resetTilt}/>}
<AboutSection intro={intro} enquire={enquire}/>
<StepsSection />
<EscapeSection enquire={enquire}/>
<FaqSection faq={faq} setFaq={setFaq}/>
 </>;
}
