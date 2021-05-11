import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [qr, setQR] = useState("");

  useEffect(() => {
    axios.get("/qr").then((item) => {
      setQR(item.data.img)
    });
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth', {"token" : value}).then(res => {
      console.log(res)
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={qr} className="App-logo" alt="logo" />

        <input type="text" onChange={handleInput} />
        <button onClick={handleSubmit}>BUTTON</button>
      </header>
    </div>
  );
}

export default App;
