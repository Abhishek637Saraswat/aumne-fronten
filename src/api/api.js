import axios from "axios";

const BASE_URL = "https://aumne-ai-4.onrender.com";

export const getFlights = () => axios.get(`${BASE_URL}/flights/`);
export const getFlightById = (id) => axios.get(`${BASE_URL}/flights/${id}`);
export const bookFlight = (id, data) => axios.post(`${BASE_URL}/flights/${id}/book`, data);
export const cancelBooking = (id) => axios.delete(`${BASE_URL}/bookings/${id}`);
export const addFlight = (flightData) => axios.post(`${BASE_URL}/flights/`, flightData);
