import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import './styles.css';

import { CustomerService } from '../../../services';
import Customer from './customer';

class CustomerList extends React.Component {

    componentDidMount() {
        this.props.listCustomers();
    }

    sortCustomers = (a, b) => {
        const { orderBy } = this.props;
        return CustomerService.sort(orderBy, a, b);
    }

    searchCustomers = (customer) => {
        const { searchBy } = this.props;
        return CustomerService.search(customer, searchBy);
    }

    render() {
        const { customers } = this.props;
        return (
            <div className="customer-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th>CPF</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers
                                .filter(this.searchCustomers)
                                .sort(this.sortCustomers)
                                .map((customer, index) => (
                                <Customer customer={customer} key={index} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    customers: state.customers.customers,
    orderBy: state.customers.orderBy,
    searchBy: state.customers.searchBy,
});

export default connect(mapStateToProps, actions)(CustomerList);