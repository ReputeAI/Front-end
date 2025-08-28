<template>
  <div
    v-if="usage.limitExceeded"
    class="bg-yellow-100 border-b border-yellow-200 text-yellow-800 p-4 text-center"
  >
    You have reached your plan limits.
    <router-link to="/billing" class="underline font-semibold">Upgrade your plan</router-link>
    to continue using AI features.
  </div>
</template>

<script setup>
import { useUsageStore } from '../stores/usage';

const usage = useUsageStore();
</script>

