import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Removed unused useNavigate
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

  const handleLogin = (loginRole, userDetails) => {
    setRole(loginRole);
    setUser(userDetails);
    setModal("");
  };

  const handleLogout = () => {
    setRole("");
    setUser(null);
  };

  return (
    <BrowserRouter>
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
        <Route path="/" element={
          !role
            ? <Home onLogin={() => setModal("login")} />
            : role === "traveler"
              ? <TravelerDashboard user={user} postings={postings} />
              : <ProviderDashboard user={user} postings={postings} setPostings={setPostings} />
        } />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home onLogin={() => setModal("login")} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;