import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import UploadForm from './pages/UploadFormPage';
import ListingDetail from './pages/ListingPage';
import UserProfile from './pages/OtherUserPage';
import ConversationsPage from './pages/ConversationsPage';
import AboutPage from './pages/AboutPage';
import HowToUsePage from './pages/HowToUse';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/search/:searchQuery" element={<Dashboard />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/listing/:id" element={<ListingDetail />} />
      <Route path="/profile/:userId" element={<UserProfile />} />
      <Route path="/messages" element={<ConversationsPage />} />
      <Route path="/messages/:conversationId" element={<ConversationsPage />} />
      <Route path="/how-to-use" element={<HowToUsePage />} />
    </Routes>
  );
}

export default App;