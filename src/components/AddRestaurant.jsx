import React, { useState } from "react";
import { addRestaurant } from "../api/api";

export default function AddRestaurant({ onAdd, user }) {
  const [restaurant, setRestaurant] = useState({
    name: "",
    tables: "",
    conditions: "",
    price: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setRestaurant({ ...restaurant, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const restaurantWithOwner = {
        ...restaurant,
        owner: { id: user.id },
        tables: parseInt(restaurant.tables, 10),
      };
      const response = await addRestaurant(restaurantWithOwner);
      onAdd(response.data);
      setRestaurant({ name: "", tables: "", conditions: "", price: "" });
      setError("");
    } catch (err) {
      setError("Failed to add restaurant.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Restaurant Name</label>
      <input name="name" type="text" required value={restaurant.name} onChange={handleChange} />
      <label>Tables Available</label>
      <input name="tables" type="number" required value={restaurant.tables} onChange={handleChange} />
      <label>Booking Conditions</label>
      <input name="conditions" type="text" value={restaurant.conditions} onChange={handleChange} />
      <label>Pricing (per table)</label>
      <input name="price" type="text" required value={restaurant.price} onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add Restaurant</button>
    </form>
  );
}
