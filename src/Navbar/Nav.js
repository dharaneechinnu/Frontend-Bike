import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-left">
          <Link className="navbar-title" to="/">PreOwned Bike</Link>
        </div>
        <div className="navbar-right">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/OwnerMain">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/home">Add Bike</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MyBike">My Bike</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>LogOut</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  