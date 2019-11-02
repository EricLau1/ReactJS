import React from 'react';
import Bold from '../Bold';
import Italic from '../Italic';

const Message = props => {
    const { italic, bold, message } = props;

    let styledMessage = false;
    if(italic && bold) {
        styledMessage = (<Bold><Italic>{message}</Italic></Bold> );
    }
    
    if(italic && !bold) {
        styledMessage = (<Italic>{message}</Italic>);
    }

    if(bold && !italic) { 
        styledMessage = (<Bold>{message}</Bold>);
    }

    return <span>Message: {styledMessage ? styledMessage : message}</span>;
}


export default Message;