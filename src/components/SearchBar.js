import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      navigate(`/search/${encodeURIComponent(trimmedSearchTerm)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="search-container">
      {/* Desktop view */}
      <form onSubmit={handleSearch} className="d-none d-md-flex input-group mt-0 pe-5" id="search-bar">
        <input 
          type="text" 
          className="form-control border border-black" 
          placeholder="Find something!" 
          aria-label="Search input" 
          aria-describedby="button-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" id="button-addon2" className="btn btn-outline-secondary d-flex align-items-center border border-black">
          <img src="/icons/search-icon.svg" alt="Search" id="magnifying-glass" />
        </button>
      </form>

      {/* Mobile view */}
      <div className="d-md-none d-flex flex-direction-column justify-content-center">
        <button onClick={toggleSearch} className="btn btn-outline-secondary d-flex align-items-center border border-black p-2">
          <img src="/icons/search-icon.svg" alt="Search" id="magnifying-glass" />
        </button>
      </div>
      {isSearchVisible && (
        <form onSubmit={handleSearch} className="mt-2 input-group">
          <input 
            type="text" 
            className="form-control border border-black" 
            placeholder="search" 
            aria-label="Search input" 
            aria-describedby="button-addon2-mobile"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" id="button-addon2-mobile" className="btn btn-outline-secondary d-flex align-items-center border border-black">
            <img src="/icons/search-icon.svg" alt="Search" className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;