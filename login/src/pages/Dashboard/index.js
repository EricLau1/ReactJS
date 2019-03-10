import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

export default class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            user: {},
        };
    }

    componentWillMount() {
        const token = localStorage.getItem('token');
        console.log(token);
        fetch('http://localhost:9000/admin', { headers: new Headers({'Authorization': `Bearer ${token}`}) })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Não autorizado")
            })
            .then(user => {
                this.setState({ user });
            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="container">
               <Header title="Dashboard"/>
               <hr className="my-4" />
               <p className="text-center">
                <code>{this.state.user.nickname}, logado com sucesso!</code>
               </p>
               <div className="text-center">
                    <Link  className="btn btn-outline-primary" to="/logout" > Logout </Link>
               </div>
            </div>
        );
    }
}