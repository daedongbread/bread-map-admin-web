import axios from 'axios';

const fetcher = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/admin`,
  withCredentials: true,
});

export { fetcher };
