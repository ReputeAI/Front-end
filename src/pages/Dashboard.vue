<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 class="text-lg font-semibold mb-2">Total Reviews</h2>
          <p class="text-3xl">{{ totalReviews }}</p>
        </div>
        <div class="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 class="text-lg font-semibold mb-2">Sentiment</h2>
          <Chart :type="'pie'" :data="chartData" />
        </div>
      </div>
      <h2 class="text-lg font-semibold mb-2">Recent Reviews</h2>
      <ReviewCard v-for="r in reviews.slice(0,3)" :key="r.id" :review="r" />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import Chart from '../components/Chart.vue';
import ReviewCard from '../components/ReviewCard.vue';
import { useReviewsStore } from '../stores/reviews';
import { computed } from 'vue';

const reviewStore = useReviewsStore();
const reviews = reviewStore.reviews;

const totalReviews = computed(() => reviews.length);

const chartData = {
  labels: ['Positive', 'Neutral', 'Negative'],
  datasets: [
    {
      data: [
        reviews.filter(r => r.sentiment === 'Positive').length,
        reviews.filter(r => r.sentiment === 'Neutral').length,
        reviews.filter(r => r.sentiment === 'Negative').length
      ],
      backgroundColor: ['#22c55e', '#eab308', '#ef4444']
    }
  ]
};
</script>
