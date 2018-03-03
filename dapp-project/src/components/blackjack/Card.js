import React, { Component } from 'react';

class Card extends Component {
    render() {
        const bgUrl = (this.props.hidden)
            ? 'url(img/hidden.png)'
            : 'url(img/' + this.props.face + '.png)';
        const cardStyle = { backgroundImage: bgUrl };
        return (
            <div className='card' style={cardStyle} />
        );
    }
}

export default Card;
