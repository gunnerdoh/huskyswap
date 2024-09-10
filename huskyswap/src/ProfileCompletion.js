import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

function ProfileCompletion() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleProfileCompletion = async (e) => {
    e.preventDefault();
    setError('');

    if (!auth.currentUser) {
      setError('No user is currently signed in.');
      return;
    }

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        joined: new Date(),
        user: username,
        description: description
      });

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to complete profile. ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleProfileCompletion} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Complete Profile</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    margin: '10px 0',
  },
};

export default ProfileCompletion;