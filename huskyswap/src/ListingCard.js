import React from 'react';

const ListingCard = ({ title, description, items }) => {
  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src="/images/nonexistent.jpg" className="card-img-top listing-img" alt="Item Image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
      <ul className="list-group list-group-flush">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListingCard;