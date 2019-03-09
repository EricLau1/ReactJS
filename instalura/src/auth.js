import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* 
    Referência:

        https://reacttraining.com/react-router/web/example/auth-workflow

        8 mar 2019 T19:15
    
*/

const isAutenticado = () => {
    
    if(localStorage.getItem('auth-token') !== null) {
        return true;
    }
    return false;
}

const hasParams = (props) => {
    const { login } = props.match.params;
    if (login) {
        return true;
    }
    return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => {

                if(hasParams(props)) {
                    console.log('rota publica');
                    return (
                        <Component {...props} />
                    );
                }

                console.log('rota privada');
                return (
                    isAutenticado() ? (
                        <Component {...props} />
                    ) : (
                        <Redirect 
                            to={{
                                pathname: '/',        
                                state: { msg: 'Usuário não autenticado' }
                            }}
                        />
                    )
                );
            }} />
    );
}

export default PrivateRoute;