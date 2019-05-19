import React from 'react';
import UseStateExample from './UseStateExample';
import UseRefExample from './UseRefExample';
import UseReducerExample from './UseReducerExample';

function App() {

  return (
    <div className="App">
        <h1> React Hooks </h1>
        < hr />
        <h3> useState() Example</h3>
          <UseStateExample />
        <hr />
        <h3> useRef() Example</h3>
          <UseRefExample />
        <hr />
        <h3> useRef() Example</h3>
          <UseReducerExample />
        <hr />
    </div>
  );
}

export default App;
