import axios from 'axios';

export const api = axios.create({
  baseURL: '/api'
});

// Placeholder for fetching reviews
export async function fetchReviews() {
  // return api.get('/reviews');
  return [];
}
