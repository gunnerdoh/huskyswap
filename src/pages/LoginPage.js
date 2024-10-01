import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '../utils/firebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../styles/Universal.css';


function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user profile exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create a new user profile
        const newUser = {
          id: user.uid,
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          photoURL: user.photoURL,
          joined: new Date().toISOString()
        };

        await setDoc(userDocRef, newUser);
        console.log('New user profile created');
      } else {
        console.log('User profile already exists');
      }

      // Navigation is handled by the useEffect hook
    } catch (err) {
      console.error('Error during Google sign-in:', err);
      setError('Failed to login with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNav = () => {
    navigate('/register');
  }

  const handleBack = () => {
    navigate('/dashboard');
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h2 className="mb-4">Login</h2>
      <div className="d-flex flex-column" style={{ width: '300px' }}>
        <button 
          onClick={handleGoogleLogin} 
          className="btn btn-danger mb-2" 
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login with Google'}
        </button>
        {error && <p className="text-danger mb-2">{error}</p>}
      </div>
      <p></p>
      <button onClick={handleRegisterNav} className="btn btn-success mb-2">
        Not a member? Sign Up Here
      </button>
      <button onClick={handleBack} className="btn btn-secondary">
        Back to Dashboard
      </button>
    </div>
  );
}

export default Login;