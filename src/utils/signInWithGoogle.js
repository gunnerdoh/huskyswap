import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user profile exists
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Create a new user profile
      const newUser = {
        id: user.uid,
        name: user.email.split('@'),
        email: user.email,
        joined: new Date().toISOString()
      };

      await setDoc(userDocRef, newUser);
      console.log('New user profile created');
    } else {
      console.log('User profile already exists');
    }

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export default signInWithGoogle;