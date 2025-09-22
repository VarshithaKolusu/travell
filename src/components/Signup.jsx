import React, { useState } from "react";

export default function Signup({ setRole }) {
  const [signupRole, setSignupRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPwd) {
      setError("Passwords do not match");
      return;
    }
    if (!signupRole || !username || !password) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    setRole(signupRole, { name: username });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Username</label>
        <input type="text" required value={username} onChange={e => setUsername(e.target.value)} />

        <label className="form-label">Password</label>
        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />

        <label className="form-label">Confirm Password</label>
        <input type="password" required value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} />

        <label className="form-label">Sign Up As</label>
        <select required value={signupRole} onChange={e => setSignupRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="traveler">Traveler</option>
          <option value="provider">Service Provider</option>
        </select>
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <button className="button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
