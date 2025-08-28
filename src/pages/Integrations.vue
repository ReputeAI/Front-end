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
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ p.connected ? 'Connected' : 'Not connected' }}
            </p>
          </div>
          <div>
            <BaseButton
              v-if="p.connected"
              variant="danger"
              :loading="loading[p.provider]"
              @click="disconnect(p.provider)"
            >
              Disconnect
            </BaseButton>
            <BaseButton
              v-else
              :loading="loading[p.provider]"
              @click="connect(p.provider)"
            >
              Connect
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import Sidebar from '../components/Sidebar.vue';
  import { ref, onMounted, reactive } from 'vue';
  import { api } from '../lib/api';
  import { useAuthStore } from '../stores/auth';
  import BaseButton from '../components/BaseButton.vue';

  const auth = useAuthStore();
  const providers = ref([]);
  const loading = reactive({});

  async function fetchIntegrations() {
    const { data } = await api.get('/integrations/');
    providers.value = data;
  }

  async function connect(provider) {
    if (!auth.orgId) return;
    loading.value[provider] = true;
    try {
      const { data } = await api.post(
        `/orgs/${auth.orgId}/integrations/${provider}/connect`
      );
      const url = data.authorization_url || data.url;
      if (url) window.location.href = url;
    } finally {
      loading.value[provider] = false;
    }
  }

  async function disconnect(provider) {
    if (!auth.orgId) return;
    loading.value[provider] = true;
    try {
      await api.delete(`/orgs/${auth.orgId}/integrations/${provider}`);
      await fetchIntegrations();
    } finally {
      loading.value[provider] = false;
    }
  }

  onMounted(fetchIntegrations);
  </script>
