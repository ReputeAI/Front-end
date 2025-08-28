<template>
  <div class="max-w-md mx-auto py-24 px-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
        <button class="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90">Sign Up</button>
        <button
          type="button"
          class="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <span>Sign up with Google</span>
        </button>
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

const router = useRouter();
const auth = useAuthStore();

async function onSubmit() {
  try {
    await auth.register(email.value, password.value);
    router.push('/dashboard');
  } catch (e) {
    // no specific error handling required yet
  }
}
</script>
