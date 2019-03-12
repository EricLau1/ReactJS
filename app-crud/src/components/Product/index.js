import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import PubSub from 'pubsub-js';

class FormProduct extends Component {

    state = { model: {id: 0, description: '', price: 0.0, quantity: 0} }

    create = () => {
        const { model } = this.state;
        this.props.createProduct(model);
        this.setState({ model: {id: 0, description: '', price: 0.0, quantity: 0}});
    }

    setValues = (e, field) => {
        let { model } = this.state;
        model[field] = e.target.value; 
        this.setState({ model });
    }

    componentDidMount() {
        PubSub.subscribe('edit-product', (topic, product) => {
            this.setState({ model: product });
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="description">Descrição:</Label>
                    <Input id="description" type="text" value={this.state.model.description} placeholder="Descrição do produto" 
                    onChange={e => this.setValues(e, 'description')} />
                </FormGroup>
                <div className="form-row">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label for="price">Preço:</Label>
                            <Input id="price" type="text" value={this.state.model.price} placeholder="R$" 
                            onChange={e => this.setValues(e, 'price')}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label for="quantity">Quantidade</Label>
                            <Input id="quantity" type="text" value={this.state.model.quantity}  placeholder="Quantidade disponível" 
                            onChange={e => this.setValues(e,'quantity')}/>
                        </FormGroup>
                    </div>
                </div>
                <Button color="primary" block onClick={this.create}>Salvar</Button>
            </Form>
        );
    }
}

class ListProduct extends Component {

    edit = (product) => {
        PubSub.publish('edit-product', product);
    }

    delete = (id) => {
        this.props.deleteProduct(id);
    }

    render() {
        const { products } = this.props;
        return (
            <Table className="table-bordered text-center rounded">
                <thead className="thead-dark">
                    <tr>
                        <th>Descrição</th>
                        <th>Preço R$</th>
                        <th>Qtde.</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => (
                            <tr key={product.id}>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Button color="success" size="sm" className="mr-2" onClick={e => this.edit(product)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(product.id)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

export default class ProductBox extends Component {

    Url = 'http://localhost:9000/products';

    state = {
        products: [],
    }

    componentDidMount() {
        fetch(this.Url)
            .then(response => response.json())
            .then(products => this.setState({ products }))
            .catch(e => console.log(e));
    }

    save = (product) => {
        let data = {
            id: parseInt(product.id),
            description: product.description,
            price: parseFloat(product.price),
            quantity: parseInt(product.quantity),
        }
        console.log(data);
        const requestInfo = {            
            method: data.id !== 0? 'PUT':'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        };
        if (data.id === 0) {
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newProduct => {
                const { products } = this.state;
                products.push(newProduct);
                this.setState({ products });
            })
            .catch(e => console.log(e));
        } else {
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedProduct => {
                let { products } = this.state;
                let position = products.findIndex(product => product.id === updatedProduct.id);
                products[position] = updatedProduct;
                this.setState({ products });
            })
            .catch(e => console.log(e.message));
        }
    }

    delete = (id) => {
        fetch(`${this.Url}/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(rows => {
                let products = this.state.products.filter(product => product.id !== id);
                this.setState({ products });
            })
            .catch(e => console.log(e));
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 my-3">
                <h2 className="font-weight-bold text-center"> Cadastro de Produtos </h2>
                    <FormProduct createProduct={this.save} />
                </div>
                <div className="col-md-6 my-3">
                <h2 className="font-weight-bold text-center"> Lista de Produtos </h2>
                    <ListProduct products={this.state.products} deleteProduct={this.delete} />
                </div>
            </div>
        );
    }
}