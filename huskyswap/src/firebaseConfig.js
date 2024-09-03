import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmTTvu-WV8IQI3JMPdnMk49A-bx6KKtLY",
  authDomain: "huskyswap-c674a.firebaseapp.com",
  projectId: "huskyswap-c674a",
  storageBucket: "huskyswap-c674a.appspot.com",
  messagingSenderId: "845070182010",
  appId: "1:845070182010:web:cf82f02ff56a1f27ff7dc3",
  measurementId: "G-N4JGCTM7F6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export { auth, signInWithGoogle, db };
