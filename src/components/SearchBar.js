import React, { useState } from 'react';

const SearchBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="search-container">
      {/* Desktop view */}
      <div className="d-none d-md-flex input-group mx-5 pe-5" id="search-bar">
        <input type="text" className="form-control border border-black" placeholder="Find something!" aria-label="Search input" aria-describedby="button-addon2" />
        <button type="button" id="button-addon2" className="btn btn-outline-secondary d-flex align-items-center border border-black">
          <img src="/icons/search-icon.svg" alt="Search" id="magnifying-glass" />
        </button>
      </div>

      {/* Mobile view */}
      <div className="d-md-none d-flex flex-direction-column justify-content-center">
        <button onClick={toggleSearch} className="btn btn-outline-secondary d-flex align-items-center border border-black p-2">
        <img src="/icons/search-icon.svg" alt="Search" id="magnifying-glass" />
        </button>
      </div>
      {isSearchVisible && (
          <div className="mt-2 input-group">
            <input type="text" className="form-control border border-black" placeholder="Find something!" aria-label="Search input" aria-describedby="button-addon2-mobile" />
            <button type="button" id="button-addon2-mobile" className="btn btn-outline-secondary d-flex align-items-center border border-black">
              <img src="/icons/search-icon.svg" alt="Search" className="w-5 h-5" />
            </button>
          </div>
        )}
    </div>
  );
};

export default SearchBar;