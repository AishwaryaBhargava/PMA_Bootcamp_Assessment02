import axios from 'axios';

// ✅ Base URL from .env (without /api/weather at the end)
const BASE_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/weather`;

// ✅ Standard CRUD endpoints
export const fetchWeatherEntries = () => axios.get(BASE_URL);

export const createWeatherEntry = (data) => axios.post(BASE_URL, data);

export const updateWeatherEntry = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteWeatherEntry = (id) => axios.delete(`${BASE_URL}/${id}`);
