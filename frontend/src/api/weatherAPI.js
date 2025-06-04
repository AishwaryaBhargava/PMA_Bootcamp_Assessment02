import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/weather';

export const fetchWeatherEntries = () => axios.get(BASE_URL);

export const createWeatherEntry = (data) => axios.post(BASE_URL, data);

export const updateWeatherEntry = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteWeatherEntry = (id) => axios.delete(`${BASE_URL}/${id}`);
