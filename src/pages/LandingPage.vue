<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="max-w-5xl mx-auto px-4 py-24 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Manage Your Online Reputation with AI</h1>
        <p class="text-lg text-gray-600 mb-8">Monitor reviews, analyze sentiment, and respond in seconds. Let AI handle your online presence while you focus on business growth.</p>
        <div class="flex justify-center space-x-4">
          <router-link to="/signup" class="px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primary/90">Start Free Trial</router-link>
          <router-link to="/demo" class="px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/10">View Demo</router-link>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="py-24 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Everything you need to manage reviews</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="p-6 bg-gray-50 rounded-lg shadow-sm text-center">
            <h3 class="font-semibold mb-2">Track Google & Trustpilot</h3>
            <p class="text-gray-600">Stay updated with new feedback across platforms.</p>
          </div>
          <div class="p-6 bg-gray-50 rounded-lg shadow-sm text-center">
            <h3 class="font-semibold mb-2">AI Sentiment Analysis</h3>
            <p class="text-gray-600">Understand customer feelings instantly.</p>
          </div>
          <div class="p-6 bg-gray-50 rounded-lg shadow-sm text-center">
            <h3 class="font-semibold mb-2">Suggested Responses</h3>
            <p class="text-gray-600">Reply confidently with AI-generated messages.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-24 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-12">Simple, transparent pricing</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg p-8 shadow">
            <h3 class="text-xl font-semibold mb-2">Free Plan</h3>
            <p class="text-gray-600 mb-6">Up to 10 reviews/month</p>
            <router-link to="/signup" class="inline-block px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primary/90">Get Started</router-link>
          </div>
          <div class="bg-white rounded-lg p-8 shadow ring-2 ring-primary">
            <h3 class="text-xl font-semibold mb-2">Pro Plan</h3>
            <p class="text-gray-600 mb-6">Unlimited reviews + AI responses<br />€29/month</p>
            <router-link to="/signup" class="inline-block px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primary/90">Upgrade</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 text-center text-gray-500">
      <div class="space-x-4">
        <a href="#">About</a>
        <a href="#pricing">Pricing</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  </div>
</template>
