import React, { Component } from 'react';

class Card extends Component {
    render() {
        var bgUrl = (this.props.hidden)
            ? 'url(../../images/hidden.png)'
            : 'url(../../images/' + this.props.face + '.png)';
        /* in react we pass the css properties as an object with camelCase variables referring to the respective CSS variables */
        var cardStyle = { backgroundImage: bgUrl };

        return (
            <div className='card' style={cardStyle} />
        );
    }
}

export default Card;
