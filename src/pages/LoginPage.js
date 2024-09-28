import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [error, setError] = useState('');
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

    try {
      await signInWithPopup(auth, provider);
      // Navigation is handled by the useEffect hook
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
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
        <button onClick={handleGoogleLogin} className="btn btn-danger mb-2">
          Login with Google
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