import React, {useEffect,useRef} from 'react';
import {X} from 'lucide-react';
import {photo} from '../utils/images';
export default function PackageImageZoom({place,onClose}){
 const ref=useRef(null);
 useEffect(()=>{const previous=document.activeElement;ref.current.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=overflow;previous?.focus()}},[]);
 return <dialog ref={ref} className="image-lightbox" aria-label={`${place.name} photo preview`} onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose()}}><div className="lightbox-toolbar"><span>{place.name} <small>{place.country}</small></span></div><button autoFocus className="lightbox-close" onClick={onClose} aria-label="Close photo"><X/></button><div className="lightbox-image"><img src={photo(place.image,2200)} alt={`${place.name}, ${place.country}`}/></div></dialog>
}
