import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = doc(db, 'listings', id);
        const listingDoc = await getDoc(listingRef);
        if (listingDoc.exists()) {
          setListing({ id: listingDoc.id, ...listingDoc.data() });
        } else {
          console.log('No such listing!');
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  const handleSendMessage = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.uid === listing.userId) {
      alert("You can't send a message about your own listing!");
      return;
    }

    try {
      // Check if a conversation already exists
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('participants', '==', [user.uid, listing.userId].sort())
      );
      const querySnapshot = await getDocs(q);

      let conversationId;
      if (querySnapshot.empty) {
        // Create a new conversation
        const newConversationRef = doc(collection(db, 'conversations'));
        conversationId = newConversationRef.id;
        const newConversation = {
          participants: [user.uid, listing.userId].sort(),
          messages: {},
          lastMessage: {
            content: `Hi, I'm interested in your listing: ${listing.title}`,
            timestamp: new Date().toISOString(),
            senderId: user.uid
          }
        };
        newConversation.messages[Date.now().toString()] = newConversation.lastMessage;
        await setDoc(newConversationRef, newConversation);
      } else {
        conversationId = querySnapshot.docs[0].id;
      }

      // Navigate to the conversation
      navigate(`/messages/${conversationId}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
      alert('Failed to start conversation. Please try again.');
    }
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className='card p1'>
        <img src={listing.imageUrl} alt={listing.title} />
        <h2>{listing.title}</h2>
        <p>Price: ${listing.price}</p>
        <p>Description: {listing.description}</p>
        <p>Posted by: <Link to={`/user/${listing.userId}`}>{listing.username}</Link></p>
        {user && user.uid !== listing.userId && (
          <button onClick={handleSendMessage}>
            Message Seller
          </button>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;