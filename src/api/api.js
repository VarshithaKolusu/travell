import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api"; // Adjust port if needed

export const registerUser = (user) => axios.post(`${API_BASE_URL}/users/register`, user);
export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/users/login`, credentials);
export const addHotel = (hotel) => axios.post(`${API_BASE_URL}/hotels`, hotel);
export const getHotels = () => axios.get(`${API_BASE_URL}/hotels`);
export const createBooking = (booking) => axios.post(`${API_BASE_URL}/bookings`, booking);
export const getBookingsByUser = (userId) => axios.get(`${API_BASE_URL}/bookings/user/${userId}`);
export const addGuide = (guide) => axios.post(`${API_BASE_URL}/guides`, guide);
export const addRestaurant = (restaurant) => axios.post(`${API_BASE_URL}/restaurants`, restaurant);
export const getGuides = () => axios.get(`${API_BASE_URL}/guides`);
export const getRestaurants = () => axios.get(`${API_BASE_URL}/restaurants`);

