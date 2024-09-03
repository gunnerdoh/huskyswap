import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import Header from './Header';

const Profile = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');

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
    try {
      await user.updateProfile({ displayName: newDisplayName });
      alert('Display name updated successfully!');
    } catch (error) {
      console.error('Failed to update display name', error);
      alert('Failed to update display name. Please try again.');
    }
  };

  return (
    <div>
      <Header user={user} />
      <div style={styles.container}>
        {user ? (
          <>
            <div style={styles.profileSection}>
              <h2 style={styles.sectionTitle}>Your Profile</h2>
              <div style={styles.profileInfo}>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Display Name:</strong> {user.displayName || "N/A"}</p>
                <form onSubmit={handleDisplayNameSubmit} style={styles.form}>
                  <label htmlFor="displayName" style={styles.label}>Change Display Name:</label>
                  <input
                    type="text"
                    id="displayName"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    style={styles.input}
                    placeholder="Enter new display name"
                  />
                  <button type="submit" style={styles.updateButton}>Update Display Name</button>
                </form>
                <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
              </div>
            </div>
            <div style={styles.listingsSection}>
              <h2 style={styles.sectionTitle}>My Listings</h2>
              <div style={styles.listingsContainer}>
                {/* Placeholder for listing cards */}
                <p style={styles.placeholderText}>Your listing cards will be displayed here.</p>
              </div>
            </div>
          </>
        ) : (
          <p>No user is logged in.</p>
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