import React, { Component } from 'react';
import Title from '../components/Title';

// ref: https://pt-br.reactjs.org/docs/context.html

const ThemeContext = React.createContext({
    id: 1,
    name: 'Jhon Doe',
    email: 'johndoe@email.com',
    theme: 'light'
});

class ContextExample extends Component {

    state = {
        id: 1,
        name: 'Jhon Doe',
        email: 'johndoe@email.com',
        theme: 'light'
    };

    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                <Title title="Context Api" />
                <Toolbar theme="dark" />
            </ThemeContext.Provider>
        )
    }
}

class ThemeButton extends React.Component {

    static contextType = ThemeContext;

    render() {
        return <Button data={this.context} />;
    }
}

const Toolbar = props => <div> <ThemeButton /> </div>;

class Button extends React.Component {

    handleOnClick(e) {
        console.log(this.props.data);
    }

    render() {
        return (
            <button 
                type="button" 
                onClick={this.handleOnClick.bind(this)}>
                Botão
            </button>
        );
    }
}

export default ContextExample;