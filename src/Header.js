import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import SearchBar from './SearchBar';
import HeaderButtons from './HeaderButtons';
import CategoryButtons from './CategoryButtons';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header>
      <div className="d-flex justify-content-between align-items-center py-2 px-4 border-bottom bg-light">
        <button
          onClick={handleToDashboard}
          className="btn btn-link text-decoration-none p-0"
        >
          HuskySwap
        </button>
        <SearchBar />
        <HeaderButtons user={user} />
      </div>
      <CategoryButtons />
    </header>
  );
};

export default Header;