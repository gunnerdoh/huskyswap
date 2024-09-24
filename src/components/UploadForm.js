import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../utils/firebaseConfig';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../contexts/AuthContext';
import Header from '../pages/Header';

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

  // Rest of the component remains the same...

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h2 style={styles.title}>Upload New Listing</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="file"
            onChange={handleImageChange}
            style={styles.fileInput}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Upload Listing</button>
        </form>
      </div>
    </div>
  );
};

// styles object remains unchanged

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px',
  },
  fileInput: {
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default UploadForm;