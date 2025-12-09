import { useState,useEffect } from 'react'
import InputBox from './components/InputBox'
import useLanguageOptions from './hooks/useLanguageOptions';
import axios from 'axios';
import './App.css'

function App() {
  
  const [text,setText] = useState<string>('')
  const [convertedText,setConvertedText] = useState<string>('')
  const [language,setLanguage] = useState<string>('en')
  
  const languageOptions = useLanguageOptions()

  const handleTranslation = async() => {
    try{
      const options = {
        method: 'POST',
        url: 'https://google-translator9.p.rapidapi.com/v2',
        headers: {
          'x-rapidapi-key': '9dce777879msh63936a8e81806f6p12fe6cjsnd8948026c1ac',
          'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          q: `${text}`,
          source: 'en',
          target: `${language}`,
          format: 'text'
        }
      }
      const response = await axios.request(options);
      
      const result = response.data?.data?.translations?.[Number(0)]?.translatedText
      // console.log(result);
      setConvertedText(result)
    }catch(error){
      console.log(error)
    }
  }
  const onSubmit = (e : any)=>{
    e.preventDefault()
    console.log("hello")
    console.log(language)
    handleTranslation()
    
  }
  return (
    <>
      <div className='"w-full h-screen flex flex-wrap justify-center items-center'>
        <div className = "flex w-fit h-fit">
            <form onSubmit = {onSubmit}>
              <div className = ' bg-gray-100 text-black p-[10px] rounded-lg'>
                <div className = 'text-[60px] font-bold'>Text Translator</div>
                <div className = 'flex flex-row bg-gray-100 p-[40px] rounded-lg' >
                  <div className = 'mt-[30px] mr-[40px] ml-[60px] mb-[20px]'>
                    <div className = 'flex pl-[10px] bg-amber-50 text-[26px]  bg-slate-400 text-black h-fit min-w-[100px] mb-[10px] p-[4px] rounded-lg'>English</div>
                    <InputBox
                      text = {text}
                      placeholder = "Enter text"
                      onTextChange ={(text)=>setText(text)}
                    >
                    </InputBox>
                  </div>
                  
                  <div className = ' mt-[30px] ml-[40px] mr-[60px] mb-[20px]'>
                    <select
                      className=' rounded-lg text-[26px] w-[350px] text-black bg-slate-400 text-black mb-[10px] p-[7px]'
                      value = {language}
                      onChange = {(e) => setLanguage(e.target.value)}
                    >
                      <option value = "">Select</option> 
                      {languageOptions.map((lang)=>(
                        <option key ={lang.code} value ={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                    <InputBox
                      text = {convertedText}
                      placeholder = "Converted Text"

                    >
                    </InputBox>
                  </div>
                </div>
                <button type = "submit" className = 'text-white m-[20px]'>Convert</button>
              </div>
              
            </form>
        </div>
      </div>
      
      
    </>
  )
}

export default App
