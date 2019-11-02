import React, { Component } from 'react'

class Italic extends Component {
    render() {
        return <span style={{fontStyle: 'italic'}}>{this.props.children}</span>
    }
}

export default Italic;