import React, { useState } from "react";
import AddHotel from "./AddHotel";
import AddRestaurant from "./AddRestaurant";
import AddGuide from "./AddGuide";

export default function ProviderDashboard({ user, postings, setPostings }) {
  const [tab, setTab] = useState("hotel");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editIdx, setEditIdx] = useState(-1);

  const typeMap = {
    hotel: {
      singular: "Hotel",
      postingsKey: "hotels",
      FormComponent: AddHotel,
      fields: item =>
        <>
          <div>Rooms: {item.roomType}</div>
          <div>Available: {item.available}</div>
          <div>Price: {item.price}</div>
          <div>Eligibility: {item.eligibility}</div>
        </>
    },
    restaurant: {
      singular: "Restaurant",
      postingsKey: "restaurants",
      FormComponent: AddRestaurant,
      fields: item =>
        <>
          <div>Tables: {item.tables}</div>
          <div>Price: {item.price}</div>
          <div>Conditions: {item.conditions}</div>
        </>
    },
    guide: {
      singular: "Guide",
      postingsKey: "guides",
      FormComponent: AddGuide,
      fields: item =>
        <>
          <div>Places: {item.places}</div>
          <div>Time: {item.time}</div>
          <div>Price: {item.price}</div>
        </>
    }
  };

  const { singular, postingsKey, FormComponent, fields } = typeMap[tab];

  // Handle add, edit, delete
  const handleAdd = item => {
    setPostings(prev => ({
      ...prev,
      [postingsKey]: [...prev[postingsKey], item]
    }));
    setShowAddForm(false);
  };
  const handleEdit = (idx, updated) => {
    setPostings(prev => {
      const arr = [...prev[postingsKey]];
      arr[idx] = updated;
      return { ...prev, [postingsKey]: arr };
    });
    setEditIdx(-1);
  };
  const handleDelete = idx => {
    setPostings(prev => {
      const arr = [...prev[postingsKey]];
      arr.splice(idx, 1);
      return { ...prev, [postingsKey]: arr };
    });
  };

  return (
    <div className="page-card">
      <h2 style={{ color: "#16999f" }}>Welcome, {user.name}</h2>
      <hr />
      <h3 className="section-title">Your {singular} Listings</h3>

      {/* Tab switcher */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "22px" }}>
        <button className={`button${tab === "hotel" ? "" : " outline"}`} onClick={() => { setTab("hotel"); setShowAddForm(false); }}>Hotels</button>
        <button className={`button${tab === "restaurant" ? "" : " outline"}`} onClick={() => { setTab("restaurant"); setShowAddForm(false); }}>Restaurants</button>
        <button className={`button${tab === "guide" ? "" : " outline"}`} onClick={() => { setTab("guide"); setShowAddForm(false); }}>Guides</button>
        <button className="button" style={{ marginLeft: "auto" }} onClick={() => setShowAddForm(!showAddForm)}>Add New {singular}</button>
      </div>

      {/* Postings List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", marginBottom: "30px" }}>
        {postings[postingsKey].length === 0 && <div>No {singular.toLowerCase()} postings yet.</div>}
        {postings[postingsKey].map((item, idx) => (
          <div key={idx} style={{
            background: "#f6fafb",
            border: "1.8px solid #c7e8f7",
            borderRadius: "15px",
            padding: "20px 24px",
            width: "285px",
            boxShadow: "0 3px 12px #aae8ea36",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
          }}>
            <b style={{ fontSize: "1.08rem" }}>{item.name}</b>
            <div style={{ margin: "10px 0" }}>{fields(item)}</div>
            <div>
              <button className="button" style={{ marginRight: "7px", padding: "6px 18px", fontSize: "1em" }} onClick={() => setEditIdx(idx)}>Edit</button>
              <button className="button" style={{ padding: "6px 18px", background: "#d9534f", fontSize: "1em" }} onClick={() => handleDelete(idx)}>Delete</button>
            </div>
            {editIdx === idx && (
              <EditForm
                initial={item}
                onSave={updated => handleEdit(idx, updated)}
                onCancel={() => setEditIdx(-1)}
                fields={Object.keys(item)}
                type={tab}
              />
            )}
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div style={{ border: "1px solid #cbe9ee", background: "#e9f6fa", padding: "22px 30px", borderRadius: "14px", marginBottom: 24 }}>
          <FormComponent onAdd={handleAdd} />
        </div>
      )}
    </div>
  );
}

// EditForm can edit any listing item inline
function EditForm({ initial, onSave, onCancel, fields, type }) {
  const [form, setForm] = useState({ ...initial });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form onSubmit={e => { e.preventDefault(); onSave(form); }}>
      {fields.map(f => (
        <div key={f} style={{ marginBottom: 6 }}>
          <input
            name={f}
            value={form[f]}
            onChange={handleChange}
            style={{ width: "100%", padding: "7px", borderRadius: "6px", border: "1px solid #c5ebed" }}
          />
        </div>
      ))}
      <button className="button" style={{ marginRight: "8px", padding: "6px 18px" }} type="submit">Save</button>
      <button className="button outline" type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
