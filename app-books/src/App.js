import React, { Component } from 'react';
import axios from 'axios';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Table, 
  Button, 
  FormGroup, 
  Input, 
  Label,
  Alert
} from 'reactstrap';

class App extends Component {

  Url = 'http://localhost:8080/api/books';

  state = {
    books: [],
    newBookData: {
      title: '',
      rating: '',
    },
    editBookData: {
      id: '',
      title: '',
      rating: '',
    },
    newBookModal: false,
    editBookModal: false,
    flash: {
      message: '',
      alert: '',
      display: false
    },
  };

    /* 
      componentWillMount: É executado quando o componente estiver prestes a ser montado no DOM da página. Assim, após esse método ser executado o componente irá criar o nó no navegador. Todas as coisas que você deseja fazer antes do componente ser montado, devem ser definidas aqui. Este método é executado uma vez em um ciclo de vida de um componente e antes da primeira renderização.
      componentDidMount: Este é o método que é executado depois que o componente foi montado no DOM. Este método é executado uma vez em um ciclo de vida de um componente e será após a primeira renderização. Com esse método podemos acessar o DOM, devemos inicializar bibliotecas JS como D3 ou Jquery, que precisa acessa-lo
  */
  componentWillMount() {
    axios.get(this.Url)
      .then(response => {
        this.setState({ books: response.data, flash: {message: '', alert: '', display: false } });
      });
  }

  toggleNewBookModal = () => {

    let closeNewBookModal = this.state.newBookModal;

    this.setState({ newBookModal: !closeNewBookModal });
  }

  toggleEditBookModal = () => {
    this.setState({editBookModal: !this.state.editBookModal });
  }

  addBook = () => {
    const newBook = this.state.newBookData;
    axios.post(this.Url, newBook)
      .then((response) => {
        console.log(response);
        let { books } = this.state;
        books.push(response.data);
        const flash = { message: 'Novo livro adicionado com sucesso!', alert: 'success', display: true };
        this.setState({ books, newBookModal: !this.state.newBookModal, flash });
        this.flashTimer(5000);
      })
      .catch(e => console.log(e));
  };

  editBook = (book) => {
    this.setState({ editBookData: book, editBookModal: !this.state.editBookModal });
  }

  updateBook = () => {
    const updatedBook = this.state.editBookData;
    const { books } = this.state;
    axios.put(`${this.Url}/${updatedBook.id}`, updatedBook)
      .then(response => {
        const i = this.getPositionById(response.data.id);
        books[i] = response.data;
        const flash = { message: 'Livro atualizado com sucesso!', alert: 'info', display: true };
        this.setState({ books, editBookModal: !this.state.editBookModal, flash });
        this.flashTimer(5000);
      });
  }

  deleteBook = (id) => {
    axios.delete(`${this.Url}/${id}`)
      .then(response => {
        console.log(response);
        const books = this.state.books.filter(book => book.id !== id);
        const flash = { message: 'Livro deletado com sucesso!', alert: 'warning', display: true };
        this.setState({ books, flash });
        this.flashTimer(5000);
      })
  }

  getPositionById = (id) => {
    const { books } = this.state;
    for(var i = 0; i < books.length; i++) {
      if (books[i].id === id ) return i;
    }
    return null;
  } 

  flashTimer = (duration) => {
    setTimeout(() => {
      if(this.state.flash.display) {
        this.setState({flash: {message: '', alert: '', fadeIn: false, display: false } });
      }
    }, duration);
  }

  render() {

    const books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{ book.id }</td>
          <td>{ book.title }</td>
          <td>{ book.rating }</td>
          <td>
            <Button outline color="info" size="sm" className="mr-2" onClick={this.editBook.bind(this, book)}> 
              Editar 
            </Button>
            <Button outline color="danger" size="sm"  className="" onClick={this.deleteBook.bind(this, book.id)}> Excluir </Button>
          </td>
      </tr>
      );
    });

    return (
      <div className="App container">
        <header>
          <h1 className="text-center text-muted"> <strong> Aplicativo de Livros </strong> </h1>
        </header>

        <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}> Add Book </Button>

        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Adicionar um novo livro</ModalHeader>
          <ModalBody>

            <FormGroup>
              <Label for="title">Titulo</Label>
              <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                let { newBookData } = this.state;
                newBookData.title = e.target.value;
                this.setState({ newBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="rating">Nota</Label>
              <Input  id="rating"  value={this.state.newBookData.rating} onChange={(e) => {
                let { newBookData } = this.state;
                newBookData.rating = e.target.value;
                this.setState({ newBookData });
              }} placeholder="Ex: 4.5" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>Salvar</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Fechar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)} >
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Atualizar livro</ModalHeader>
          <ModalBody>

            <FormGroup>
              <Label for="title">Titulo</Label>
              <Input id="title" value={this.state.editBookData.title} onChange={(e) => {
                let { editBookData } = this.state;
                editBookData.title = e.target.value;
                this.setState({ editBookData });
              }} />
            </FormGroup>

            <FormGroup>
              <Label for="rating">Nota</Label>
              <Input  id="rating"  value={this.state.editBookData.rating} onChange={(e) => {
                let { editBookData } = this.state;
                editBookData.rating = e.target.value;
                this.setState({ editBookData });
              }} placeholder="Ex: 4.5" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>Salvar</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Fechar</Button>
          </ModalFooter>
        </Modal>

        { this.state.flash.display? 
            <Alert color={this.state.flash.alert}> {this.state.flash.message}  </Alert>: 
        ''}

        <Table className="text-center table-bordered rounded">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { books }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
