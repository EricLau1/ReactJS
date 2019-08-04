import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import Title from '../../components/Title';

class Index extends Component {
    render() {
        return (
            <div>
                <Menu />
                <Title title={"Home"} />
                <Link to="/posts">publicações</Link>
            </div>
        )
    }
}

export default Index;
