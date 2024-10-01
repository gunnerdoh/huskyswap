import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhyButton = () => {
const navigate = useNavigate();

  const handleWhy = () => {
    navigate('/about');
  }
  const handleHow = () => {
    navigate('/how-to-use');
  }

  return (
    <div id="items-header" className="d-flex flex-wrap justify-content-start gap-2 py-1 border border-bottom border-black">
        <button onClick={handleWhy} className="btn btn-sm btn-light mx-3 my-2 border border-black">
            So What is This?
        </button>
        <button onClick={handleHow} className="btn btn-sm btn-light mx-3 my-2 border border-black">
            How do I use it?
        </button>
    </div>

  );
};

export default WhyButton;