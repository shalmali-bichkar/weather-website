import {useState,useEffect} from 'react'
type Language = {
  code: string;
  name: string;
};
function useLanguageOptions(){
    const[data,setData] = useState<Language[]>([])
    useEffect(()=>{
    fetch("https://libretranslate.com/languages")
        .then((res)=>res.json())
        .then((data1) => setData(data1))
        .catch((err) => console.error("Error loading languages:", err));
    },[])
    return data
}

export default useLanguageOptions