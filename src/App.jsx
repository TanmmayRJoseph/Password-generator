import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passref = useRef(null);
  const passwordgenrator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "+-_!@#$%&*{}[]~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgenrator();
  }, [length, numberAllowed, charAllowed, passwordgenrator]);
  return (
    <div className="parent">
      <div className="main">
        <h1>Password generator</h1>
        <input
          className="inpu"
          type="text"
          value={password}
          placeholder="password"
          readOnly
          ref={passref}
        />
        <button onClick={copyToClipboard} className="copy">
          Copy
        </button>
        <input
          className="cursor"
          type="range"
          min={6}
          max={32}
          value={length}
          onChange={(e) => {
            setlength(e.target.value);
          }}
        />
        <label>length:{length}</label>
        <input
          className="check"
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => {
            setnumberAllowed((prev) => !prev);
          }}
        />
        <label>Numbers</label>
        <input
          className="check"
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => {
            setcharAllowed((prev) => !prev);
          }}
        />
        <label>character</label>
      </div>
    </div>
  );
}

export default App;
