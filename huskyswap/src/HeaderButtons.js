import React from 'react';

const HeaderButtons = () => {
  return (
    <div className="d-flex align-items-center header-buttons">
      <button type="button" className="btn btn-primary mx-3" id="sell-btn">Sell Now</button>
      <button type="button" className="btn btn-light mx-2"><img src="/icons/mail-icon.svg" alt="Mail" /></button>
      <button type="button" className="btn btn-light mx-2"><img src="/icons/cart-icon.svg" alt="Cart" /></button>
      <button type="button" className="btn btn-light mx-2"><img src="/icons/profile-icon.svg" alt="Profile" /></button>
    </div>
  );
};

export default HeaderButtons;