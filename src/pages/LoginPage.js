import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleRegisterNav = () => {
    navigate('/register');
  }

  const handleBack = () => {
    navigate('/dashboard');
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin} className="d-flex flex-column" style={{ width: '300px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
        {error && <p className="text-danger mb-2">{error}</p>}
        <button type="submit" className="btn btn-primary mb-2">Login</button>
      </form>
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