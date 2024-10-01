import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../utils/firebaseConfig';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import '../styles/Universal.css';
import '../styles/UploadListing.css';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserName(userDoc.data().name || 'Anonymous');
          } else {
            setUserName('Anonymous');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserName('Anonymous');
        }
      }
    };

    fetchUserName();
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !price || !image) {
      setError('Please fill in all fields and upload an image.');
      return;
    }

    if (!user) {
      setError('You must be logged in to upload a listing.');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `listings/${user.uid}/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Add listing to Firestore
      const listingRef = await addDoc(collection(db, 'listings'), {
        title,
        description,
        price: parseFloat(price),
        imageUrl,
        userId: user.uid,
        username: userName,
        createdAt: serverTimestamp()
      });

      console.log('Listing added with ID: ', listingRef.id);
      navigate('/profile'); // Redirect to profile page after successful upload
    } catch (error) {
      setError('Error uploading listing: ' + error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="upload-bg">
        <div className="upload-section d-flex flex-direction-row justify-content-center pt-4">
          <div className="upload-container">
            <h2 className="upload-title">Upload New Listing</h2>
            <form onSubmit={handleSubmit} className="upload-form">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="upload-input"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="upload-textarea"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="upload-input"
                required
              />
              <input
                type="file"
                onChange={handleImageChange}
                className="upload-file-input"
                required
              />
              {error && <p className="upload-error">{error}</p>}
              <button type="submit" className="upload-button">Upload Listing</button>
            </form>
            <div className="tips">
            </div>
          </div>
        </div>
        <div className="tips d-flex flex-column pt-3">
          <p><strong>Notes on uploading:</strong></p>
          <p>
            Huskyswap (currently) only supports single images, so do your best to completely and accurately
            describe the item you're posting in the title and description, including (if applicable) <strong>size</strong>,
            <strong> condition</strong>, and anything else you'd want to know if you were looking to buy it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;