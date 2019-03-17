import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MyApp from './components/myapp';

class App extends Component {
  render() {
    return (
      <Provider store={store} >
          <div className="App">
              <MyApp />
          </div>
      </Provider>
    );
  }
}

export default App;
