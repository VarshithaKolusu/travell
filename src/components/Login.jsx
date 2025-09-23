import React, { useState } from "react";
import { loginUser } from "../api/api";

export default function Login({ setRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setLoginRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username, password, role });
      setRole(role, { name: username });
      setError("");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Login failed. Please check credentials.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <select
        required
        value={role}
        onChange={(e) => setLoginRole(e.target.value)}
      >
        <option value="">Select Role</option>
        <option value="traveler">Traveler</option>
        <option value="provider">Service Provider</option>
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
