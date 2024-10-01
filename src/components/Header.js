import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import HeaderButtons from './HeaderButtons';
import WhyButton from './WhyButton';
import MobileMenu from './MobileMenu';
import '../styles/Header.css';


const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToDashboard = () => {
    navigate('/dashboard');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header>
      <div className="d-flex justify-content-between align-items-start py-2 px-4 border-bottom bg-light">
        <button
          onClick={handleToDashboard}
          className="btn btn-link text-decoration-none p-0 mt-2"
        >
          HuskySwap
        </button>
        <div className="w-full md:flex-grow px-2 py-2 md:py-0">
          <SearchBar />
        </div>
        <div className="d-none d-md-block">
          <HeaderButtons user={user} />
        </div>
        <button className="d-md-none btn btn-light p-1 pt-2 pe-0" onClick={toggleMobileMenu}>
          <span class="material-symbols-outlined">more_vert</span>        
        </button>
      </div>
      <WhyButton />
      {isMobileMenuOpen && <MobileMenu user={user} onClose={toggleMobileMenu} />}
    </header>
  );
};

export default Header;