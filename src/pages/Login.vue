<template>
  <div class="max-w-md mx-auto py-24 px-4">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form class="space-y-4" @submit.prevent="onSubmit">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
          />
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <BaseButton class="w-full" :loading="loading" type="submit">Login</BaseButton>
        </form>
      </div>
    </div>
  </template>

  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';
  import BaseButton from '../components/BaseButton.vue';

  const email = ref('');
  const password = ref('');
  const error = ref('');
  const loading = ref(false);

  const router = useRouter();
  const auth = useAuthStore();

  async function onSubmit() {
    error.value = '';
    loading.value = true;
    try {
      await auth.login(email.value, password.value);
      router.push('/dashboard');
    } catch (e) {
      if (e?.response?.status === 401) {
        error.value = 'Invalid credentials';
      } else if (e?.response?.status === 422) {
        error.value = 'Validation error';
      } else {
        error.value = 'An error occurred';
      }
    } finally {
      loading.value = false;
    }
  }
  </script>
