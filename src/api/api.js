import axios from "axios";

// Change this if backend runs on different host or port
const API_BASE_URL = "http://localhost:8081/api";

// User APIs
export const registerUser = (user) => axios.post(`${API_BASE_URL}/users/register`, user);
export const loginUser = (credentials) => axios.post(`${API_BASE_URL}/users/login`, credentials);

// Hotel APIs
export const addHotel = (hotel) => axios.post(`${API_BASE_URL}/hotels`, hotel);
export const getHotels = () => axios.get(`${API_BASE_URL}/hotels`);

// Booking APIs
export const createBooking = (booking) => axios.post(`${API_BASE_URL}/bookings`, booking);
export const getBookingsByUser = (userId) => axios.get(`${API_BASE_URL}/bookings/user/${userId}`);
