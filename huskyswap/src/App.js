import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import Header from './Header';

const App = () => {

  const [listings] = useState([
    {
      title: "Card title",
      description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
      items: ["An item", "A second item", "A third item"]
    }
  ]);

  useEffect(() => {
    console.log("App component mounted");
  }, []);

  console.log("Before return in App");

  return (
    <div>
      <Header />
      <main>
        <div>
          <img src="../icons/cover.png"></img>
          <img src="icons/cover.png" id="cover-img" alt=""/>
        </div>
        <div id="listings-grid" className="mx-5">
          {listings.map((listing, index) => (
            <ListingCard key={index} {...listing} />
          ))}
        </div>
      </main>
    </div>
  );

};

export default App;