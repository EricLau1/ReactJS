import React, { Component } from 'react';
import Menu from '../../components/Menu';
import Title from '../../components/Title';
import PostsList from './List';

class Posts extends Component {
    render() {
        return (
            <div>
                <Menu />
                <Title title="Publicações" />
                <PostsList />
            </div>
        )
    }
}

export default Posts;
