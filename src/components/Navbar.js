import React from 'react';
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    // Check if the current path is login or register
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';

    // Render the Navbar only if not on login or register page
    if (isLoginPage || isRegisterPage) {
        return null;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav mx-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '200px' }}>
                    
                        <ul className="nav-item">
                            <NavLink className="nav-link active" aria-current="page" to="/">
                                HOME
                            </NavLink>
                        </ul>
                        <ul className="nav-item">
                            <NavLink className="nav-link" to="/products">
                                PRODUCTS
                            </NavLink>
                        </ul>
                        <ul className="nav-item">
                            <NavLink className="nav-link" to="/services">
                                SERVICES
                            </NavLink>
                        </ul>
                        
                        <ul className="nav-item">
                            <div className="search">
                                <input placeholder="Search..." type="text" />
                                
                            </div>
                        </ul>
                        <ul className="nav-item">
                            <NavLink className="nav-link" to="/Cart">
                            <i class="fa-solid fa-cart-shopping"></i>

                            </NavLink>
                        </ul>
                        
                        <ul className="nav-item">
                            <NavLink className="nav-link" to="/ Login">
                            <i class="fa-solid fa-user"></i>
                            </NavLink>
                        </ul>
                       
                        
                    </ul>
                    
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
