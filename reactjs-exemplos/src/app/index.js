import React from 'react';
import Title from './components/Title'
import LazyLoadingExample from './LazyLoading';
import ContextExample  from './Context';
import ReduxExample from './Redux';
import '../assets/styles.css';
import { Provider } from 'react-redux';
import Store from './Redux/store';

const Examples = props => (
  <main className="examples">
    <Title />
    <div className="example-item">
      <LazyLoadingExample />
    </div>
    <div className="example-item">
      <ContextExample />
    </div>
    <div className="example-item">
      <ReduxExample />
    </div>
  </main>
);

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Examples />
      </Provider>
    );
  }
}

export default App;
