import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ loggedIn, onLogin, onSignup, handleLogout }) {
  const navigate = useNavigate();
  return (
    <header className="main-header">
      <div className="logo-area" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <span className="logo-icon">🌎</span>
        <span className="logo-text">Travelly</span>
      </div>
      <nav>
        <button className="nav-btn" onClick={() => navigate("/")}>Home</button>
        <button className="nav-btn" onClick={() => navigate("/about")}>About</button>
        {!loggedIn ? (
          <>
            <button className="nav-btn" onClick={onLogin}>Login</button>
            <button className="nav-btn" onClick={onSignup}>Sign Up</button>
          </>
        ) : (
          <button className="nav-btn" onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
}
