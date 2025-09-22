import React, { useState } from "react";

export default function AddHotel({ onAdd }) {
  const [hotel, setHotel] = useState({
    name: "",
    roomType: "",
    available: "",
    eligibility: "",
    price: ""
  });

  const handleChange = e => setHotel({ ...hotel, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(hotel);
    setHotel({ name: "", roomType: "", available: "", eligibility: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Hotel Name</label>
      <input name="name" type="text" required value={hotel.name} onChange={handleChange} />

      <label className="form-label">Room Type</label>
      <input name="roomType" type="text" required value={hotel.roomType} onChange={handleChange} />

      <label className="form-label">Available Rooms</label>
      <input name="available" type="number" required value={hotel.available} onChange={handleChange} />

      <label className="form-label">Eligibility/Conditions</label>
      <input name="eligibility" type="text" value={hotel.eligibility} onChange={handleChange} />

      <label className="form-label">Pricing (per night)</label>
      <input name="price" type="text" required value={hotel.price} onChange={handleChange} />

      <button className="button" type="submit">Add Hotel</button>
    </form>
  );
}
