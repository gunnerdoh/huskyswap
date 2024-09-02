import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListingCard from './ListingCard';
import Header from './Header';
import Login from './LoginPage';
import Register from './RegisterPage';

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

  return (
    <div>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <div>
                  <img src='/icons/cover.svg' id="cover-img" alt="Cover Image" />
                </div>
                <div id="listings-grid" className="mx-5">
                  {listings.map((listing, index) => (
                    <ListingCard key={index} {...listing} />
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      </div>
  );
};

export default App;
