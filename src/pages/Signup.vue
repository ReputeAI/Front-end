<template>
  <div class="max-w-md mx-auto py-24 px-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form class="space-y-4">
        <input type="email" placeholder="Email" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary" />
        <input type="password" placeholder="Password" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary" />
        <button class="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90">Sign Up</button>
        <button class="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700">
          <span>Sign up with Google</span>
        </button>
      </form>
    </div>
  </div>
</template>
