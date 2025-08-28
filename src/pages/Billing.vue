<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Billing</h1>
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
        <p>Current Plan: <strong>{{ plan || '...' }}</strong></p>
        <div class="space-x-2">
          <button
            v-for="p in plans"
            :key="p"
            @click="checkout(p)"
            class="px-4 py-2 bg-primary text-white rounded"
          >
            {{ p }}
          </button>
        </div>
        <button @click="openPortal" class="mt-4 underline">Open billing portal</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import { api } from '../lib/api';

const plan = ref('');
const plans = ['FREE', 'PRO', 'BUSINESS'];

async function fetchPlan() {
  try {
    const { data } = await api.get('/usage');
    plan.value = data.plan || '';
  } catch (e) {
    console.error(e);
  }
}

async function openPortal() {
  try {
    const { data } = await api.get('/billing/portal');
    if (data.url) window.open(data.url, '_blank');
  } catch (e) {
    console.error(e);
  }
}

async function checkout(target) {
  try {
    const { data } = await api.post('/billing/checkout', { plan: target });
    if (data.url) window.location.href = data.url;
  } catch (e) {
    console.error(e);
  }
}

onMounted(fetchPlan);
</script>

