import React, { Component } from 'react'

class Bold extends Component {
    render() {
        return <span style={{fontWeight: 'bold'}}>{this.props.children}</span>
    }
}

export default Bold;
