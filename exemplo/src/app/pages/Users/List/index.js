import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { users } from '../../../../utils/data';

class UsersList extends Component {
    render() {
        return (
            <ul>
                {
                    users.map(user => {
                        return (
                            <li key={user.id}> 
                                <Link to={`/users/${user.username}`}>
                                    {user.name}
                                </Link> 
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}

export default UsersList;
