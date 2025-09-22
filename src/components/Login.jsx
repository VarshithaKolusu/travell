import React, { useState } from "react";

export default function Login({ setRole }) {
  const [role, setLoginRole] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role && username) {
      setRole(role, { name: username });
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Username</label>
        <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />

        <label className="form-label">Login As</label>
        <select required value={role} onChange={e => setLoginRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="traveler">Traveler</option>
          <option value="provider">Service Provider</option>
        </select>
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}
