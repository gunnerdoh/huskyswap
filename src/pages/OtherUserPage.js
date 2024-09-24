import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs, setDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const OtherUserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndListings = async () => {
      try {
        // Fetch user data
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser({ id: userDoc.id, ...userDoc.data() });
        }

        // Fetch user's listings
        const listingsQuery = query(collection(db, 'listings'), where('userId', '==', userId));
        const listingsSnapshot = await getDocs(listingsQuery);
        const listings = listingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserListings(listings);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserAndListings();
  }, [userId]);

  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Check if a conversation already exists
    const conversationsQuery = query(
      collection(db, 'conversations'),
      where('participants', '==', [currentUser.uid, userId].sort())
    );
    const conversationsSnapshot = await getDocs(conversationsQuery);

    let conversationId;
    if (conversationsSnapshot.empty) {
      // Create a new conversation
      const newConversationRef = doc(collection(db, 'conversations'));
      await setDoc(newConversationRef, {
        participants: [currentUser.uid, userId].sort(),
        messages: {},
        lastMessage: {
          content: '',
          timestamp: new Date(),
          senderId: currentUser.uid
        }
      });
      conversationId = newConversationRef.id;
    } else {
      conversationId = conversationsSnapshot.docs[0].id;
    }

    navigate(`/messages/${conversationId}`);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2>{user.name}'s Profile</h2>
        <p>Email: {user.email}</p>
        <p>Joined: {new Date(user.joined).toLocaleDateString()}</p>

        {currentUser && currentUser.uid !== userId && (
          <button onClick={handleSendMessage} className="btn btn-primary mb-3">
            Send Message
          </button>
        )}

        <h3>Listings by {user.name}</h3>
        {userListings.map(listing => (
          <div key={listing.id} style={styles.listing}>
            <h4>{listing.title}</h4>
            <p>Price: ${listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  listing: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    marginBottom: '10px',
  },
};

export default OtherUserPage;