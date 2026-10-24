export function readTheme(){
 try{return localStorage.getItem('model2-theme')||'light'}catch{return 'light'}
}
export function applyTheme(theme){
 document.documentElement.dataset.theme=theme;
 try{localStorage.setItem('model2-theme',theme)}catch{}
}
