import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import Register from './Register';
import Profile from './ProfileNew';
import UploadForm from './UploadForm';
import ListingDetail from './ListingDetail';
import UserProfile from './UserProfile';
import MessagesPage from './MessagesPage';

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