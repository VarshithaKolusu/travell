import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import TravelerDashboard from "./components/TravelerDashboard";
import ProviderDashboard from "./components/ProviderDashboard";
import About from "./components/About";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [modal, setModal] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [postings, setPostings] = useState({
    hotels: [],
    restaurants: [],
    guides: []
  });

  const navigate = useNavigate();

  // Add useNavigate here for routing after login
  const handleLogin = (loginRole, userDetails) => {
    setRole(loginRole);
    setUser(userDetails);
    setModal("");
    if (loginRole === "traveler") {
      navigate("/traveler");
    } else if (loginRole === "provider") {
      navigate("/provider");
    }
  };

  const handleLogout = () => {
    setRole("");
    setUser(null);
    navigate("/"); // send to homepage on logout
  };

  return (
    <>
      <Header
        loggedIn={!!role}
        onLogin={() => setModal("login")}
        onSignup={() => setModal("signup")}
        handleLogout={handleLogout}
      />
      {modal === "login" && (
        <Modal onClose={() => setModal("")}>
          <Login setRole={handleLogin} />
        </Modal>
      )}
      {modal === "signup" && (
        <Modal onClose={() => setModal("")}>
          <Signup setRole={handleLogin} />
        </Modal>
      )}
      <Routes>
        <Route path="/" element={<Home onLogin={() => setModal("login")} />} />
        <Route path="/traveler" element={<TravelerDashboard user={user} postings={postings} />} />
        <Route path="/provider" element={<ProviderDashboard user={user} postings={postings} setPostings={setPostings} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home onLogin={() => setModal("login")} />} />
      </Routes>
    </>
  );
}

export default function RouterWrappedApp() {
  // This wrapper ensures useNavigate works
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
