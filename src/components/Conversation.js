import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Message from './Message';
import '../styles/Conversation.css';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState(null);
  const { conversationId } = useParams();
  const { user } = useAuth();
  const messageListRef = useRef(null);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const docRef = doc(db, 'conversations', conversationId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const messagesArray = Object.entries(data.messages || {})
            .map(([id, message]) => ({ id, ...message }))
            .sort((a, b) => a.timestamp - b.timestamp);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

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
    <div className="conversation">
      <div className="conversation-header">
        <h2>{otherUser ? `${otherUser.name}` : 'Conversation'}</h2>
      </div>
      
      <div className="message-list" ref={messageListRef}>
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            isCurrentUser={message.senderId === user.uid}
            currentUser={user} 
            otherUser={otherUser} 
          />
        ))}
      </div>

      <form onSubmit={sendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Conversation;