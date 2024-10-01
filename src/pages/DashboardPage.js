import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';
import '../styles/DashboardPage.css';
import '../styles/Universal.css';


const Dashboard = () => {
  const [listings, setListings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, 'listings');
        const querySnapshot = await getDocs(listingsRef);
        const fetchedListings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="mx-0 px-0">
      <Header />
      <div className="container-fluid px-0">
        <img
          src='/icons/cover.png'
          className="img-fluid w-100"
          alt="Cover Image"
        />
      </div>
      <div className='px-2 mx-6'>
        {!user && (
          <div className="bg-blue-100 rounded p-4 my-4">
            <p>
              You're viewing the public dashboard. 
              <Link to="/login" className="text-blue-600 hover:underline">Log in</Link> or 
              <Link to="/register" className="text-blue-600 hover:underline">register</Link> 
              to access your personal dashboard and post listings.
            </p>
          </div>
        )}
        <h2 className="text-xl font-semibold mt-4 mx-4">
          Available Listings
        </h2>
        <div className="listing-section">
          {listings.length > 0 ? (
            listings.map(listing => (
            <div className="listing-container mx-2 my-1 p-1">
                <ListingCard key={listing.id} listing={listing} />
            </div>
            ))
          ) : (
            <p className="w-full text-center">No listings available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;