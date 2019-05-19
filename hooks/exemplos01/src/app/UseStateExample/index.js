import React, { useState } from 'react';

function UseStateExample() {
  
  const [inputText, setInputText] = useState("");

  return (
    <div className="App">
      <input 
        onChange={e => setInputText(e.target.value)}
      /><br/>
      {inputText}
    </div>
  );
}

export default UseStateExample;
