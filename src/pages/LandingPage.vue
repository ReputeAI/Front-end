<template>
  <div>
    <!-- Hero -->
      <section class="relative overflow-hidden bg-white dark:bg-gray-900">
        <div class="max-w-5xl mx-auto px-4 py-24 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Manage Your Online Reputation with AI</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">Monitor reviews, analyze sentiment, and respond in seconds. Let AI handle your online presence while you focus on business growth.</p>
          <div class="flex justify-center space-x-4">
            <router-link to="/signup">
              <BaseButton class="px-6 py-3">Start Free Trial</BaseButton>
            </router-link>
            <router-link to="/demo">
              <BaseButton class="px-6 py-3" variant="secondary">View Demo</BaseButton>
            </router-link>
          </div>
        </div>
      </section>

    <!-- Features -->
      <section id="features" class="py-24 bg-white dark:bg-gray-900">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">Everything you need to manage reviews</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm text-center">
              <h3 class="font-semibold mb-2">Track Google & Trustpilot</h3>
              <p class="text-gray-600 dark:text-gray-400">Stay updated with new feedback across platforms.</p>
            </div>
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm text-center">
              <h3 class="font-semibold mb-2">AI Sentiment Analysis</h3>
              <p class="text-gray-600 dark:text-gray-400">Understand customer feelings instantly.</p>
            </div>
            <div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm text-center">
              <h3 class="font-semibold mb-2">Suggested Responses</h3>
              <p class="text-gray-600 dark:text-gray-400">Reply confidently with AI-generated messages.</p>
            </div>
          </div>
        </div>
      </section>

    <!-- Pricing -->
      <section id="pricing" class="py-24 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <h2 class="text-3xl font-bold mb-12">Simple, transparent pricing</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
              <h3 class="text-xl font-semibold mb-2">Free Plan</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">Up to 10 reviews/month</p>
              <router-link to="/signup">
                <BaseButton class="px-6 py-3">Get Started</BaseButton>
              </router-link>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow ring-2 ring-primary">
              <h3 class="text-xl font-semibold mb-2">Pro Plan</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-6">Unlimited reviews + AI responses<br />€29/month</p>
              <router-link to="/signup">
                <BaseButton class="px-6 py-3">Upgrade</BaseButton>
              </router-link>
            </div>
          </div>
        </div>
      </section>

    <!-- Footer -->
      <footer class="py-8 text-center text-gray-500 dark:text-gray-400">
        <div class="space-x-4">
          <a href="#">About</a>
          <a href="#pricing">Pricing</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  </template>

  <script setup>
  import BaseButton from '../components/BaseButton.vue';
  </script>
