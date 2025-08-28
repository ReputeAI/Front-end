<template>
  <div class="max-w-md mx-auto py-24 px-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <button class="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();
const auth = useAuthStore();

async function onSubmit() {
  error.value = '';
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
  }
}
</script>
