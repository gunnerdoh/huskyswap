import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebaseConfig';
import { doc, getDoc, setDoc, collection, query, where, getDocs, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ListingPage.css';
import '../styles/Universal.css';

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedListing, setEditedListing] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = doc(db, 'listings', id);
        const listingDoc = await getDoc(listingRef);
        if (listingDoc.exists()) {
          const listingData = { id: listingDoc.id, ...listingDoc.data() };
          setListing(listingData);
          setEditedListing(listingData);
        } else {
          console.log('No such listing!');
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedListing(listing);
  };

  const handleSaveEdit = async () => {
    try {
      const listingRef = doc(db, 'listings', id);
      await updateDoc(listingRef, {
        title: editedListing.title,
        description: editedListing.description,
        price: parseFloat(editedListing.price),
      });
      setListing(editedListing);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await deleteDoc(doc(db, 'listings', id));
        navigate('/profile');
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedListing(prev => ({ ...prev, [name]: value }));
  };

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
            timestamp: serverTimestamp()
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

  if (!listing) return <div className="loading">Loading...</div>;

  return (
    <div className="listing-page">
      <Header />
      <div className="listing-container">
        <div className="listing-card">
          <div className="listing-image">
            <img src={listing.imageUrl} alt={listing.title} />
          </div>
          <div className="listing-details">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  name="title"
                  value={editedListing.title}
                  onChange={handleInputChange}
                  className="edit-input"
                />
                <textarea
                  name="description"
                  value={editedListing.description}
                  onChange={handleInputChange}
                  className="edit-textarea"
                />
                <input
                  type="number"
                  name="price"
                  value={editedListing.price}
                  onChange={handleInputChange}
                  className="edit-input"
                />
                <div className="edit-buttons">
                  <button onClick={handleSaveEdit} className="save-button">Save</button>
                  <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <h2>{listing.title}</h2>
                <p className="description">{listing.description}</p>
                <p className="price">Price: ${listing.price}</p>
              </>
            )}
            {user && (
              user.uid === listing.userId ? (
                <div className="owner-actions">
                  <p>Posted by: <Link to="/profile">you!</Link></p>
                  {!isEditing && (
                    <div className="owner-buttons">
                      <button onClick={handleEdit} className="edit-button">Edit Listing</button>
                      <button onClick={handleDelete} className="delete-button">Delete Listing</button>
                      <Link to="/" className="back-button">Back to Home</Link>
                    </div>
                  )}
                </div>
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

                  <div className="back-button-container mt-3 mb-0">
                      <Link to="/" className="back-button">Back to Home</Link>
                  </div>
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