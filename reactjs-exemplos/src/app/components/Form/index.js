import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onHandleInputValue } from '../../Redux/store/actions';
import { clickButton } from '../../Redux/store/actions';

class Form extends Component {
    render() {
        const { inputValue, onHandleInputValue, clickButton } = this.props;
        console.log(this.props);
        return (
            <div>
                <input 
                    type='text' 
                    value={inputValue} 
                    onChange={e => onHandleInputValue(e.target.value)}
                />
                <button onClick={e => clickButton(inputValue)}>Click me!</button>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    inputValue: store.inputState.inputValue
});

const mapDispatchToProps = dispatch => bindActionCreators({ onHandleInputValue, clickButton }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
