import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const validate = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const insertUserRecord = async (id) => {
    const newUser = {
      id: id,
      name: name,
      email: email,
      joined: Date.now()
    };

    try {
      console.log('Attempting to insert user record:', newUser);
      await setDoc(doc(db, 'users', id), newUser);
      console.log('User record inserted successfully');
    } catch (error) {
      console.error('Error inserting user record:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  };

  const handleToLogin = () => {
    navigate('/login');
  }

  const handleToDashboard = () => {
    navigate('/dashboard');
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    try {
      console.log('Attempting to create user with email:', email);
      const userCredential = await signup(email, password);
      console.log('User created successfully:', userCredential.user);
      const userId = userCredential.user.uid;

      await insertUserRecord(userId);
      navigate('/profile');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register: ' + err.message);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleRegister} className="d-flex flex-column" style={{ width: '300px' }}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
          required
        />
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
        <button type="submit" className="btn btn-primary my-1">
          Register
        </button>
        {error && <p className="text-danger mb-2">{error}</p>}
      </form>
      <div className='my-3 d-flex flex-column align-center'>
        <button onClick={handleToLogin} className="btn btn-secondary my-1">
            Back to Login
          </button>
          <button onClick={handleToDashboard}  className="btn btn-dark my-1">
            Back to Dashboard
          </button>
      </div>

    </div>
  );
}

export default Register;