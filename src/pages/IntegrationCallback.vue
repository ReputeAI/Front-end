<template>
  <div class="p-6 text-center">Processing...</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../lib/api';

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const { code, state, provider } = route.query;
  if (provider && code && state) {
    await api.get(`/integrations/${provider}/callback`, {
      params: { code, state }
    });
  }
  router.push('/integrations');
});
</script>
