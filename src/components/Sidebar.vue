<template>
  <div class="bg-white dark:bg-gray-800 w-64 min-h-screen shadow-md hidden md:block">
    <nav class="mt-5">
      <router-link v-for="item in items" :key="item.to" :to="item.to" class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
        {{ item.label }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/settings', label: 'Settings' },
  { to: '/billing', label: 'Billing' }
];
</script>
