import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';

class App extends Component {

  componentDidMount() {
    this.props.loadWallets();
  }

  render() {
    const { data } = this.props.wallets;
    return (
      <table>
        {
          data.map(item => (
            <tr key={item.id}> 
              <td>{item.owner.first_name}, </td> 
              <td>${item.cash}</td>
              <td> 
                <button onClick={e => this.props.addCash({ public_key: item.public_key, cash: 10.0 }, () => this.props.loadWallets())}>Add $$</button>
              </td>
            </tr>
          ))
        }
      </table>
    );
  }
}

const mapStateToProps = state => ({
    wallets: state.wallets,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
