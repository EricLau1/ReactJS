import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class CustomerSort extends React.Component {

    render() {
        const { orderBy } = this.props;
        return (
            <div className="customer-sort">
                <select
                    value={orderBy || 'asc'}
                    onChange={this.props.sortCustomers} >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Decrescente</option>
                    <option value="createdAt">Data de criação</option>
                </select>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orderBy: state.customers.orderBy,
});

export default connect(mapStateToProps, actions)(CustomerSort);