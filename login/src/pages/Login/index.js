import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import Header from '../../components/Header';

export default class Login extends Component {


    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            message: this.props.location.state? this.props.location.state.message: '',
        };
    }

    signIn = () => {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({email: this.email, password: this.password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        fetch('http://localhost:9000/login', requestInfo)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw new Error("Login inválido")
            })
            .then(token => {
                localStorage.setItem('token', token);
                this.props.history.push('/admin');
                return
            })
            .catch(e => {
                this.setState({ message: e.message })
            }); 
    }

    render() {
        return (
            <div className="col-md-6">
                <Header title="ReactJS Login" />
                <Form>
                    {
                        this.state.message !== ''? (
                            <Alert color="danger" className="text-center">{this.state.message}</Alert>
                        ): ''
                    }
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password" onChange={e => this.password = e.target.value} placeholder="Informe sua senha"/>
                    </FormGroup>
                    <Button color="primary" className="btn-block" onClick={this.signIn}>Entrar</Button>
                </Form>
            </div>
        );
    }

}