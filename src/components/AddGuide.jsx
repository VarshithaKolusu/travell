import React, { useState } from "react";

export default function AddGuide({ onAdd }) {
  const [guide, setGuide] = useState({
    name: "",
    places: "",
    time: "",
    price: ""
  });

  const handleChange = e => setGuide({ ...guide, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(guide);
    setGuide({ name: "", places: "", time: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Guide Name</label>
      <input name="name" type="text" required value={guide.name} onChange={handleChange} />

      <label className="form-label">Places to Show</label>
      <input name="places" type="text" required value={guide.places} onChange={handleChange} />

      <label className="form-label">Available Time (in hours)</label>
      <input name="time" type="number" required value={guide.time} onChange={handleChange} />

      <label className="form-label">Pricing</label>
      <input name="price" type="text" required value={guide.price} onChange={handleChange} />

      <button className="button" type="submit">Add Guide</button>
    </form>
  );
}
