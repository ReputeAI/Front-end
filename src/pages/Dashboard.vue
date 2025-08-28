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
      <div
        v-if="isDev"
        class="p-4 bg-white dark:bg-gray-800 rounded shadow mb-6"
      >
        <h2 class="text-lg font-semibold mb-2">Developer</h2>
        <div class="flex gap-2 mb-2">
          <BaseButton variant="secondary" @click="fetchDev('/me')">
            Me
          </BaseButton>
          <BaseButton variant="secondary" @click="fetchDev('/usage/')">
            Usage
          </BaseButton>
          <BaseButton variant="secondary" @click="fetchDev('/health')">
            Health
          </BaseButton>
        </div>
        <pre v-if="devOutput" class="text-xs whitespace-pre-wrap">{{ devOutput }}</pre>
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
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import BaseButton from '../components/BaseButton.vue';

const reviewStore = useReviewsStore();
const reviews = reviewStore.reviews;

const auth = useAuthStore();
onMounted(() => {
  if (!auth.me) {
    auth.fetchMe();
  }
});

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

const isDev = import.meta.env.DEV;
const devOutput = ref('');

async function fetchDev(path) {
  try {
    const res = await fetch(path, { credentials: 'include' });
    const data = await res.json();
    devOutput.value = JSON.stringify(data, null, 2);
  } catch (err) {
    devOutput.value = String(err);
  }
}
</script>
