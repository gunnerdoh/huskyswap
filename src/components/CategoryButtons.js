import React from 'react';

const CategoryButtons = () => {
  const categories = [
    "Men's Clothing", "Women's Clothing", "House/Dorm Stuff",
    "Tech", "Shoes", "Misc."
  ];

  return (
    <div id="items-header" className="d-flex flex-wrap justify-content-start gap-2 py-1 border border-bottom border-black">
      {categories.map((category, index) => (
        <button key={index} type="button" className="btn btn-sm btn-light mx-3 my-2 border border-black">
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;