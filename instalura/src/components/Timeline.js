import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import FotoItem from './Foto';
import { CSSTransitionGroup } from 'react-transition-group';

export default class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fotos : [],
    }
    this.login = this.props.login;
  }

  componentDidMount() {
    this.loadTimeline();
  }

  // renderiza novamente quando alguma proprieade tem seu valor atualizado.
  componentWillReceiveProps(nextProps) {
    if(nextProps.login !== undefined) {
      this.login = nextProps.login;
      this.loadTimeline();
    }
  }

  componentWillMount() {
    PubSub.subscribe('timeline', (topic, json) => {
      console.log(json.fotos);
      if(json.fotos.length > 0) {
        this.setState({ fotos: json.fotos });
      }
    });

    PubSub.subscribe('atualiza-liker', (topic, likerInfo) => {
      const fotoEncontrada = this.state.fotos.find(foto => foto.id === likerInfo.fotoId);
      fotoEncontrada.likeada = !fotoEncontrada.likeada;
      const possivelLiker = fotoEncontrada.likers.find(liker => liker.login === likerInfo.liker.login);
      if(possivelLiker === undefined) { 
        fotoEncontrada.likers.push(likerInfo.liker);
      } else {
        const likers = fotoEncontrada.likers.filter(liker => liker.login !== likerInfo.liker.login);
        fotoEncontrada.likers = likers;
      }
      this.setState({ fotos: this.state.fotos });
    });

    PubSub.subscribe('novo-comentario', (topic, comentarioInfo) => {
      const fotoEncontrada = this.state.fotos.find(foto => foto.id === comentarioInfo.fotoId);
      fotoEncontrada.comentarios.push(comentarioInfo.comentario);
      this.setState({ fotos: this.state.fotos });
    });

  }

  loadTimeline = () => {
    let Url = this.setupUrl();
    fetch(Url)
      .then(response => response.json())
      .then(json => {
        this.setState({ fotos: json });
      });
  }

  setupUrl = () => {
    if (this.login !== undefined) {
      return `http://localhost:8080/api/public/fotos/${this.login}`;
    } 
    const token = localStorage.getItem('auth-token');
    return `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${token}`;
  }

  getToken = () => {
    const token = localStorage.getItem('auth-token');
    return token;
  }

  like = (fotoId) => {
    fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${this.getToken()}`, {method: 'POST'})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Oops! Ocorreu um erro. :(');
    })
    .then(json => {
      PubSub.publish('atualiza-liker', {fotoId: fotoId, liker: json });
    })
    .catch(e => console.log(e.message));
  }

  comenta = (fotoId, comentario) => {

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ texto: comentario }),
      headers: new Headers({
        'Content-type': "application/json"
      })
    };

    fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${this.getToken()}`, requestInfo)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Oops! Ocorreu um erro. :(');
    })
    .then(json => {
      PubSub.publish('novo-comentario', { fotoId: fotoId,  comentario: json });
    })
    .catch(e => console.log(e.message));
  }

  render(){
      return (
      <div className="fotos container">
        <CSSTransitionGroup
          transitionName="timeline"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
            {
              this.state.fotos.map(foto => {
                return(
                  <FotoItem key={foto.id} foto={foto} like={this.like} comenta={this.comenta} />
                );
              })
            }
        </CSSTransitionGroup>

      </div>            
      );
  }
}