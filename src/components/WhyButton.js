import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhyButton = () => {
const navigate = useNavigate();

  const handleClick = () => {
    navigate('/about');
  }

  return (
    <div id="items-header" className="d-flex flex-wrap justify-content-start gap-2 py-1 border border-bottom border-black">
        <button onClick={handleClick} className="btn btn-sm btn-light mx-3 my-2 border border-black">
            So What is This?
        </button>
    </div>
  );
};

export default WhyButton;