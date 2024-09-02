import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig';  // Import the auth object
import ListingCard from './ListingCard';
import Header from './Header';
import Login from './LoginPage';
import Register from './Register';
import Profile from './Profile';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up Firebase authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  console.log({user} + 'hello');
  return (
    <div>
      {/* Pass the user prop to the Header component */}
      {user && <Header user={user} />}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div>
                  <img src='/icons/cover.svg' id="cover-img" alt="Cover Image" />
                </div>
                <div id="listings-grid" className="mx-5">
                  {/* Example listing cards */}
                  <ListingCard title="Card title" description="Some quick example text to build on the card title." items={["An item", "A second item", "A third item"]} />
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
