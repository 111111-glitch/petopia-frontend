import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar2() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(userData.role === 'admin');
    }
  }, []);

  if (isLoginPage || isRegisterPage || isAdmin) {
    return null;
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <ul className="navbar-nav ml-auto">
        <ul className="nav-item">
            <Link to="/adminHome" className="nav-link">Admin Home</Link>
          </ul>
          <ul className="nav-item">
            <Link to="/productPost" className="nav-link">Product Post</Link>
          </ul>
          <ul className="nav-item">
            <Link to="/ServicePost" className="nav-link">Service Post</Link>
          </ul>
          <ul className="nav-item">
            <Link to="/deleteProduct" className="nav-link">Delete Product</Link>
          </ul>
          <ul className="nav-item">
            <Link to="/deleteService" className="nav-link">Delete Service</Link>
          </ul>
          <ul className="nav-item">
            <Link to="/history" className="nav-link">History</Link>
          </ul>
          <ul className="nav-item">
            <Link to="/patchProduct" className="nav-link">Update Product</Link>
          </ul>
          <ul className="nav-item">
            <Link to="/patchService" className="nav-link">Update Service</Link>
          </ul>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar2;
