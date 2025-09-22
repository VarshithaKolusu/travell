import React from "react";

export default function HotelBooking({ tripDetails, postings, onReserve }) {
  // Combine provider hotels with demo hotels
  const hotels = [
    ...postings.hotels,
    { name: "OceanView Hotel", rooms: "Deluxe, Suite", available: 7, price: "₹4200/night" },
    { name: "HillSide Resort", rooms: "Standard, Suite", available: 4, price: "₹3300/night" },
    { name: "CityStay Inn", rooms: "Single, Double", available: 11, price: "₹2800/night" }
  ];
  return (
    <div>
      <h3 className="section-title">Step 3: Book Hotel</h3>
      {hotels.map((hotel, idx) => (
        <div key={idx} style={{
          border: "1px solid #eee", borderRadius: "5px", padding: "9px", marginBottom: "12px"
        }}>
          <div><b>{hotel.name}</b></div>
          <div>Rooms: {hotel.rooms}</div>
          <div>Available: {hotel.available}</div>
          <div>Price: {hotel.price}</div>
          <button className="button" style={{ marginTop: "8px" }} onClick={onReserve}>Reserve</button>
        </div>
      ))}
    </div>
  );
}
