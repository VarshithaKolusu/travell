import React, { useState } from "react";
import { createBooking } from "../api/api";

export default function BookingForm({ user, onBooked }) {
  const [booking, setBooking] = useState({
    hotel: { id: "" },
    user: { id: user.id },
    checkInDate: "",
    checkOutDate: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "hotelId") setBooking((b) => ({ ...b, hotel: { id: value } }));
    else setBooking((b) => ({ ...b, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBooking(booking);
      onBooked(response.data);
      setBooking({ hotel: { id: "" }, user: { id: user.id }, checkInDate: "", checkOutDate: "" });
      setError("");
    } catch (err) {
      setError("Failed to book.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="hotelId" placeholder="Hotel ID" value={booking.hotel.id} onChange={handleChange} required />
      <input name="checkInDate" type="date" value={booking.checkInDate} onChange={handleChange} required />
      <input name="checkOutDate" type="date" value={booking.checkOutDate} onChange={handleChange} required />
      {error && <p style={{color:'red'}}>{error}</p>}
      <button type="submit">Book Now</button>
    </form>
  );
}
