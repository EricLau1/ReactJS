import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import './styles.css';
class CustomInput extends Component {

    constructor() {
        super();
        this.state = {
            errorMessage: ''
        }

    }
    
    componentDidMount() {
        PubSub.subscribe('validation-error', (topic, error) => {
            if (error.field === this.props.name) {
                const message = `${error.field} ${error.defaultMessage}`.toLocaleLowerCase();
                this.setState({errorMessage: message});
                console.log(message);
            }  
        });

    }
    
    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <input {...this.props} />                  
                <span className="errors"> { this.state.errorMessage } </span>
            </div>
        );
    }
}

export default CustomInput;