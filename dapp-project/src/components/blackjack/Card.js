import React, { Component } from 'react';


class Card extends Component {
    render() {
        const imageSource = `./img/${this.props.face}.png`;
        return (
            <div >
                {
                    this.props.hidden ?
                        (<img src="./img/hidden.png" alt="" />) :
                        (<img src={imageSource} alt="" />)
                }
            </div>
        );
    }
}

export default Card;
