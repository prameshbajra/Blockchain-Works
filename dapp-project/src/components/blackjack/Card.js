import React, { Component } from 'react';

import {
    hidden,
    back,
    c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13,
    d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13,
    s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13,
    h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12, h13,
} from '../imagesApi';

class Card extends Component {
    render() {
        return (
            <div>
                {
                    this.props.hidden ?
                        (<img src={hidden} alt="" />) :
                        (<img src={this.props.face} alt="" />)
                }
                {this.props.value}
            </div>
        );
    }
}

export default Card;
