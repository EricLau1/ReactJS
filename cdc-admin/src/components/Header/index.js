import React, { Component } from 'react';

export default class Header extends Component {

    render() {
        return (
            <header className="header">
                <h1>{this.props.title !== ''? this.props.title: 'Olá, seja bem vindo!'}</h1>
            </header>
        );
    }
}