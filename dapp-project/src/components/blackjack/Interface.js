import React, { Component } from 'react';

import Outcome from './Outcome';

class Interface extends Component {
    static defaultProps = {
        status: "new"
    }

    render() {
        return (
            <div>
                {/* Outcome component child of Interface */}
                <center>
                    <Outcome status={this.props.status} />
                </center>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <h4>Dealer Score : {this.props.dealerscore}</h4>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <h4 className="text-right">Player Score : {this.props.playerscore}</h4>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <button onClick={this.props.deal} type="button" className="btn btn-block btn-info">Deal</button>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        {
                            this.props.visible ?
                                this.props.playerscore > 21 || this.props.dealerscore > 21 ?
                                    <button onClick={this.props.hit} type="button" className="btn btn-block btn-success" disabled>
                                        Hit
                                </button>
                                    :
                                    <button onClick={this.props.hit} type="button" className="btn btn-block btn-success">
                                        Hit
                                </button>
                                :
                                <button onClick={this.props.hit} type="button" className="btn btn-block btn-success" disabled>
                                    Hit
                                </button>
                        }
                    </div>
                    <div className="col-lg-4 col-md-4">
                        {
                            this.props.visible ?
                                this.props.playerscore > 21 || this.props.dealerscore > 21 ?
                                    <button onClick={this.props.stand} type="button" className="btn btn-block btn-danger" disabled>
                                        Stand
                                </button>
                                    :
                                    <button onClick={this.props.stand} type="button" className="btn btn-block btn-danger">
                                        Stand
                                </button>
                                :
                                <button onClick={this.props.stand} type="button" className="btn btn-block btn-danger" disabled>
                                    Stand
                                </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Interface;
