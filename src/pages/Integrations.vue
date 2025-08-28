<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 p-6 max-w-6xl mx-auto space-y-4">
      <h1 class="text-2xl font-bold">Integrations</h1>
      <div
        v-for="p in providers"
        :key="p.provider"
        class="bg-white dark:bg-gray-800 p-4 rounded shadow flex items-center justify-between"
      >
        <div>
          <h2 class="font-semibold capitalize">{{ p.provider }}</h2>
          <p class="text-sm text-gray-600">
            {{ p.connected ? 'Connected' : 'Not connected' }}
          </p>
        </div>
        <div>
          <button
            v-if="p.connected"
            class="px-4 py-2 bg-red-500 text-white rounded"
            @click="disconnect(p.provider)"
          >
            Disconnect
          </button>
          <button
            v-else
            class="px-4 py-2 bg-primary text-white rounded"
            @click="connect(p.provider)"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue';
import { ref, onMounted } from 'vue';
import { api } from '../lib/api';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const providers = ref([]);

async function fetchIntegrations() {
  const { data } = await api.get('/integrations/');
  providers.value = data;
}

async function connect(provider) {
  if (!auth.orgId) return;
  const { data } = await api.post(
    `/orgs/${auth.orgId}/integrations/${provider}/connect`
  );
  const url = data.authorization_url || data.url;
  if (url) window.location.href = url;
}

async function disconnect(provider) {
  if (!auth.orgId) return;
  await api.delete(`/orgs/${auth.orgId}/integrations/${provider}`);
  await fetchIntegrations();
}

onMounted(fetchIntegrations);
</script>
