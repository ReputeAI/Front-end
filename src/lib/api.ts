import axios, { AxiosInstance } from 'axios';

export function createAxios(): AxiosInstance {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export const api = createAxios();

