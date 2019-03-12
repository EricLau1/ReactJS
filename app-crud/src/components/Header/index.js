import React from 'react';

import './styles.css';

const Header = ({ title }) => (
    <header>
        <h1 className="font-weight-bold"> {title?title:'Informe um título'} </h1>
    </header>
);

export default Header;