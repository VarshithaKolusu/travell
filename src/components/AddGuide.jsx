import React, { useState } from "react";
import { addGuide } from "../api/api";

export default function AddGuide({ onAdd, user }) {
  const [guide, setGuide] = useState({
    name: "",
    places: "",
    time: "",
    price: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setGuide({ ...guide, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const guideWithOwner = {
        ...guide,
        owner: { id: user.id },
        time: parseInt(guide.time, 10),
      };
      const response = await addGuide(guideWithOwner);
      onAdd(response.data);
      setGuide({ name: "", places: "", time: "", price: "" });
      setError("");
    } catch (err) {
      setError("Failed to add guide.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Guide Name</label>
      <input name="name" type="text" required value={guide.name} onChange={handleChange} />
      <label>Places to Show</label>
      <input name="places" type="text" required value={guide.places} onChange={handleChange} />
      <label>Available Time (in hours)</label>
      <input name="time" type="number" required value={guide.time} onChange={handleChange} />
      <label>Pricing</label>
      <input name="price" type="text" required value={guide.price} onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add Guide</button>
    </form>
  );
}
