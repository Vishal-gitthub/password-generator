import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [copyBtn, setCopyBtn] = useState("copy");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [length, setLength] = useState(6);
  const [password, setPassword] = useState("");
  const copy = useRef(null);
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (symbolAllowed) str += "$%*&?@!~-_+";
    for (let i = 0; i < length; i++) {
      const chars = Math.floor(Math.random() * str.length + 1);
     
      pass += str.charAt(chars);
    }
    setPassword(pass);
  }, [numberAllowed, symbolAllowed, length, setPassword]);
  const copyToClipBoard = useCallback(() => {
    copy.current?.select();
    setCopyBtn("copied");
    setTimeout(() => {
      setCopyBtn("copy");
    }, 2000);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, numberAllowed, symbolAllowed, length]);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-gray-300 flex-col">
        <div>
          <input
            type="text"
            value={password}
            className="p-3 w-96 outline-0"
            readOnly
            ref={copy}
          />
          <button
            className="bg-red-700 text-white py-3 px-5"
            onClick={copyToClipBoard}
          >
            {copyBtn}
          </button>
        </div>

        <div className="flex mt-6 gap-3 items-center">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="symbol"
              className="h-5 w-5"
              defaultChecked={symbolAllowed}
              onChange={() => {
                setSymbolAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="symbol">Symbol</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="num"
              className="h-5 w-5"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="num">Numbers</label>
          </div>
          <div>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range">{length}</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
