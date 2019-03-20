import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Customer extends React.Component {

    state = {
        confirm: false
    }

    destroy = () => {
        const { confirm } = this.state;
        if(!confirm) {
            this.setState({ confirm: !this.state.confirm });
            return;
        }
        this.props.removeCustomer(this.props.customer.id);
        this.setState({ confirm: !this.state.confirm });
    }

    update = () => {
        this.props.prepareUpdate(this.props.customer);
    }

    render() {
        const { customer } = this.props;
        return (
            <tr>        
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.cpf}</td>
                <td>
                    <button onClick={this.update}>
                        Atualizar
                    </button>                
                </td>
                <td>
                    <button onClick={this.destroy}>
                        {this.state.confirm? 'certeza?':'excluir'}
                    </button>
                </td>
            </tr>
        );
    }
}

export default connect(null, actions)(Customer);
