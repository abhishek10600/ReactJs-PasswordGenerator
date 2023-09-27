import { useEffect, useRef } from "react";
import { useCallback, useState } from "react"

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialCharacters, setIsSpecialCharacters] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(isNumber){
      str = str + "0123456789";
    }
    if(isSpecialCharacters){
      str = str + "!@#$%^&*(){}?<>~`[]|";
    }
    for(let i = 0;i < length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)
    }
    setPassword(pass);

  }, [length,isNumber, isSpecialCharacters, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.wrtiteText(password);
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  },[length,isNumber,isSpecialCharacters, passwordGenerator])

  return (
    <div className="body w-full h-screen flex justify-center items-center bg-black">
      <div className="container bg-gray-400 w-[800px] rounded-lg flex flex-col items-center justify-center py-10">
        <div className="top">
          <input 
            className="py-4 px-4 w-[500px]" 
            type="text" 
            placeholder="password"
            value={password} 
            onChange={(ev)=> setPassword(ev.target.value)}
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClipboard} className="bg-blue-500 px-10 py-4">Copy</button>
        </div>
        <div className="bottom flex gap-4 my-4">
          <div className="password-length flex justify-center items-center gap-2">
            <input 
              type="range" 
              min="6" 
              max="100" 
              id="length" 
              value={length} 
              onChange={(ev)=> setLength(ev.target.value)}
            />
            <label htmlFor="length">{length}</label>
          </div>
          <div className="password-numberallowed flex justify-center items-center gap-2">
            <input 
              type="checkbox" 
              id="isNumber" 
              defaultChecked={isNumber} 
              onChange={()=> setIsNumber((prev)=> !prev)}
            />
            <label htmlFor="isNumber">Number</label>
          </div>
          <div className="password-specialCharacters flex justify-center items-center gap-2">
            <input 
              type="checkbox" 
              id="isChracter" 
              defaultChecked={isSpecialCharacters} 
              onChange={()=> setIsSpecialCharacters((prev)=> !prev)}
            />
            <label htmlFor="isChracter">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
