import React, { useState } from "react";

export default function SelectTransport({ tripDetails, nextStage }) {
  const [mode, setMode] = useState("");

  const transportData = {
    train: [
      { name: "Express A", depart: "10:00", arrive: "14:00", price: "₹1800" },
      { name: "Fast B", depart: "15:15", arrive: "20:00", price: "₹2100" }
    ],
    plane: [
      { name: "Flight XZ101", depart: "08:30", arrive: "10:00", price: "₹9500" },
      { name: "Flight WW300", depart: "14:45", arrive: "16:40", price: "₹10400" }
    ],
    bus: [
      { name: "Intercity AC", depart: "07:00", arrive: "13:30", price: "₹900" }
    ]
  };

  return (
    <div>
      <h3 className="section-title">Step 2: Choose Transport</h3>
      <label className="form-label">Mode of Travel</label>
      <select required value={mode} onChange={e => setMode(e.target.value)}>
        <option value="">Select</option>
        <option value="train">Train</option>
        <option value="plane">Plane</option>
        <option value="bus">Bus</option>
      </select>

      {mode && (
        <div style={{ marginTop: "18px" }}>
          <h4>Available Options</h4>
          {transportData[mode].map((t, idx) => (
            <div key={idx} style={{
              border: "1px solid #eee",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "12px"
            }}>
              <div><b>{t.name}</b></div>
              <div>From: {tripDetails.from} To: {tripDetails.to}</div>
              <div>Time: {t.depart} - {t.arrive}</div>
              <div>Price: {t.price}</div>
              <button className="button" style={{ marginTop: "8px" }} onClick={() => nextStage(3)}>Book</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
