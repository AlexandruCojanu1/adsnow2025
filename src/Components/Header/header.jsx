import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {

return (
    <div className="navbar-wrapper">
        <nav className="navbar navbar-expand-lg">
            <div className="navbar-container">
                <div className="logo-container">
                    <NavLink className="navbar-brand" to="/">
                    <img
                        src="/assets/images/logo1.png"
                        className="site-logo img-fluid"
                        alt="Logo"
                    />
                    </NavLink>
                </div>

                <button
                    className="navbar-toggler nav-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa-solid fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link" end>
                            Acasă
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/blog" className="nav-link">
                            Blog
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Navbar Action */}
                <div className="navbar-action-container">
                    <div className="navbar-action-button">
                    </div>
                </div>
            </div>
        </nav>
    </div>
);
}

export default Navbar;