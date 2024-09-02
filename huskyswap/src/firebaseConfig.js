// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmTTvu-WV8IQI3JMPdnMk49A-bx6KKtLY",
  authDomain: "huskyswap-c674a.firebaseapp.com",
  projectId: "huskyswap-c674a",
  storageBucket: "huskyswap-c674a.appspot.com",
  messagingSenderId: "845070182010",
  appId: "1:845070182010:web:cf82f02ff56a1f27ff7dc3",
  measurementId: "G-N4JGCTM7F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result => {
    console.log(result);
  }))
  .catch((error => {
    console.log(error);
  }))
};

export { auth };
