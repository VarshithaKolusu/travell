import React, { useState, useEffect } from "react";
import AddHotel from "./AddHotel";
import AddGuide from "./AddGuide";
import AddRestaurant from "./AddRestaurant";
import { getHotels, getGuides, getRestaurants } from "../api/api";

export default function ProviderDashboard({ user }) {
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getHotels().then((res) => setHotels(res.data));
    getGuides().then((res) => setGuides(res.data));
    getRestaurants().then((res) => setRestaurants(res.data));
  }, []);

  const handleAddHotel = (hotel) => setHotels([...hotels, hotel]);
  const handleAddGuide = (guide) => setGuides([...guides, guide]);
  const handleAddRestaurant = (restaurant) => setRestaurants([...restaurants, restaurant]);

  return (
    <div>
      <h2>Provider Dashboard</h2>

      <section>
        <h3>Add Hotel</h3>
        <AddHotel onAdd={handleAddHotel} user={user} />
        <ul>
          {hotels
            .filter((hotel) => hotel.owner.id === user.id)
            .map((hotel) => (
              <li key={hotel.id}>{hotel.name} - {hotel.roomType} - ${hotel.price}</li>
            ))}
        </ul>
      </section>

      <section>
        <h3>Add Guide</h3>
        <AddGuide onAdd={handleAddGuide} user={user} />
        <ul>
          {guides
            .filter((guide) => guide.owner.id === user.id)
            .map((guide) => (
              <li key={guide.id}>{guide.name} - {guide.places} - ${guide.price}</li>
            ))}
        </ul>
      </section>

      <section>
        <h3>Add Restaurant</h3>
        <AddRestaurant onAdd={handleAddRestaurant} user={user} />
        <ul>
          {restaurants
            .filter((restaurant) => restaurant.owner.id === user.id)
            .map((restaurant) => (
              <li key={restaurant.id}>{restaurant.name} - Tables: {restaurant.tables} - ${restaurant.price}</li>
            ))}
        </ul>
      </section>
    </div>
  );
}
