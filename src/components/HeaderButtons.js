import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';


const HeaderButtons = ({ user }) => {
  return (
    <div className="d-flex align-items-center header-buttons">
      {user ? (
        <Link to="/upload">
          <button type="button" className="btn btn-primary mx-2" id="sell-btn">Sell Now</button>
        </Link>
      ) : (
        <Link to="/login">
          <button type="button" className="btn btn-primary mx-2" id="sell-btn">Sell Now</button>
        </Link>
      )}
      <Link to="/messages">
        <button type="button" className="btn btn-light mx-2">
          <img src="/icons/mail-icon.svg" alt="Messages" />
        </button>
      </Link>
      {user ? (
        <Link to="/profile">
          <button type="button" className="btn btn-light d-flex align-items-center mx-2">
            <img src={'/icons/profile-icon.svg'} alt="Profile" className="me-2" />
            <span className="d-none d-lg-inline">Profile</span>
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button type="button" className="btn btn-light d-flex align-items-center mx-2">
            <img src={'/icons/profile-icon.svg'} alt="Profile" className="me-2" />
            <span className="d-none d-lg-inline">Log In</span>
          </button>
        </Link>
      )}
    </div>
  );
};

export default HeaderButtons;