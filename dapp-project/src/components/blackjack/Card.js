import React, { Component } from 'react';

class Card extends Component {
    render() {
        const bgUrl = (this.props.hidden)
            ? '../../images/hidden.png'
            : '../../images/' + this.props.face + '.png';
        return (
            <div>
                {bgUrl}
                <img alt="" src={bgUrl} />
            </div>
        );
    }
}

export default Card;
