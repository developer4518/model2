import {useEffect,useState} from 'react';
import {readTheme,applyTheme} from '../theme/config';

export default function useTheme(){
 const [theme,setTheme]=useState(readTheme);
 useEffect(()=>applyTheme(theme),[theme]);
 return [theme,setTheme];
}
