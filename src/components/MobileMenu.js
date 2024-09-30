import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const MobileMenu = ({ user, onClose }) => {
  return (
    <div className="mobile-menu">
      <button className="close-button" onClick={onClose}>×</button>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard" onClick={onClose}>Home</Link>
          </li>
          <li>
            <Link to={user ? "/upload" : "/login"} onClick={onClose}>Sell Now</Link>
          </li>
          <li>
            <Link to="/messages" onClick={onClose}>Messages</Link>
          </li>
          <li>
            <Link to={user ? "/profile" : "/login"} onClick={onClose}>
              {user ? "Profile" : "Log In"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;