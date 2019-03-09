import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class Header extends Component {

    pesquisa = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8080/api/public/fotos/${this.loginPesquisado.value}`)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('Erro ao pesquisar');
        })
        .then(json => {
          PubSub.publish('timeline', { fotos: json });
        })
        .catch(e => console.log(e.message));
    }

    render(){
        return (
        <header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>

          <form className="header-busca" onSubmit={this.pesquisa}>
            <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo"
              ref={input => this.loginPesquisado = input}/>
            <input type="submit" value="Buscar" className="header-busca-submit"/>
          </form>


          <nav>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="/">
                  ♡
                  {/*                 ♥ */}
                  {/* Quem deu like nas minhas fotos */}
                </a>
              </li>
            </ul>
          </nav>
        </header>            
        );
    }
}