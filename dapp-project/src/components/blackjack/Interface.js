import React, { Component } from 'react';

import Outcome from './Outcome';

class Interface extends Component {
    static defaultProps = {
        status: "new"
    }

    render() {
        return (
            <div className='panel interface'>
                {/* Outcome component child of Interface */}
                <Outcome status={this.props.status} />
                <div className="btn-group btn-group-justified" role="group" aria-label="score">
                    <a className="btn btn-default">Dealer Score : {this.props.dealerscore}</a>
                    <a className="btn btn-default">Player Score :{this.props.playerscore}</a>
                </div>
                <br />
                <div className="btn-group btn-group-justified" role="group" aria-label="game">
                    <div className="btn-group" role="group">
                        <button onClick={this.props.deal} type="button" className="btn btn-info">Deal</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button onClick={this.props.hit} type="button" className="btn btn-success">Hit</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button onClick={this.props.stand} type="button" className="btn btn-danger">Stand</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Interface;
