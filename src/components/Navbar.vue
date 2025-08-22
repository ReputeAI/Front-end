<template>
  <nav class="bg-white/80 backdrop-blur border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <router-link to="/" class="text-xl font-semibold text-primary">ReputeAI</router-link>
        <div class="flex items-center space-x-4">
          <div class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-gray-700 hover:text-primary dark:text-gray-300">Features</a>
            <a href="#pricing" class="text-gray-700 hover:text-primary dark:text-gray-300">Pricing</a>
            <router-link to="/login" class="text-gray-700 hover:text-primary dark:text-gray-300">Login</router-link>
            <router-link to="/signup" class="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90">Start Free Trial</router-link>
          </div>
          <button @click="toggleDark" class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <MoonIcon v-if="!isDark" class="h-5 w-5" />
            <SunIcon v-else class="h-5 w-5" />
          </button>
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
