import { useCallback, useState, useEffect, useRef } from 'react';

function App() {

  const [pass, setPass] = useState("");
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  
  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) {
      str += "0123456789";
    }
    if (char) {
      str += "~`!@#$%^&*()-_=+{}:/?><.,";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPass(pass);
  }, [length, num, char]);

  useEffect(() => {
    passGenerator();
  }, [length, num, char]);

  const passwordRef = useRef(null);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  return (
    <div className="w-full h-screen bg-[#000] text-orange-400 flex justify-center items-center p-4 sm:p-6 md:p-8">

      <div className="bg-gray-800 p-6 rounded-lg w-full sm:w-[400px] md:w-[500px]">

        <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center">Password Generator</h1>

        <div className="flex mt-4">
          <input 
            type="text" 
            className="w-full outline-none h-10 rounded-sm px-4 font-semibold"
            value={pass}
            ref={passwordRef}
            readOnly
          />
          <button 
            className="bg-blue-700 px-4 text-white rounded font-semibold ml-2 transform hover:scale-105 transition-transform duration-300" 
            onClick={copyPass}>
            COPY
          </button>
        </div>

        <div className="mt-3 text-sm flex flex-col sm:flex-row gap-4 sm:gap-2">
          <div className="flex items-center gap-x-1 w-full">
            <input 
              type="range" 
              min={6}
              max={50}
              value={length} 
              className="cursor-pointer w-full"
              onChange={(e) => setLength(e.target.value)} 
            />
            <label className="w-full text-center sm:text-left">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 w-full">
            <input 
              type="checkbox" 
              checked={num}
              onChange={() => setNum(prev => !prev)} 
            />
            <label>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 w-full">
            <input 
              type="checkbox" 
              checked={char}
              onChange={() => setChar(prev => !prev)} 
            />
            <label>Characters</label>
          </div>
        </div>
        
      </div>

    </div>
  );
}

export default App;
