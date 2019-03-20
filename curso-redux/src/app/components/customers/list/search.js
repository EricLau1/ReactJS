import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class CustomerSearch extends React.Component {

    render() {
        const { searchBy, searchCustomers } = this.props;
        return (
            <div>
                <input type="text" 
                    value={searchBy || ""} 
                    onChange={searchCustomers} 
                    placeholder="Pesquisar..." />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    searchBy: state.customers.searchBy
});

export default connect(mapStateToProps, actions)(CustomerSearch);