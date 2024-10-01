import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/AboutPage.css';
import '../styles/Universal.css';


const HowToUse = () => {
  return (
    <div className="about-container">
      <Header />
      <div className="about-content">
        <h1>How Do I use it?</h1>
        <p className="summary-top">
            This is a basic overview of how to use HuskySwap.
        </p>
        <h2>Getting Started</h2>
        <p>
            Logging in and signing up is handled by Google Authentication, meaning that anybody
            with a uw.edu email is able to sign up, and that all logging in / logging out 
            functions are securely handled by Google.
        </p>
        <p>
            Just Click on the "Log in with Google" button, and use the opened window to select what
            account you would like to log in with. HuskySwap will automatically assign a username 
            using your myUW username.
        </p>
        <p className="call">You're In!</p>
        <h2>Posting A Listing</h2>
        <p>
            To post a listing from a logged in account, click the "Sell Now" button 
            (found in the header on desktop view, and in the menu on mobile view), 
            fill out information about the item, pick an image, and post it.  
        </p>
        <p>
            Because HuskySwap only (currently) supports one image per listing, try to be 
            as descriptive as possible in the description, including size, condition, and 
            anything else you'd want to know if you were buying the item. A more descriptive
            listing description also makes it easier for other students to buy stuff. 
        </p>
        <h2>Messaging</h2>
            <p>
                When viewing a listing that you didn't post, there will be an option to message
                the seller. Type your message, and send it to the user. Keep in mind that the item
                you are messaging from will be included in the beginning of the message.
            </p>
            <p>
                From there, you are free to coordinate logistics regarding trading for the item 
                being discussed.
            </p>
      </div>
        <div className="back-button-container">
            <Link to="/" className="back-button">Back to Home</Link>
        </div>
    </div>
  );
};

export default HowToUse;