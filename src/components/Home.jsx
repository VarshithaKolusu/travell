import React from "react";
import pic1 from "../assets/pic1.jpg"; // relative path from Home.jsx to assets
import "./Home.css"; 


export default function Home({ onLogin, onSignup }) {
  return (
    <div className="home-hero">
      <div className="hero-left">
        <h1>Discover, Plan, Enjoy.</h1>
        <p>The all-in-one platform for seamless trip management. Book hotels, restaurants & guides—all in one place.</p>
        <div>
          <button className="cta-btn" onClick={onLogin}>Start Your Journey</button>
          <button className="cta-btn outline" onClick={onSignup}>Sign Up</button>
        </div>
        <ul className="features-list">
          <li>✓ Hassle-free planning</li>
          <li>✓ Reliable service providers</li>
          <li>✓ Secure bookings</li>
        </ul>
      </div>
      <div className="hero-right">
        <img src={pic1} alt="Travel" />
      </div>
    </div>
  );
}
