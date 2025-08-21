<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 space-y-6">
      <h1 class="text-2xl font-bold">Settings</h1>
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4">
        <h2 class="font-semibold">Integrations</h2>
        <button class="px-4 py-2 bg-primary text-white rounded">Connect Google Reviews</button>
        <button class="px-4 py-2 bg-primary text-white rounded">Connect Trustpilot</button>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between">
        <span class="font-semibold">Auto-reply to positive reviews</span>
        <input type="checkbox" v-model="autoReply" class="h-5 w-5" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { ref } from 'vue';

const autoReply = ref(false);
</script>
