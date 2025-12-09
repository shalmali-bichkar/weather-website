import { useState, useEffect, useCallback } from 'react'

import './App.css'

function App() {
  const[password,setPassword] = useState<string>('')
  const[length,setLength] = useState<number>(5)
  const[allowChars,setAllowChars] = useState(false)
  const[allowNumbers, setAllowNumbers] = useState(false)

  const generateString = useCallback(()=>{
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(allowNumbers){
      str = str +"0123456789"
    }
    if(allowChars){
      str += "./<>@#$%^&*()"
    }
    for(let i = 0;i<length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length, allowChars,allowNumbers])
  useEffect(()=>{
    generateString()
  },[length,allowChars,allowNumbers,generateString])
  return (
    <>
      <div className = 'flex w-full h-screen justify-center align-center items-center' >
        <div className = "h-[400px] w-[1040px] rounded-lg justify-center align-center items-center bg-gray-950">
          <div className = 'text-[40px] font-bold mt-[40px] mb-[50px]'>Random String Generator</div>
          
          <input
            className = ' text-center h-[50px] w-[940px] mb-[80px] p-[10px] m-[10px] rounded-lg overflow-scroll  bg-amber-100 text-black'
            type = "text"
            value = {password}
            placeholder = 'generated string'
            readOnly
          ></input>
          <div>

            <input
              type = 'range'
              min = '5'
              max = '100'
              value = {length}
              onChange = {(e)=> setLength(Number(e.target.value))}
            ></input>
            <label className='mx-2 mr-[30px]'>Length : {length}</label>

            <input
              type = 'checkbox'
              defaultChecked = {allowNumbers}
              id = "numberInput"
              onChange = {()=>setAllowNumbers((prev)=>!prev)}
              >
            </input>
            <label htmlFor='numberInput' className='mx-2'> Numbers </label>
          
            <input
              type = 'checkbox'
              defaultChecked = {allowChars}
              id = "numberInput"
              onChange = {()=>setAllowChars((prev)=>!prev)}
              >
            </input>
            <label htmlFor='numberInput' className='mx-2'> Characters </label>

          </div>
        
        </div>
        
      </div>
      
    </>
  )
}

export default App
