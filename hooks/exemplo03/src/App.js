import React, { useReducer } from 'react';
import rootReducer from './flux/reducers';
import { addList, removeItem } from './flux/actions/actions';

function App() {

  const [state, dispatch] = useReducer(rootReducer, []);

  return (
    <div className="App">
      <h1>Add List</h1>
      <button onClick={() => dispatch(addList())} >New</button>
      
      {state.map(item => <div key={item.id}>{item.id} <button onClick={() => dispatch(removeItem(item.id))} >X</button></div>)}
    </div>
  );
}

export default App;
