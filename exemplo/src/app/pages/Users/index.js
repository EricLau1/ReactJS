import React, { Component } from 'react'
import Menu from '../../components/Menu';
import Title from '../../components/Title';
import UsersList from './List';

class Users extends Component {

    render() {
        return (
            <div>
                <Menu />
                <Title title={"Usuários"} />
                <UsersList />
            </div>
        );
    }
}

export default Users;