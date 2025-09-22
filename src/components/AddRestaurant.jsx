import React, { useState } from "react";

export default function AddRestaurant({ onAdd }) {
  const [restaurant, setRestaurant] = useState({
    name: "",
    tables: "",
    conditions: "",
    price: ""
  });

  const handleChange = e => setRestaurant({ ...restaurant, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(restaurant);
    setRestaurant({ name: "", tables: "", conditions: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label">Restaurant Name</label>
      <input name="name" type="text" required value={restaurant.name} onChange={handleChange} />

      <label className="form-label">Tables Available</label>
      <input name="tables" type="number" required value={restaurant.tables} onChange={handleChange} />

      <label className="form-label">Booking Conditions</label>
      <input name="conditions" type="text" value={restaurant.conditions} onChange={handleChange} />

      <label className="form-label">Pricing (per table)</label>
      <input name="price" type="text" required value={restaurant.price} onChange={handleChange} />

      <button className="button" type="submit">Add Restaurant</button>
    </form>
  );
}
