import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Message from './Message';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const { conversationId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const docRef = doc(db, 'conversations', conversationId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const messagesArray = Object.entries(data.messages || {})
            .map(([id, message]) => ({ id, ...message }))
            .sort((a, b) => b.timestamp - a.timestamp);
          setMessages(messagesArray);
          const otherUserId = data.participants.find(id => id !== user.uid);
          const otherUserDoc = await getDoc(doc(db, 'users', otherUserId));
          if (otherUserDoc.exists()) {
            setOtherUser({ id: otherUserDoc.id, ...otherUserDoc.data() });
          }
        }
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    if (user && conversationId) {
      fetchConversation();
    }
  }, [conversationId, user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      content: newMessage,
      senderId: user.uid,
      timestamp: serverTimestamp()
    };

    try {
      const conversationRef = doc(db, 'conversations', conversationId);
      await updateDoc(conversationRef, {
        [`messages.${Date.now()}`]: messageData,
        lastMessage: messageData
      });

      setNewMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="Conversation d-flex flex-column h-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
        <h2>{otherUser ? `${otherUser.name}'s Conversation` : 'Conversation'}</h2>
        {otherUser && (
          <Link to={`/user/${otherUser.id}`} className="btn btn-outline-secondary">
            View Profile
          </Link>
        )}
      </div>
      <form onSubmit={sendMessage} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
      <div className="flex-grow-1 overflow-auto">
        {messages.map((message) => (
          <Message key={message.id} message={message} currentUser={user} otherUser={otherUser} />
        ))}
      </div>
    </div>
  );
};

export default Conversation;