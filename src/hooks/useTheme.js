import {useEffect,useRef,useState} from 'react';
import {flushSync} from 'react-dom';
import {readTheme,applyTheme} from '../theme/config';

export default function useTheme(){
 const [theme,setTheme]=useState(readTheme);
 const changing=useRef(false);
 useEffect(()=>applyTheme(theme),[theme]);
 async function changeTheme(nextTheme,origin){
  if(changing.current)return;
  const root=document.documentElement;
  const commit=()=>flushSync(()=>{applyTheme(nextTheme);setTheme(nextTheme)});
  if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches){commit();return}
  const bounds=origin?.getBoundingClientRect();
  const x=bounds?bounds.left+bounds.width/2:innerWidth/2;
  const y=bounds?bounds.top+bounds.height/2:innerHeight/2;
  const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  changing.current=true;
  root.classList.add('theme-revealing');
  try{
   const transition=document.startViewTransition(commit);
   // A skipped transition can reject ready while finished still resolves.
   const finished=transition.finished.catch(()=>{});
   await transition.ready;
   await root.animate(
    {clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]},
    {duration:850,easing:'cubic-bezier(.22,1,.36,1)',pseudoElement:'::view-transition-new(root)',fill:'both'}
   ).finished;
   await finished;
  }catch{
   commit();
  }finally{
   root.classList.remove('theme-revealing');
   changing.current=false;
  }
 }
 return [theme,changeTheme];
}
