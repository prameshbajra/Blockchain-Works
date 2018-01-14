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
                        <li>
                            <NavLink
                                exact to="/addCandidate">
                                Add candidate
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;