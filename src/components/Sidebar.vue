<template>
  <div class="bg-white dark:bg-gray-800 w-64 min-h-screen shadow-md hidden md:block">
    <div v-if="auth.isAuthed && auth.me?.memberships?.length" class="p-4">
      <OrgSwitcher :memberships="auth.me.memberships" />
    </div>
    <nav class="mt-8 space-y-1">
      <router-link
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-full"
        active-class="bg-gray-100 dark:bg-gray-700 font-semibold text-primary"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import OrgSwitcher from './OrgSwitcher.vue';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/replies', label: 'Replies' },
  { to: '/integrations', label: 'Integrations' },
  { to: '/settings', label: 'Settings' },
  { to: '/billing', label: 'Billing' }
];
</script>
