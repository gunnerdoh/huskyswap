import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import ListingCard from '../components/ListingCard';

const Profile = () => {
  const { user, logout } = useAuth();
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
      await logout();
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
      <div style={styles.container}>
        {userData ? (
          <>
            <div style={styles.profileSection}>
              <h2 style={styles.sectionTitle}>Your Profile</h2>
              <div style={styles.profileInfo}>
                <p><strong>Username:</strong> {userData.name || 'N/A'}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Date Joined:</strong> {formatDate(userData.joined)}</p>
                <form onSubmit={handleDisplayNameSubmit} style={styles.form}>
                  <label htmlFor="displayName" style={styles.label}>Change Username:</label>
                  <input
                    type="text"
                    id="displayName"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    style={styles.input}
                    placeholder="Enter new username"
                  />
                  <button type="submit" style={styles.updateButton}>Update Username</button>
                </form>
                <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
              </div>
            </div>

            <div style={styles.listingsSection}>
              <h2 style={styles.sectionTitle}>My Listings</h2>
              <div style={styles.listingsContainer}>
                {userListings.length > 0 ? (
                  userListings.map(listing => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))
                ) : (
                  <p style={styles.placeholderText}>You haven't posted any listings yet.</p>
                )}
              </div>
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


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    minHeight: '100vh',
  },
  profileSection: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    padding: '20px',
  },
  listingsSection: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  profileInfo: {
    marginBottom: '20px',
  },
  form: {
    marginTop: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  updateButton: {
    padding: '10px',
    backgroundColor: '#4285f4',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '10px',
    backgroundColor: '#db4437',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  listingsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  placeholderText: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    color: '#888',
  },
};

export default Profile;
