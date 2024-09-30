import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/AboutPage.css';
import '../styles/Universal.css';


const About = () => {
  return (
    <div className="about-container">
      <Header />
      <div className="about-content">
        <h1>So What is This?</h1>
        <p className="summary-top">
            HuskySwap is an online platform for UW students to post items
            they'd like to sell, find items they want, and connect to exchange.
        </p>
        <h2>Why I Made it</h2>
        <p>I made this platform on a few key principles I've noticed during my time at UW:</p>
        <ul>
            <li>Students like buying things cheap</li>
            <li>Students like quick ways to earn a little extra money</li>
            <li>
                Things students have and don't need end up thrown out because the cost/hassle of 
                selling and shipping small items isn't worth it. 
            </li>
        </ul>
        <p>
            With these in mind, I wanted to create a self-sustaining online marketplace exclusively
            for UW Seattle students. It's something that I wanted myself, as an online marketplace 
            veteran and student without consistent access to a car. 
        </p>
        <p>
            Did you buy a self-heating pot 
            off of Amazon for your freshman dorm that you haven't touched in a year? Do you have 
            chem textbooks that you'll never use again taking up space in your room? Did your 
            wardrobe revamp leave you a pile of clothes that you're probably not gonna wear out again? 
            Don't want to pay ten dollars to ship your twelve dollar t-shirt to a person in Arizona?
        </p>
        <p className="call">Throw it on HuskySwap!</p>
        <h2>What makes this different than other online marketplaces?</h2>
        <ul>
          <li>Smaller user base - Posts are more relevant to UW Students and their needs</li>
          <li>Local - Everyone's on/around campus, can meet up to exchange goods</li>
          <li>User autonomy - let the buyer and seller figure out how to safely and successfully make exchanges</li>
          <li>No buyer / seller fees!</li>
        </ul>        
        <h2>Contact</h2>
        <p>
          If you have any questions or feedback, reach out at {' '}
          <a href="mailto:gvd@uw.edu">gvd@uw.edu</a>.
        </p>
      </div>
        <div className="back-button-container">
            <Link to="/" className="back-button">Back to Home</Link>
        </div>
    </div>
  );
};

export default About;