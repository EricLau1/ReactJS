import React, { Component } from 'react';

import Header from './components/Header';
import ProductBox from './components/Product';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Header />
        <ProductBox />
      </div>
    );
  }
}

export default App;
