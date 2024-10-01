import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, setDoc, collection, query, where, getDocs, serverTimestamp} from 'firebase/firestore';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ListingPage.css';
import '../styles/Universal.css';


const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState('');
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
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
            content: `${listing.title}. ${message}`,
            senderId: user.uid,
            timestamp: new Date().toISOString()
          }
        };
        newConversation.messages[Date.now().toString()] = newConversation.lastMessage;
        await setDoc(newConversationRef, newConversation);
      } else {
        conversationId = querySnapshot.docs[0].id;
        // Add the new message to the existing conversation
        const conversationRef = doc(db, 'conversations', conversationId);
        const conversationDoc = await getDoc(conversationRef);
        const conversationData = conversationDoc.data();
        const newMessage = {
          content: `* This message is about: ${listing.title} * ${message}`,
          timestamp: serverTimestamp(),
          senderId: user.uid
        };
        conversationData.messages[Date.now().toString()] = newMessage;
        conversationData.lastMessage = newMessage;
        await setDoc(conversationRef, conversationData);
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
      <div className="listing-page">
        <Header />
        <div className="listing-container">
          <div className="listing-card">
            <div className="listing-image">
              <img src={listing.imageUrl} alt={listing.title} />
            </div>
            <div className="listing-details">
              <h2>{listing.title}</h2>
              <p className="description">{listing.description}</p>
              <p className="price">Price: ${listing.price}</p>
              {user && (
                user.uid === listing.userId ? (
                  <p>Posted by: <Link to="/profile">you!</Link></p>
                ) : (
                  <div>
                    <p>Posted by: <Link to={`/profile/${listing.userId}`}>{listing.username}</Link></p>
                    <form onSubmit={handleSendMessage} className="message-form">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message seller"
                        required
                      />
                      <button type="submit">Send</button>
                    </form>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ListingDetail;