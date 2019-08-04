import React, { Component } from 'react';
import Menu from '../../../components/Menu';
import Title from '../../../components/Title';
import { users } from '../../../../utils/data';
import './styles.css';

class UserDetails extends Component {

    state = {
        user: undefined,
    };

    componentDidMount() {
        const { params } = this.props.match;
        if(!!params) {
            const found = users.filter(u => u.username === params.username);
            if (found.length === 1) {
                this.setState({user: found[0]});
            } else {
                this.setState({user: undefined});
            }
        } 
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                <Menu />
                <Title 
                    title={ !!user ? user.username : 'Usuário não existe' }
                />
                {this.renderDetails(user)}
            </div>
        )
    }

    renderDetails(user){
        if(!!user) {
            return (
                <table className="table-details">
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td>Nome</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Endereço</td>
                            <td>{user.address.street} {user.address.suite}</td>
                        </tr>
                        <tr>
                            <td>Cidade</td>
                            <td>{user.address.city}</td>
                        </tr>
                        <tr>
                            <td>CEP</td>
                            <td>{user.address.zipcode}</td>
                        </tr>
                        <tr>
                            <td>Telefone</td>
                            <td>{user.phone}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td>{user.website}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
}

export default UserDetails;