import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FotoAtualizacoes extends Component {
  
    like = (e) => {
      e.preventDefault();
      this.props.like(this.props.foto.id);
    }

    comenta = (e) => {
      e.preventDefault();
      this.props.comenta(this.props.foto.id, this.comentario.value);
      this.comentario.value = '';
    }

    render(){
        return (
            <section className="fotoAtualizacoes">
              <span className={this.props.foto.likeada? 'fotoAtualizacoes-like-ativo': 'fotoAtualizacoes-like'} 
              onClick={this.like}>Likar</span>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"
                  ref={ input => this.comentario = input }/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>
            </section>            
        );
    }
}

class FotoInfo extends Component {

    render(){
        return (
            <div className="foto-in fo">
              <div className="foto-info-likes">
                {
                  this.props.foto.likers.length > 0 ?  
                    this.props.foto.likers.map(liker =>  <a href="/" key={liker.login}> {liker.login}, </a>) : ''
                }
                {this.props.foto.likers.length > 0? ' curtiram': ''}
              </div>

              <p className="foto-info-legenda">
                <span className="foto-info-autor" href="/"> {this.props.foto.loginUsuario} </span>
                {this.props.foto.comentario}
              </p>

              <ul className="foto-info-comentarios">
                {
                  this.props.foto.comentarios.map(comentario => {
                      return  (
                        <li className="comentario" key={comentario.id}>
                          <span className="foto-info-autor" >{comentario.login} </span>
                          {comentario.texto}
                        </li>
                      );
                  })
                }
              </ul>
            </div>            
        );
    }
}

class FotoHeader extends Component {
    render(){
        return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src="https://i.ibb.co/t4BVTKL/gwen-stacy.jpg" alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                    {this.props.foto.loginUsuario}
                  </Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{this.props.foto.horario}</time>
            </header>            
        );
    }
}

export default class FotoItem extends Component {
  
    render() {
        return (
          <div className="foto">
            <FotoHeader foto={this.props.foto} />
            <img alt="foto" className="foto-src" src="https://i.ibb.co/smZ36fC/Dubai-1.jpg"/>
            <FotoInfo foto={this.props.foto}/>
            <FotoAtualizacoes {...this.props} />
          </div>            
        );
    }
}