import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import './styles.css';

const Input = (props) => (
    <div>
        {
            props.label? (
                <label htmlFor={props.label.for}> {props.label.text}: </label>
            ) : ''
        }
        <input 
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            type={props.inputType || 'text'}
        />
        {props.error && <span className="error"><small>{props.error}</small></span>}
    </div>
);

const DEFAULT_STATE = {
    model: {
        id: 0,
        name: '',
        phone: '',
        email: '',
        cpf: ''
    },
    errors: {},
    displayForm: false,
};

class CustomerForm extends React.Component {

    state = DEFAULT_STATE;

    // recebe como parametro o props atualizado
    componentWillUpdate(nextProps) {
        // comparação do props atual com o props atualizado
        if(!this.props.customer && nextProps.customer) {
            this.setState({         
                model: nextProps.customer,
                errors: {},
                displayForm: true, 
            });
            return;
        }

        if( this.props.customer && !nextProps.customer) {
            this.setState(DEFAULT_STATE);
        }

     }

    validate = () => {
        const { model } = this.state;
        var errors = {};
        ['name', 'email', 'phone', 'cpf'].forEach(item => {
            if(model[item] === '') errors[item] = `${item} is required`;
        });
        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

   

    setInputValue = (field, event) => {
        event.preventDefault();
        const { model } = this.state;
        model[field] = event.target.value;
        this.setState({ model }, () => {
            this.validate();
        });
    }

    save = () => {
        const { model } = this.state;
        if( !this.validate()) return;
        if(this.props.customer) {
            const { customer } = this.props;
            this.props.updateCustomer(customer.id, customer);
        } else {
            this.props.createCustomer(model);
        }
        this.setState(DEFAULT_STATE);
        this.display();
    }

    form = () => {
        const { model, errors } = this.state;
        return (
            <div className="customer-form">


                <Input 
                    value={model.name} 
                    onChange={e => this.setInputValue('name', e) }
                    placeholder="Digite seu nome"
                    label={{for:'name', text:'Nome'}}
                    error={errors.name} />
        
                <Input 
                    value={model.phone} 
                    onChange={e => this.setInputValue('phone', e) }
                    placeholder="Digite seu telefone"
                    label={{for:'phone', text:'Telefone'}} 
                    error={errors.phone} />
        
                <Input 
                    value={model.email} 
                    onChange={e => this.setInputValue('email', e) }
                    placeholder="Digite seu email"
                    label={{for:'email', text:'E-mail'}} 
                    error={errors.email} />
        
                <Input 
                    value={model.cpf} 
                    onChange={e => this.setInputValue('cpf', e) }
                    placeholder="Digite seu cpf"
                    label={{for:'cpf', text:'CPF'}} 
                    error={errors.cpf} />
        
                <div className='customer-form-buttons'>
                    <button onClick={this.save}>Salvar</button>
                </div>
            </div>
        );
    }

    display = () => {
        this.setState({ displayForm: !this.state.displayForm });
    }

    displayButton = () => {
        if(!this.displayForm) {
            return (
                <div>
                    <button onClick={this.display}>Adicionar Cliente</button>
                </div>
            );
        }
        return null;
    }

    render() {
        return this.state.displayForm? this.form() : this.displayButton();
    }

}

const mapStateToProps = state => ({
    customer: state.customers.customer,
});

export default connect(mapStateToProps, actions)(CustomerForm);