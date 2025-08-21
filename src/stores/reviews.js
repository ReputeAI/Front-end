import { defineStore } from 'pinia';

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: [
      { id: 1, platform: 'Google', reviewer: 'Alice', rating: 5, text: 'Great service!', sentiment: 'Positive' },
      { id: 2, platform: 'Trustpilot', reviewer: 'Bob', rating: 2, text: 'Not happy.', sentiment: 'Negative' },
      { id: 3, platform: 'Google', reviewer: 'Carol', rating: 3, text: 'Okay experience', sentiment: 'Neutral' }
    ]
  })
});
