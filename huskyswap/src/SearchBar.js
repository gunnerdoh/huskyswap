import React from 'react';

const SearchBar = () => {
  return (
    <div className="input-group mx-5" id="search-bar">
      <input type="text" className="form-control border border-black" placeholder="Find something!" aria-label="Search input" aria-describedby="button-addon2" />
      <button type="button" id="button-addon2" className="btn btn-outline-secondary d-flex align-items-center border border-black">
        <img src="/icons/search-icon.svg" alt="Search" id="magnifying-glass" />
      </button>
    </div>
  );
};

export default SearchBar;