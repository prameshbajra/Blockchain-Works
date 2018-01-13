import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav navbar-left">
                        <div className="navbar-header">
                            <NavLink exact to="/" className="navbar-brand" href="#">Decentralized Voting</NavLink>
                        </div>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <NavLink
                            exact to="/addCandidate"
                            className="btn pull-right">
                            Add candidate
                        </NavLink>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;