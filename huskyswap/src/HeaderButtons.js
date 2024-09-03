import React from 'react';
import { Link } from 'react-router-dom';

const HeaderButtons = ({ user }) => {
  return (
    <div className="d-flex align-items-center header-buttons">
      <button type="button" className="btn btn-primary mx-3" id="sell-btn">Sell Now</button>
      <button type="button" className="btn btn-light mx-2"><img src="/icons/mail-icon.svg" alt="Mail" /></button>
      <button type="button" className="btn btn-light mx-2"><img src="/icons/cart-icon.svg" alt="Cart" /></button>
      {user ? (
        <Link to="/profile">
          <button type="button" className="btn btn-light d-flex align-items-center mx-2">
            <img src={'/icons/profile-icon.svg'} alt="Profile" className="me-2" />
            <p className="mb-0">Profile</p>
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button type="button" className="btn btn-light d-flex align-items-center mx-2">
            <img src={'/icons/profile-icon.svg'} alt="Profile" className="me-2" />
            <p className="mb-0">Log In</p>
          </button>
        </Link>
      )}
    </div>
  );
};

export default HeaderButtons;
