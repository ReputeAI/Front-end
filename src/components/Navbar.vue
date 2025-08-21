<template>
  <nav class="bg-white dark:bg-gray-800 shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link to="/" class="flex-shrink-0 flex items-center text-primary font-bold text-xl">ReputeAI</router-link>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="toggleDark" class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <MoonIcon v-if="!isDark" class="h-5 w-5" />
            <SunIcon v-else class="h-5 w-5" />
          </button>
          <router-link to="/login" class="text-sm font-medium text-gray-700 dark:text-gray-300">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline';

const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark');
});

function toggleDark() {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark', isDark.value);
}
</script>
