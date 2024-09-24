import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const MessagesList = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setConversations(conversationsData);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Conversations</h2>
      <div className="list-group">
        {conversations.map(conversation => (
          <Link
            key={conversation.id}
            to={`/messages/${conversation.id}`}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {conversation.participants.find(id => id !== user.uid)}
              </h5>
              <small>
                {new Date(conversation.lastMessage.timestamp).toLocaleString()}
              </small>
            </div>
            <p className="mb-1">{conversation.lastMessage.content}</p>
          </Link>
        ))}
      </div>
      {conversations.length === 0 && (
        <p className="text-muted">You have no conversations yet.</p>
      )}
    </div>
  );
};

export default MessagesList;