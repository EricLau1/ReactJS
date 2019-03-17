import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../actions';

class MyApp extends Component {

    render() {
        const { number, incr, decr } = this.props;
        console.log(this.props);
        return (
            <div className="app">
                <span>
                    <button className="btn" onClick={() => decr()}> - </button>
                    {number} 
                    <button className="btn" onClick={() => incr()}> + </button>
                </span>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    number: state.values.number
});

export default connect(mapStateProps, actions)(MyApp);