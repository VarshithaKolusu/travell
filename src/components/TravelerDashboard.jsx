import React, { useState } from "react";

// Reusable piece for clickable cards
function SelectTransportType({ onSelectType }) {
  const transportModes = [
    { type: "train", label: "Train", icon: "🚆" },
    { type: "plane", label: "Plane", icon: "✈️" },
    { type: "bus", label: "Bus", icon: "🚌" }
  ];
  return (
    <div style={{ display: "flex", gap: "32px", justifyContent: "center", margin: "30px 0" }}>
      {transportModes.map(t => (
        <div
          key={t.type}
          style={{
            background: "#f6fcfe",
            border: "2.5px solid #23b6dd",
            borderRadius: "20px",
            width: "125px",
            height: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 3px 10px #61bbe62a",
            fontSize: "2rem"
          }}
          onClick={() => onSelectType(t.type)}
        >
          <span style={{ fontSize: "2.6rem", marginBottom: "8px" }}>{t.icon}</span>
          <span style={{ fontWeight: 600, fontSize: "1.15rem", color: "#1a5b8b" }}>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function TravelerDashboard({ user }) {
  const [stage, setStage] = useState(1);
  const [trip, setTrip] = useState({ from: "", to: "", startDate: "", endDate: "" });
  const [mode, setMode] = useState("");
  const [transport, setTransport] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [guide, setGuide] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // Demo options
  const transportOptions = {
    train: [{ name: "Express", depart: "10:00", arrive: "14:00" }],
    plane: [{ name: "Jet Airways", depart: "11:00", arrive: "13:40" }],
    bus: [{ name: "RedBus", depart: "16:00", arrive: "20:30" }]
  };
  const hotels = [
    { name: "OceanView Hotel" },
    { name: "HillSide Resort" }
  ];
  const restaurants = [
    { name: "Sunset Dine" },
    { name: "Vista Cafe" }
  ];
  const guides = [
    { name: "Raj (City Tour)" },
    { name: "Amit (Heritage Walk)" }
  ];

  if (confirmed) {
    return (
      <div className="page-card">
        <h2>Booking Successful!</h2>
        <p>Check your mail for details.</p>
      </div>
    );
  }

  // Main Booking Wizard Flow
  return (
    <div className="page-card">
      <h2 style={{ color: "#16999f" }}>Welcome, {user && user.name}</h2>
      <hr />
      {stage === 1 && (
        <form onSubmit={e => { e.preventDefault(); setStage(2); }}>
          <label className="form-label">From</label>
          <input required value={trip.from} onChange={e => setTrip({ ...trip, from: e.target.value })} />
          <label className="form-label">To</label>
          <input required value={trip.to} onChange={e => setTrip({ ...trip, to: e.target.value })} />
          <label className="form-label">Start Date</label>
          <input type="date" required value={trip.startDate} onChange={e => setTrip({ ...trip, startDate: e.target.value })} />
          <label className="form-label">End Date</label>
          <input type="date" required value={trip.endDate} onChange={e => setTrip({ ...trip, endDate: e.target.value })} />
          <button className="button" type="submit">Next</button>
        </form>
      )}
      {stage === 2 && (
        <>
          <h3 style={{ marginTop: "0" }}>Choose Mode of Transport</h3>
          <SelectTransportType onSelectType={type => { setMode(type); setStage(3); }} />
        </>
      )}
      {stage === 3 && (
        <>
          <h3 style={{ marginTop: "0" }}>Select {mode && mode.charAt(0).toUpperCase() + mode.slice(1)}</h3>
          {transportOptions[mode]?.map((t, i) => (
            <div key={i} style={{
              border: "1px solid #d1edef", padding: "14px", borderRadius: "8px",
              marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <span><b>{t.name}</b> ({t.depart} - {t.arrive})</span>
              <button className="button" onClick={() => { setTransport(t); setStage(4); }}>Book</button>
            </div>
          ))}
        </>
      )}
      {stage === 4 && (
        <>
          <h3>Book Hotel</h3>
          {hotels.map((h, i) => (
            <div key={i} style={{
              border: "1px solid #e5e8f7", padding: "14px", borderRadius: "8px",
              marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <span>{h.name}</span>
              <button className="button" onClick={() => { setHotel(h); setStage(5); }}>Book</button>
            </div>
          ))}
        </>
      )}
      {stage === 5 && (
        <>
          <h3>Book Restaurant</h3>
          {restaurants.map((r, i) => (
            <div key={i} style={{
              border: "1px solid #e5e8f7", padding: "14px", borderRadius: "8px",
              marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <span>{r.name}</span>
              <button className="button" onClick={() => { setRestaurant(r); setStage(6); }}>Book</button>
            </div>
          ))}
          <button className="button" onClick={() => setStage(6)} style={{ marginTop: "8px", background: "#bbb" }}>Skip</button>
        </>
      )}
      {stage === 6 && (
        <>
          <h3>Book Guide</h3>
          {guides.map((g, i) => (
            <div key={i} style={{
              border: "1px solid #e5e8f7", padding: "14px", borderRadius: "8px",
              marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
              <span>{g.name}</span>
              <button className="button" onClick={() => { setGuide(g); setStage(7); }}>Book</button>
            </div>
          ))}
          <button className="button" onClick={() => setStage(7)} style={{ marginTop: "8px", background: "#bbb" }}>Skip</button>
        </>
      )}
      {stage === 7 && (
        <>
          <h3>Review and Confirm</h3>
          <ul>
            <li><b>From:</b> {trip.from}</li>
            <li><b>To:</b> {trip.to}</li>
            <li><b>Start Date:</b> {trip.startDate}</li>
            <li><b>End Date:</b> {trip.endDate}</li>
            <li><b>Transport:</b> {transport?.name}</li>
            <li><b>Hotel:</b> {hotel?.name}</li>
            <li><b>Restaurant:</b> {restaurant?.name || "None"}</li>
            <li><b>Guide:</b> {guide?.name || "None"}</li>
          </ul>
          <button className="button" onClick={() => setConfirmed(true)}>Confirm Booking</button>
        </>
      )}
    </div>
  );
}
