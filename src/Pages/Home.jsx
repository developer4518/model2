import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import SearchBox from '../modules/Search/SearchBox';
import ValuesSection from '../components/Home/ValuesSection';
import SearchResultsPreview from '../modules/Search/SearchResultsPreview';
import DestinationsSection from '../components/Home/DestinationsSection';
import AboutSection from '../components/Home/AboutSection';
import StepsSection from '../components/Home/StepsSection';
import CTASection from '../components/Home/CTASection';
import FaqSection from '../components/common/FaqSection';
import PopularPackages from '../modules/packages/PopularPackages';
export default function Home({isHome,isFlights,page,intro,find,search,enquire,filter,setFilter,saved,setSaved,setZoom,faq,setFaq}){
 return <>
<HeroSection isHome={isHome} isFlights={isFlights} page={page} intro={intro}/>
<SearchBox page={page} isFlights={isFlights} find={find}/>
<ValuesSection />
<SearchResultsPreview search={search} isFlights={isFlights} page={page} enquire={enquire}/>
<DestinationsSection page={page} filter={filter} setFilter={setFilter} saved={saved} setSaved={setSaved} setZoom={setZoom} enquire={enquire}/>
{isHome&&<PopularPackages enquire={enquire} onZoom={setZoom}/>}
<AboutSection intro={intro} enquire={enquire}/>
<StepsSection />
<CTASection enquire={enquire}/>
<FaqSection faq={faq} setFaq={setFaq}/>
 </>;
}
