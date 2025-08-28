<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Replies</h1>

        <div class="mb-4 flex items-center gap-2">
          <input
            v-model="reviewId"
            type="text"
            placeholder="Filter by review ID"
            class="border p-1 rounded"
          />
          <BaseButton @click="fetchReplies" :loading="loading">
            Refresh
          </BaseButton>
        </div>

        <div v-if="loading" class="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <TableSkeleton :cols="5" :rows="5" />
        </div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>
        <div v-else>
          <table class="min-w-full bg-white dark:bg-gray-800 rounded shadow">
            <thead>
            <tr class="text-left">
              <th class="p-2">Review ID</th>
              <th class="p-2">Text</th>
              <th class="p-2">Status</th>
              <th class="p-2">Posted at</th>
              <th class="p-2">Platform status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in items" :key="r.id" class="border-t">
              <td class="p-2">{{ r.review_id }}</td>
              <td class="p-2">{{ r.text }}</td>
              <td class="p-2">{{ r.status }}</td>
              <td class="p-2">{{ r.posted_at ? new Date(r.posted_at).toLocaleString() : '' }}</td>
              <td class="p-2">{{ r.platform_status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { api } from '../lib/api';
import { useAuthStore } from '../stores/auth';
import BaseButton from '../components/BaseButton.vue';
import TableSkeleton from '../components/TableSkeleton.vue';

const auth = useAuthStore();
const reviewId = ref('');
const items = ref([]);
const loading = ref(false);
const error = ref('');

async function fetchReplies() {
  if (!auth.orgId) return;
  loading.value = true;
  error.value = '';
  try {
    const params = {};
    if (reviewId.value) params.review_id = reviewId.value;
    const { data } = await api.get(`/orgs/${auth.orgId}/replies`, { params });
    items.value = data.items || data;
  } catch (e) {
    error.value = e?.message || String(e);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchReplies);
</script>

