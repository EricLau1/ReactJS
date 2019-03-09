import React, { Component } from 'react';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
    }

    componentDidMount() {
        const message = this.props.location.state? this.props.location.state.msg : '';
        this.setState({ message });
    }

    signIn = (e) => {
        e.preventDefault();    
        
        var requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.usuario.value,
                senha: this.senha.value,
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        } 

        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.text();
                } 
                throw new Error('Não autorizado.');
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                this.props.history.push('/timeline');
            })
            .catch(e => this.setState({ message: e.message }));
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span className="error"> {this.state.message} </span>
                <form onSubmit={this.signIn}>
                    <input type="text" ref={input => this.usuario = input} />
                    <input type="password" ref={input => this.senha = input}/>
                    <input type="submit"  value="Logar" />
                </form>
            </div>
        );
    }
}