import React, { useState } from "react";
import { addHotel } from "../api/api";
const handleAddHotel = (newHotel) => setHotels(prev => [...prev, newHotel]);

export default function AddHotel({ user, onAdd }) {
  const [hotel, setHotel] = useState({
    name: "",
    roomType: "",
    availableRooms: "",
    eligibility: "",
    price: ""
  });
  const [error, setError] = useState("");

  const handleChange = e => setHotel({...hotel, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hotelWithOwner = {
        ...hotel,
        owner: { id: user.id },
        availableRooms: parseInt(hotel.availableRooms, 10)
      };
      const response = await addHotel(hotelWithOwner);
      onAdd(response.data);
      setHotel({ name: "", roomType: "", availableRooms: "", eligibility: "", price: "" });
      setError("");
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Failed to add hotel. Try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Hotel Name" value={hotel.name} onChange={handleChange} required />
      <input name="roomType" type="text" placeholder="Room Type" value={hotel.roomType} onChange={handleChange} required />
      <input name="availableRooms" type="number" placeholder="Available Rooms" value={hotel.availableRooms} onChange={handleChange} required />
      <input name="eligibility" type="text" placeholder="Eligibility / Conditions" value={hotel.eligibility} onChange={handleChange} />
      <input name="price" type="text" placeholder="Price per night" value={hotel.price} onChange={handleChange} required />
      {error && <p style={{color: 'red'}}>{error}</p>}
      <button type="submit">Add Hotel</button>
    </form>
  );
}
