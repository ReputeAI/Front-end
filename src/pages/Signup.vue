<template>
  <div class="max-w-md mx-auto py-24 px-4">
      <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
          <BaseButton class="w-full" :loading="loading" type="submit">Sign Up</BaseButton>
          <BaseButton
            type="button"
            class="w-full"
            variant="secondary"
          >
            Sign up with Google
          </BaseButton>
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
  const loading = ref(false);

  const router = useRouter();
  const auth = useAuthStore();

  async function onSubmit() {
    loading.value = true;
    try {
      await auth.register(email.value, password.value);
      router.push('/dashboard');
    } finally {
      loading.value = false;
    }
  }
  </script>
