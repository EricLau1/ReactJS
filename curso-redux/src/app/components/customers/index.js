import React from 'react';

import CustomerSort from './list/sort';
import CustomerSearch from './list/search';
import CustomerList from './list';
import CustomerForm from './create';

const Options = () => (
    <div className="options">
        <div>
            <CustomerSort />
        </div>
        <div>
            <CustomerSearch />
        </div>
    </div>
);

export default class Customers extends React.Component {
    render() {
        return (
            <div className="customers">
                <header className="main-header">
                    <h2> Lista de Clientes </h2>
                </header>
                <hr />
                <CustomerForm />
                <br />
                <Options />
                <br />
                <CustomerList />
            </div>
        );
    }
}