import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db, auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const provider = new GoogleAuthProvider();

  const extractUsername = (email) => {
    return email.split('@')[0];
  };

  const insertUserRecord = async (user) => {
    const username = extractUsername(user.email);
    const newUser = {
      id: user.uid,
      name: username,
      email: user.email,
      joined: Date.now()
    };

    try {
      console.log('Attempting to insert user record:', newUser);
      await setDoc(doc(db, 'users', user.uid), newUser);
      console.log('User record inserted successfully');
    } catch (error) {
      console.error('Error inserting user record:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  };

  const handleGoogleRegister = async () => {
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User registered successfully:', user);

      await insertUserRecord(user);
      navigate('/profile');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register: ' + err.message);
    }
  };

  const handleToLogin = () => {
    navigate('/login');
  }

  const handleToDashboard = () => {
    navigate('/dashboard');
  }

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h2 className="mb-4">Register</h2>
      <div className="d-flex flex-column" style={{ width: '300px' }}>
        <button onClick={handleGoogleRegister} className="btn btn-danger mb-2">
          Register with Google
        </button>
        {error && <p className="text-danger mb-2">{error}</p>}
      </div>
      <div className='my-3 d-flex flex-column align-center'>
        <button onClick={handleToLogin} className="btn btn-secondary my-1">
          Back to Login
        </button>
        <button onClick={handleToDashboard} className="btn btn-dark my-1">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Register;