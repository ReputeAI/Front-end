<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 max-w-6xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Reviews</h1>

      <div class="mb-4 space-y-2">
        <div class="flex flex-wrap gap-2 items-center">
          <select v-model="filters.platform" class="border p-1 rounded">
            <option value="">Platform</option>
            <option v-for="p in platformOptions" :key="p" :value="p">{{ p }}</option>
          </select>

          <select v-model="filters.sentiment" class="border p-1 rounded">
            <option value="">Sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          <div class="flex items-center">
            <label class="mr-2">Min rating: {{ filters.rating_min }}</label>
            <input
              type="range"
              min="0"
              max="5"
              v-model.number="filters.rating_min"
              class="w-32"
            />
          </div>

          <input
            v-model="filters.q"
            type="search"
            placeholder="Search"
            class="border p-1 rounded flex-1 min-w-[120px]"
          />

          <input v-model="filters.date_from" type="date" class="border p-1 rounded" />

          <button
            @click="refresh"
            class="ml-auto bg-primary text-white px-3 py-1 rounded"
          >
            Refresh reviews
          </button>
        </div>
      </div>

      <div v-if="loading">Loading...</div>
      <div v-else-if="error" class="text-red-600">{{ error.message || error }}</div>
      <div v-else>
        <table class="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr class="text-left">
              <th class="p-2">Platform</th>
              <th class="p-2">Rating</th>
              <th class="p-2">Text</th>
              <th class="p-2">Date</th>
              <th class="p-2">Sentiment</th>
              <th class="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in items" :key="r.id" class="border-t">
              <td class="p-2">{{ r.platform }}</td>
              <td class="p-2">{{ '★'.repeat(r.rating) }}</td>
              <td class="p-2">
                <div class="truncate max-w-xs" :title="r.text">{{ r.text }}</div>
              </td>
              <td class="p-2">{{ new Date(r.date).toLocaleDateString() }}</td>
              <td class="p-2">
                <span
                  class="px-2 py-1 rounded text-sm"
                  :class="sentimentClass(r.sentiment)"
                >
                  {{ r.sentiment }}
                </span>
              </td>
              <td class="p-2">
                <button class="text-primary">View</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex items-center justify-between mt-4">
          <div class="space-x-2">
            <button
              @click="pagination.page--"
              :disabled="pagination.page === 1"
              class="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {{ pagination.page }}</span>
            <button
              @click="pagination.page++"
              :disabled="items.length < pagination.size"
              class="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div class="flex items-center">
            <label class="mr-2">Rows:</label>
            <select v-model.number="pagination.size" class="border p-1 rounded">
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { api } from '../lib/api';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();

const filters = reactive({
  platform: '',
  sentiment: '',
  rating_min: 0,
  q: '',
  date_from: ''
});

const loading = ref(false);
const error = ref(null);
const items = ref([]);

const pagination = reactive({
  page: 1,
  size: 50,
  total: 0
});

const platformOptions = computed(() => {
  const set = new Set(items.value.map(r => r.platform));
  return Array.from(set);
});

async function fetchReviews() {
  if (!auth.orgId) return;
  loading.value = true;
  error.value = null;
  try {
    const params = {
      ...filters,
      page: pagination.page,
      size: pagination.size
    };
    if (!filters.rating_min) delete params.rating_min;
    Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);

    const { data } = await api.get(`/orgs/${auth.orgId}/reviews`, { params });
    items.value = data.items || data;
    if (data.total !== undefined) pagination.total = data.total;
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchReviews);

watch(
  filters,
  () => {
    pagination.page = 1;
    fetchReviews();
  },
  { deep: true }
);

watch(
  () => [pagination.page, pagination.size],
  () => {
    fetchReviews();
  }
);

function sentimentClass(s) {
  switch (s) {
    case 'positive':
      return 'bg-green-100 text-green-800';
    case 'negative':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

async function refresh() {
  if (!auth.orgId) return;
  try {
    await api.post(`/orgs/${auth.orgId}/reviews/refresh`);
    alert('Refresh gestart');
    fetchReviews();
  } catch (e) {
    console.error(e);
  }
}
</script>

