import React, { Component } from 'react';
import Title from '../components/Title';
import Message from '../components/Message';
import Form from '../components/Form';
import { connect } from 'react-redux';

class ReduxExample extends Component {

    render() {
        const { newValue } = this.props;
        console.log(this.props);
 
        return (
            <div>
                <Title title="Redux" />
                <Form />
                <br />
                <Message bold italic message={newValue} />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    newValue: store.clickState.newValue,
});

export default connect(mapStateToProps)(ReduxExample);