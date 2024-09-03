import React from 'react';
import { Link } from 'react-router-dom';
import HeaderButtons from './HeaderButtons';
import SearchBar from './SearchBar';
import CategoryButtons from './CategoryButtons';

const Header = ({ user }) => {
  return (
    <header>
      <div className="d-flex justify-content-between align-items-center py-2 px-4 border border-secondary-subtle bg-light border-bottom border-black">
        <img src="/icons/logo.svg" alt="HuskySwap" id="title-img" to="/" />
        <SearchBar />
        <HeaderButtons user={user} />
      </div>
      <CategoryButtons />
    </header>
  );
};

export default Header;