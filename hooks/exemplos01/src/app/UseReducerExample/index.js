import React, { useState, useReducer, useEffect } from 'react';
import { useInterval } from '../UseInterval';

function UseReducerExample() {
    
    const validateEmail = email => {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const [emailValid, setEmailValid] = useState(false);
    const reducer = (state, action) => {
        state = action;
        setEmailValid(validateEmail(state))
        return action;
    }

    const [email, setEmail] = useReducer(reducer, "");

    const secondsFormValidFor = 10;
    const [count, setCount] = useState(secondsFormValidFor);
    
    useInterval(() => {
        setCount(count - 1);
        return;
    }, count > 0 ? 1000 : null)

    return (
        <div>
            <input 
                disabled={count <= 0}
                value={email}
                onChange={e => {
                    setEmail(e.target.value)
                }}
                placeholder="Enter Email"
                type="email"
                name="email"
                required
            />
            &nbsp;&nbsp;&nbsp;
            <button
                disabled={!emailValid || count <= 0}
                onClick={() => alert(`email digitado ${email}`)}
                type="submit"
            > 
                CLIQUE AQUI
            </button>
            <div>
                {
                    count > 0 ? `Você tem ${count} segundos para digitar seu email` : 'Times up!'
                }
            </div>
        </div>
    );
}

export default UseReducerExample;