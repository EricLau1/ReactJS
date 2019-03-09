import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import App from './App';
import PrivateRoute from './auth';
import Logout from './components/Logout';

/* 
    Referência:

        https://reacttraining.com/react-router/web/example/auth-workflow

        8 mar 2019 T19:15
    
*/
const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/timeline/:login?" component={App} />
            <Route path="/logout" component={Logout} />
        </Switch>
    </Router>
);

export default Routes;