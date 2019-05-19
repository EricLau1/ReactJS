import React, { useRef, useEffect } from 'react';
import primaryImage from '../../assets/img/colorido.jpg';
import secondaryImage from '../../assets/img/preto-e-branco.jpg';

function UseRefExample() {

    const imageRef = useRef(null);

    useEffect(() => {
        var images = require.context('../../assets/img/', false, /\.(png|jpe?g|svg)$/).keys() || [];
        console.log(images);
    }, [])

    return (
      <div>
        <img 
            height="200"
            width="350"
            onMouseOver={() => {
                imageRef.current.src = secondaryImage;
            }}
            onMouseOut={() => {
                imageRef.current.src = primaryImage;
            }}
            src={primaryImage}
            alt=""
            ref={imageRef}
        />
      </div>  
    );
}

export default UseRefExample;