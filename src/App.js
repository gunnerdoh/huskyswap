import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Profile from './pages/ProfileNew';
import UploadForm from './components/UploadForm';
import ListingDetail from './pages/ListingDetail';
import UserProfile from './pages/UserProfile';
import MessagesPage from './pages/MessagesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/listing/:id" element={<ListingDetail />} />
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/messages/:conversationId" element={<MessagesPage />} />
    </Routes>
  );
}

export default App;