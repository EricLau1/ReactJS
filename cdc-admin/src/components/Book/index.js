import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

import CustomInput from '../CustomInput';
import Header from '../Header';
import HandlerErrors from '../../errors';

class FormBook extends Component {

    UriLivros = 'http://localhost:8080/api/livros';

    constructor() {
        super();
        this.state = {
            model: { titulo: '', preco: '', autorId: ''}
        };
        this.sendForm = this.sendForm.bind(this);
    }

    sendForm = (e) => {
        e.preventDefault();
        const { model } = this.state;
        $.ajax({
            url: this.UriLivros,
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(model),
            success: (response) => {
                this.setState({ model: {titulo: '', preco: '', autorId: '' } });
                this.props.callbackReloadBookList(response);
            },
            error: (e) => {
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
                <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="POST" >
                    <CustomInput id="titulo" type="text" name="titulo" value={this.state.model.titulo} 
                    label="Título" onChange={this.alterFieldValue.bind(this, 'titulo')}/>

                    <CustomInput id="preco" type="text" name="preco" value={this.state.model.preco} 
                    label="Preço" onChange={this.alterFieldValue.bind(this, 'preco')} />

                    <div className="pure-control-group">
                        <label htmlFor="autor">Autor</label> 
                        <select value={this.state.model.autorId} name="autorId" onChange={this.alterFieldValue.bind(this, 'autorId')}>
                            <option value="">Selecione</option>
                            {
                                this.props.autores.map((autor) => {
                                    return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>             
            </div>
        );
    }

}

class ListBook extends Component {

    render() {
        return (
            <div className="data-table">  
                {
                    this.props.livros.length > 0?           
                    <table className="pure-table">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                            this.props.livros.map((livro) => {
                                return (
                                <tr key={livro.id}>
                                    <td>{livro.id}</td>
                                    <td>{livro.titulo}</td>
                                    <td>R$ {livro.preco},00</td>
                                    <td>{livro.autor.nome}</td>
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

export default class BookBox extends Component {

    UriLivros = 'http://localhost:8080/api/livros';
    UriAutores = 'http://localhost:8080/api/autores';
 
    constructor() {
        super();
        this.state = {
            autores: [],
            livros: [],
        };
    }

    componentWillMount() {
        $.ajax({
            url: this.UriLivros,
            dataType: 'json',
            success: (response) => {
                console.log(response);
                this.setState({ livros: response });
            }
        });

        $.ajax({
            url: this.UriAutores,
            dataType: 'json',
            success: (response) => {
                this.setState({ autores: response });
            }
        });
    }

    reloadBookList = (livros) => {
        this.setState({ livros });
    }

    render() {
        return (
            <div>
                <Header title="Cadastro de Livros" />
                <div className="content" id="content">
                    <FormBook autores={this.state.autores} callbackReloadBookList={this.reloadBookList} />
                    <ListBook livros={this.state.livros} />
                </div>
            </div>
        );
    }
}