import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

const Routes = () => (
    <Router>
        <Switch>
            {
                routes.map(route => <Route {...route} />)
            }
        </Switch>
    </Router>
);

export default Routes;
