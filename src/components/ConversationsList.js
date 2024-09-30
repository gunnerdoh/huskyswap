import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchConversations = async () => {
        const conversationsData = await Promise.all(
          querySnapshot.docs.map(async (document) => {
            const data = document.data();
            const otherUserId = data.participants.find(id => id !== user.uid);
            const otherUserDocRef = doc(db, 'users', otherUserId);
            const otherUserDoc = await getDoc(otherUserDocRef);
            const otherUser = otherUserDoc.exists() ? { id: otherUserDoc.id, ...otherUserDoc.data() } : null;
            
            return {
              id: document.id,
              ...data,
              otherUser
            };
          })
        );
        setConversations(conversationsData);
      };

      fetchConversations();
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="ConversationsList container mt-4">
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
                {conversation.otherUser ? conversation.otherUser.name : 'Unknown User'}
              </h5>
            </div>
          </Link>
        ))}
      </div>
      {conversations.length === 0 && (
        <p className="text-muted">You have no conversations yet.</p>
      )}
    </div>
  );
};

export default ConversationList;