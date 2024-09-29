import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';
import ConversationsList from '../components/ConversationsList';
import '../styles/ProfilePage.css';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [userListings, setUserListings] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          console.log('Attempting to fetch user data for UID:', user.uid);

          // Fetch user document
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log('User document found:', userDoc.data());
            setUserData(userDoc.data());
            setNewDisplayName(userDoc.data().name || '');
          } else {
            console.log('No user document found for UID:', user.uid);
          }

          // Fetch user's listings
          const listingsRef = collection(db, 'listings');
          const q = query(listingsRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);
          const listings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUserListings(listings);

        } catch (error) {
          console.error('Error fetching data:', error);
          if (error.code === 'permission-denied') {
            console.error('Permission denied. Check Firestore security rules.');
          }
        }
      } else {
        console.log('No user is currently logged in');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleDisplayNameSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { name: newDisplayName });
      setUserData({ ...userData, name: newDisplayName });
      alert('Display name updated successfully!');
    } catch (error) {
      console.error('Failed to update display name', error);
      alert('Failed to update display name. Please try again.');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString();
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        {userData ? (
          <>
            <div className="profileSection">
              <h2 className="sectionTitle">Your Profile</h2>
              <div className="profileInfo">
                <p><strong>Username:</strong> {userData.name || 'N/A'}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Date Joined:</strong> {formatDate(userData.joined)}</p>
                <button onClick={handleLogout} className="logoutButton">Log Out</button>
              </div>
            </div>

            <div className="listingsSection">
              <h2 className="sectionTitle">My Listings</h2>
              <div className="listingsContainer">
                {userListings.length > 0 ? (
                  userListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))
                ) : (
                  <p className="placeholderText">You haven't posted any listings yet.</p>
                )}
              </div>
            </div>
            <div className="MessagesSection">
              < ConversationsList />
            </div>
          </>
        ) : (
          <>
            <p>Loading user data...</p>
            <button onClick={handleLogout}>Problem? Try Logging Out</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
