import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppExemplo from './components/appexemplo';

class App extends Component {
  render() {
    return (
      <Provider store={store} >
          <div className="App">
              <AppExemplo />
          </div>
      </Provider>
    );
  }
}

export default App;
