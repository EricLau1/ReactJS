import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'jquery';

import CustomInput from '../CustomInput';
import Header from '../Header';

import HandlerErrors from '../../errors';

import '../../css/pure-min.css';
import '../../css/side-menu.css';

class FormAuthor extends Component {

    Uri = 'http://localhost:8080/api/autores';

    constructor() {
        super();
        this.state = {
            model: { nome: '', email: '', senha: '' }
        };
        this.sendForm = this.sendForm.bind(this);
        this.enviaForm = this.enviaForm.bind(this);
    }

    // envia um POST com FETCH
    enviaForm = (e) => {
        e.preventDefault();
        const Uri = 'http://localhost:8080/api/autores';
        const { model } = this.state;
    
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(model),
            headers: new Headers({
              'Content-type': 'application/json'
            })
        };
    
        fetch(Uri, requestInfo)
            .then(response => {
                if(response.ok) return response.text();
                throw new Error("Oops! Ocorreu um erro! :(");
            })
            .then(data => {
                this.setState({ model: {nome: '', email: '', senha: ''} });
                // definindo um evento que está disponível para outros componentes que se inscreverem neste evento
                PubSub.publish('update-author-list', data);
            })
            .catch(e => console.log(e));
    }
    
    // Envia um POST com JQUERY
    sendForm = (e) => {
        e.preventDefault();
        const { model } = this.state;
        $.ajax({
          url: this.Uri,
          contentType: 'application/json', // formato dos dados que serão enviados
          dataType: 'json', // formato dos dados que serão recebidos
          type: 'POST',
          data: JSON.stringify(model),
          success: (response) => {
            this.setState({ model: {nome: '', email: '', senha: ''} });

            // definindo um evento que está disponível para outros componentes que se inscreverem neste evento
            PubSub.publish('update-author-list', response);
          },
          error: (e) => {
              // verificando erros de validação
              if (e.status === 400) {
                new HandlerErrors().publishErrors(e.responseJSON);
              }
          },
          beforeSend: () => {
              PubSub.publish('clear-errors', {});
          }
        });
    } 

    alterFieldValue = (nameField, e) => {
        var { model }  = this.state;
        model[nameField] = e.target.value;
        this.setState({ model });
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="POST">

                  <CustomInput id="nome" type="text" name="nome" value={this.state.model.nome} 
                  label="Nome" onChange={this.alterFieldValue.bind(this, 'nome')}/>

                  <CustomInput id="email" type="email" name="email" value={this.state.model.email} 
                  label="Email" onChange={this.alterFieldValue.bind(this, 'email')} />

                  <CustomInput id="senha" type="password" name="senha" value={this.state.model.senha} 
                  label="Senha" onChange={this.alterFieldValue.bind(this,'senha')} />

                  <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                  </div>
                </form>             
            </div>
        );
    }
}

class ListAuthor extends Component {

    render() {
        return (
            <div className="data-table">  
                {
                    this.props.authors.length > 0?           
                    <table className="pure-table">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                            this.props.authors.map((author) => {
                                return (
                                <tr key={author.id}>
                                    <td>{author.id}</td>
                                    <td>{author.nome}</td>
                                    <td>{author.email}</td>
                                </tr>
                                );
                            })
                            }
                        </tbody>
                    </table> : ''                   
                }
            </div> 
                 
        );
    }

}

export default class AuthorBox extends Component {

    Uri = 'http://localhost:8080/api/autores';

    constructor() {
        super();
        this.state = {
            authors: []
        };
    }

    // componentWillMount é executado antes do RENDER
    // componentDidMount é executado depois do RENDER
    componentDidMount() {
        $.ajax({
            url: this.Uri,
            dataType: 'json',
            success: (response) => {
                this.setState({ authors: response });
            }
        });

        // se inscreve em algum evento disparado por outro componente
        PubSub.subscribe('update-author-list', (topic, authors) => { 
            // o primeiro parametro se refere ao evento e o segundo aos dados que ele esta enviando
            this.setState({ authors });
        });
    }

    render() {
        return (
            <div>
                <Header title="Cadastro de Autores" />
                <div className="content" id="content">
                    <FormAuthor />
                    <ListAuthor authors={this.state.authors} />
                </div>
            </div>
        );
    }
}