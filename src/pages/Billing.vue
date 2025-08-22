<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Billing</h1>
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p class="mb-2">Current Plan: <strong>Free</strong></p>
        <button class="px-4 py-2 bg-primary text-white rounded">Upgrade to Pro</button>
        <p class="mt-4 text-sm text-gray-500">Stripe checkout coming soon.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
</script>
