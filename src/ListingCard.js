import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  return (
    <div onClick={handleClick} className="card m-4" style={{width: '18rem'}}>
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="card-img-top"
          style={{width: '18rem', height: '16rem'}}
        />
      <div className="card-body">
        <h5 className="card-title">${listing.price}</h5>
        <p className="card-text">{listing.title}</p>
      </div>
    </div>
  );
};

export default ListingCard;