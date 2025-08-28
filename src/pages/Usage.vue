<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Usage</h1>
        <div class="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <TableSkeleton v-if="loading" :cols="4" :rows="3" />
          <div v-else-if="error" class="text-red-600">{{ error.message || error }}</div>
          <div v-else>
            <p class="mb-4">Current Plan: <strong>{{ plan }}</strong></p>
            <table class="min-w-full text-left">
              <thead>
              <tr>
                <th class="p-2">Month</th>
                <th class="p-2">Reviews fetched</th>
                <th class="p-2">AI suggestions</th>
                <th class="p-2">Auto replies</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(m, month) in usage" :key="month" class="border-t">
                <td class="p-2">{{ month }}</td>
                <td class="p-2">{{ m.reviews_fetched }}</td>
                <td class="p-2">{{ m.ai_suggestions }}</td>
                <td class="p-2">{{ m.auto_replies }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import { api } from '../lib/api';
import TableSkeleton from '../components/TableSkeleton.vue';

const loading = ref(false);
const error = ref(null);
const usage = ref({});
const plan = ref('');

async function fetchUsage() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await api.get('/usage');
    usage.value = data.usage || {};
    plan.value = data.plan || '';
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchUsage);
</script>

