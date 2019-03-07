import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import AuthorBox from './components/Author';
import BookBox from './components/Book';

class App extends Component {

  render() {
    return (
      <Router >
        <div id="layout">
          <nav>
            <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
              </a>
              <div id="menu">
                  <div className="pure-menu">
                      <a className="pure-menu-heading" href="/">Company</a>

                      <ul className="pure-menu-list">
                          <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                          <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                          <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
                      </ul>
                  </div>
              </div>
          </nav>
            <div id="main">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/autor" component={AuthorBox} />
                <Route path="/livro" component={BookBox} />
              </Switch>
            </div>            
        </div>
      </Router>
    );
  }
}

export default App;
