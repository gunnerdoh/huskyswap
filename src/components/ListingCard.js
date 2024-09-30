import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ListingCard.css';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  return (
    <div onClick={handleClick} className="listing-card">
      <div className="listing-image-container">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="listing-image"
        />
      </div>
      <div className="listing-details">
        <h5 className="listing-price">${listing.price}</h5>
        <p className="listing-title">{listing.title}</p>
      </div>
    </div>
  );
};

export default ListingCard;