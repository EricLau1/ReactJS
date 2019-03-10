import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <header>
                <h1 className="text-center font-weight-bold">{this.props.title?this.props.title:'Title'}</h1>
            </header>
        );
    }
}