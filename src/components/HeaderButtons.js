import React from 'react';
import { Link } from 'react-router-dom';

const HeaderButtons = ({ user }) => {
  if (user) {
    console.log("Loggedin!!lkflklkfslkdflkflk!");
  }
  return (
    <div className="d-flex align-items-center header-buttons">
      {user ? (
        <Link to="/upload">
          <button type="button" className="btn btn-primary mx-3" id="sell-btn">Sell Now</button>
        </Link>
      ) : (
        <Link to="/login">
          <button type="button" className="btn btn-primary mx-3" id="sell-btn">Sell Now</button>
        </Link>
      )}
      <Link to="/messages">  {/* Add this Link */}
        <button type="button" className="btn btn-light mx-2">
          <img src="/icons/mail-icon.svg" alt="Messages" />
        </button>
      </Link>
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