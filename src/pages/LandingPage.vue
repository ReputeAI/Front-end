<template>
  <div>
    <section class="text-center py-20 bg-gray-50">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Manage Your Online Reputation with AI</h1>
      <p class="text-lg text-gray-600 mb-6">Monitor reviews, analyze sentiment, and respond in seconds.</p>
      <div class="space-x-4">
        <router-link to="/signup" class="px-4 py-2 bg-primary text-white rounded shadow">Start Free Trial</router-link>
        <router-link to="/demo" class="px-4 py-2 border border-primary text-primary rounded">View Demo</router-link>
      </div>
    </section>

    <section class="py-16">
      <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded shadow">
          <h3 class="font-semibold mb-2">Track Google & Trustpilot Reviews</h3>
          <p class="text-gray-600">Stay updated with new feedback across platforms.</p>
        </div>
        <div class="bg-white p-6 rounded shadow">
          <h3 class="font-semibold mb-2">AI Sentiment Analysis</h3>
          <p class="text-gray-600">Understand customer feelings instantly.</p>
        </div>
        <div class="bg-white p-6 rounded shadow">
          <h3 class="font-semibold mb-2">Suggested Responses with Your Brand Voice</h3>
          <p class="text-gray-600">Reply confidently with AI-generated messages.</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-gray-50">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-8">Pricing</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded shadow">
            <h3 class="text-xl font-semibold mb-4">Free Plan</h3>
            <p class="text-gray-600 mb-4">10 reviews/month</p>
            <router-link to="/signup" class="px-4 py-2 bg-primary text-white rounded">Get Started</router-link>
          </div>
          <div class="bg-white p-6 rounded shadow">
            <h3 class="text-xl font-semibold mb-4">Pro Plan</h3>
            <p class="text-gray-600 mb-4">Unlimited reviews + AI responses<br/>€29/month</p>
            <router-link to="/signup" class="px-4 py-2 bg-primary text-white rounded">Upgrade</router-link>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-8 text-center text-gray-500">
      <div class="space-x-4">
        <a href="#">About</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  </div>
</template>
